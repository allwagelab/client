import { AxiosError } from 'axios'

import { MESSAGES } from '@allwagelab/constants'
import { useAuth } from '@allwagelab/message-bus'

import { axiosPrivateInstance } from '@/apis'

export const useRefreshToken = () => {
  const auth = useAuth()

  const refresh = async () => {
    try {
      const response = await axiosPrivateInstance.post('/auth/refresh/token')
      const accessToken = response.data.data.accessToken
      auth.refreshTokenHandler({ accessToken })

      return accessToken
    } catch (error) {
      let errorMessage = `${MESSAGES.AUTH.TOKEN.RENEW_FAIL} ${MESSAGES.AUTH.LOG_IN.RETRY}`

      if (error instanceof AxiosError) {
        // axios error인 경우
        if ('response' in error) {
          const status = error.response?.status
          if (status === 401) {
            errorMessage = `${MESSAGES.AUTH.TOKEN.EXPIRED} ${MESSAGES.AUTH.LOG_IN.RETRY}`
          } else if (status === 403) {
            errorMessage = MESSAGES.AUTH.TOKEN.FORBIDDEN
          }
        } else {
          // 일반적인 Error 객체인 경우
          errorMessage = `토큰 갱신 실패: ${error.message}`
        }
      }

      auth.authErrorHandler({
        message: errorMessage,
      })
    }
  }

  return refresh
}
