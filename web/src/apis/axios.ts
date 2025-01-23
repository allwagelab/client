import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

import { AuthService, getGlobalMessageBus } from '@allwagelab/message-bus'

import { authService } from '@/services/authService'
import { TokenRefreshService } from '@/services/tokenRefreshService'

import { BASE_URL } from './baseUrl'

const tokenRefreshService = new TokenRefreshService(authService, getGlobalMessageBus())

/**
 * HTTP 요청을 처리하고 인증을 관리하기 위한 클라이언트 클래스.
 */
class ApiClient {
  private instance: AxiosInstance
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
    this.instance = this.createAxiosInstance()
    this.setupInterceptors()
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      withCredentials: true,
      baseURL: BASE_URL.SERVER,
    })
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleRequestError.bind(this),
    )

    this.instance.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponseError.bind(this),
    )
  }

  /**
   * 요청을 보내기 전에 인증 헤더를 추가하기 위한 인터셉터.
   * @param config - axios 요청 설정 객체입니다.
   */
  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (!config.headers) {
      config.headers = new AxiosHeaders()
    }

    const accessToken = this.authService.getToken()
    console.log('accessToken:', accessToken)
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return config
  }

  private handleRequestError(error: AxiosError): Promise<never> {
    return Promise.reject(error)
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response
  }

  /**
   * 응답 과정에서 발생한 에러를 처리하기 위한 인터셉터.
   * 토큰 만료나 중복 로그인 등의 인증 관련 에러를 처리합니다.
   * @param error - 발생한 axios 에러 객체입니다.
   */
  private async handleResponseError(error: AxiosError): Promise<unknown> {
    const { response } = error
    if (!response) return Promise.reject(error)

    if (error.response?.status === 401) {
      return tokenRefreshService.handleTokenRefresh(error)
    }

    return Promise.reject(error)
  }

  public getInstance(): AxiosInstance {
    return this.instance
  }
}

const apiClient = new ApiClient(authService)

const base = apiClient.getInstance()

export { base }
