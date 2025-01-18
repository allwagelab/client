import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'

import { MESSAGES } from '@allwagelab/constants'

const baseURL = import.meta.env.VITE_BASE_URL

interface AxiosInstanceOptions extends AxiosRequestConfig {
  withCredentials?: boolean
}

type CallbackType = (newToken: string) => void

const defaultOptions: AxiosInstanceOptions = {
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

const createAxiosInstance = (options: AxiosInstanceOptions = {}): AxiosInstance =>
  axios.create({
    ...defaultOptions,
    ...options,
  })

const axiosInstance: AxiosInstance = createAxiosInstance()

const axiosCredentialsInstance: AxiosInstance = createAxiosInstance({
  withCredentials: true,
})

const axiosPrivateInstance: AxiosInstance = createAxiosInstance({
  withCredentials: true,
})

// 여러 요청 간의 토큰 갱신 중복 방지
let isRefreshing = false
let refreshSubscribers: CallbackType[] = []

// 토큰 갱신 완료 후 대기 중인 요청 처리
const onRefreshed: CallbackType = newToken => {
  refreshSubscribers.forEach(callback => callback(newToken))
  refreshSubscribers = []
}

// 요청 실패 시, 새 토큰을 기다리는 로직
const addSubscriber = (callback: CallbackType) => {
  refreshSubscribers.push(callback)
}

export const initAxiosInterceptors = (auth: any) => {
  axiosPrivateInstance.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  axiosPrivateInstance.interceptors.response.use(
    response => response,
    async error => {
      const prevRequest = error.config

      if (error.response?.status === 401 && !prevRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true
          prevRequest._retry = true

          try {
            const {
              data: {
                data: { accessToken },
              },
            } = await axiosPrivateInstance.post('/auth/refresh/token')

            auth.refreshTokenHandler({ accessToken })

            isRefreshing = false
            setTimeout(() => onRefreshed(accessToken), 0) // TODO. fix
          } catch (err) {
            isRefreshing = false
            refreshSubscribers = []

            let errorMessage = `${MESSAGES.AUTH.TOKEN.RENEW_FAIL} ${MESSAGES.AUTH.LOG_IN.RETRY}`

            if (error instanceof AxiosError) {
              if ('response' in error) {
                const status = error.response?.status
                if (status === 401) {
                  errorMessage = `${MESSAGES.AUTH.TOKEN.EXPIRED} ${MESSAGES.AUTH.LOG_IN.RETRY}`
                } else if (status === 403) {
                  errorMessage = MESSAGES.AUTH.TOKEN.FORBIDDEN
                }
              } else {
                errorMessage = `토큰 갱신 실패: ${error.message}`
              }
            }

            auth.authErrorHandler({
              message: errorMessage,
            })

            return Promise.reject(err)
          }
        }

        // 대기 중인 요청 추가
        return new Promise((resolve, reject) => {
          addSubscriber(newToken => {
            if (newToken) {
              prevRequest.headers.Authorization = `Bearer ${newToken}`
              resolve(axiosPrivateInstance(prevRequest))
            } else {
              reject(error)
            }
          })
        })
      }

      return Promise.reject(error)
    },
  )
}

export { axiosInstance, axiosPrivateInstance, axiosCredentialsInstance }
