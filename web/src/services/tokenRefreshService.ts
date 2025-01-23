import axios, { AxiosError } from 'axios'

import { URLS } from '@allwagelab/constants'
import type { AuthService, MessageBus } from '@allwagelab/message-bus'

import * as api from '@/apis/token'

interface RetryRequestCallback {
  (accessToken: string): Promise<any>
}

export class TokenRefreshService {
  private isRefreshing = false
  private refreshSubscribers: RetryRequestCallback[] = []
  private authService: AuthService
  private messageBus: MessageBus

  constructor(authService: AuthService, messageBus: MessageBus) {
    this.authService = authService
    this.messageBus = messageBus
  }

  /**
   * 토큰 만료 시 갱신 및 요청 재시도를 처리하기 위한 메서드.
   * @param error - 발생한 axios 에러 객체입니다.
   * @returns 재시도된 요청의 Promise를 반환합니다.
   */
  async handleTokenRefresh(error: AxiosError) {
    const { response } = error
    if (!response) throw error

    const retryOriginalRequest = new Promise<any>(resolve => {
      this.addRetryRequest(async (accessToken: string) => {
        const updatedConfig = {
          ...response.config,
          headers: {
            ...response.config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }
        return resolve(axios(updatedConfig))
      })
    })

    if (!this.isRefreshing) {
      this.isRefreshing = true
      try {
        const { accessToken } = await this.refreshTokens()
        if (!accessToken) throw error

        this.authService.handleTokenRefresh({ accessToken })
        this.messageBus.publishEvent('auth:token-refresh', { accessToken })

        this.notifySubscribers(accessToken)
      } catch (error) {
        this.handleSessionExpiration()
      } finally {
        this.isRefreshing = false
      }
    }

    return retryOriginalRequest
  }

  /**
   * 리프레시 토큰을 사용하여 새로운 토큰을 발급받기 위한 메서드.
   * @param refreshToken - 현재 리프레시 토큰입니다.
   */
  private async refreshTokens(): Promise<ReturnType<typeof api.renewAccessToken>> {
    return api.renewAccessToken()
  }

  /**
   * 토큰 갱신 후 대기 중인 요청들을 처리하기 위한 메서드.
   * @param accessToken - 새로 발급받은 액세스 토큰입니다.
   */
  private notifySubscribers(accessToken: string): void {
    this.refreshSubscribers.forEach(callback => callback(accessToken))
    this.refreshSubscribers = []
  }

  /**
   * 토큰 갱신 후 재시도할 요청을 등록하기 위한 메서드.
   * @param callback - 재시도할 요청을 처리할 콜백 함수입니다.
   */
  private addRetryRequest(callback: RetryRequestCallback): void {
    this.refreshSubscribers.push(callback)
  }

  /**
   * 세션 만료 시 처리를 위한 메서드.
   */
  private handleSessionExpiration(): void {
    this.authService.handleLogout()
    window.location.replace(URLS.APP_START)
  }
}
