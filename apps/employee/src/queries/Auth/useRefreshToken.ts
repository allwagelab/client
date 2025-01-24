import { useMutation } from '@tanstack/react-query'

import { useMessageBus } from '@allwagelab/message-bus'

import { AuthApi } from '@/apis'
import { useAuthStore } from '@/stores/auth'

function useRefreshToken() {
  const messageBus = useMessageBus()
  const setToken = useAuthStore(state => state.setToken)

  return useMutation(AuthApi.renewAccessToken, {
    onSuccess(data) {
      setToken(data.data.data.accessToken)
      messageBus.publishEvent('auth:token-refresh', {
        accessToken: data.data.data.accessToken,
        source: 'remote',
      })
    },
  })
}

export default useRefreshToken
