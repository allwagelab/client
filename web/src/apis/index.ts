import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'

import { MESSAGES } from '@allwagelab/constants'
import type { AuthContextType } from '@allwagelab/message-bus'

const baseURL = import.meta.env.VITE_BASE_URL

interface AxiosInstanceOptions extends AxiosRequestConfig {
  withCredentials?: boolean
}

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
const axiosCredentialsInstance: AxiosInstance = createAxiosInstance({ withCredentials: true })
const axiosPrivateInstance: AxiosInstance = createAxiosInstance({ withCredentials: true })

class TokenRefreshQueue {
  private isRefreshing = false
  private refreshPromise: Promise<string> | null = null
  private auth: AuthContextType

  constructor(auth: AuthContextType) {
    this.auth = auth
  }

  async refreshToken() {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshPromise = this.performTokenRefresh()
    }
    return this.refreshPromise
  }

  private async performTokenRefresh(): Promise<string> {
    try {
      const {
        data: {
          data: { accessToken },
        },
      } = await axios
        .create({
          ...defaultOptions,
          withCredentials: true,
        })
        .post('/auth/refresh/token')

      this.auth.refreshTokenHandler({ accessToken })
      return accessToken
    } catch (error) {
      let errorMessage = `${MESSAGES.AUTH.TOKEN.RENEW_FAIL} ${MESSAGES.AUTH.LOG_IN.RETRY}`

      if (error instanceof AxiosError) {
        if (error.response) {
          const status = error.response.status
          if (status === 401) {
            errorMessage = `${MESSAGES.AUTH.TOKEN.EXPIRED} ${MESSAGES.AUTH.LOG_IN.RETRY}`
          } else if (status === 403) {
            errorMessage = MESSAGES.AUTH.TOKEN.FORBIDDEN
          }
        } else {
          errorMessage = error.message
        }
      }

      this.auth.authErrorHandler({ message: errorMessage })
      return Promise.reject(errorMessage)
    } finally {
      this.isRefreshing = false
      this.refreshPromise = null
    }
  }
}

export const initAxiosInterceptors = (auth: AuthContextType) => {
  const tokenQueue = new TokenRefreshQueue(auth)

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
        prevRequest._retry = true

        try {
          const newToken = await tokenQueue.refreshToken()
          prevRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosPrivateInstance(prevRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }

      return Promise.reject(error)
    },
  )
}

export { axiosInstance, axiosPrivateInstance, axiosCredentialsInstance }
