import { useMutation } from '@tanstack/react-query'

import { AuthApi } from '@/apis'
import { useAuthStore } from '@/stores/auth'

function useRefreshToken() {
  const setToken = useAuthStore(state => state.setToken)
  return useMutation(AuthApi.refreshToken, {
    onSuccess(data) {
      setToken(data.data.accessToken)
    },
  })
}

export default useRefreshToken
