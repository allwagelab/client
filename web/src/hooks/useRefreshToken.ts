import { AxiosError } from 'axios'

import { useAuth } from '@allwagelab/message-bus'

import { axiosPrivateInstance } from '@/apis'

export const useRefreshToken = () => {
  const auth = useAuth()

  const refresh = async () => {
    try {
      const response = await axiosPrivateInstance.post('/auth/refresh/token', null, {
        withCredentials: true,
      })
      const accessToken = response.data.accessToken
      auth.refreshTokenHandler({ accessToken })

      return response.data.accessToken
    } catch (error) {
      let errorMessage = '토큰 갱신에 실패했습니다. 다시 로그인해 주세요.'

      if (error instanceof AxiosError) {
        // axios error인 경우
        if ('response' in error) {
          const status = error.response?.status
          if (status === 401) {
            errorMessage = '인증이 만료되었습니다. 다시 로그인해 주세요.'
          } else if (status === 403) {
            errorMessage = '접근 권한이 없습니다.'
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
