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
    } catch {
      auth.authErrorHandler({ source: 'host' })
    }
  }

  return refresh
}
