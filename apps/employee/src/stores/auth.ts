// stores/auth.ts
import { useEffect } from 'react'

import { create } from 'zustand'

import { useMessageBus } from '@allwagelab/message-bus'

interface AuthState {
  token: string | null
  setToken: (token: string | null) => void
}

// 단일 store 인스턴스 생성
export const useAuthStore = create<AuthState>(set => ({
  token: null,
  setToken: token => set({ token }),
}))

// 초기값 설정을 위한 함수
export const initializeAuthStore = (initialToken: string | null) => {
  useAuthStore.setState({ token: initialToken })
}

export const useAuthStateListener = () => {
  const messageBus = useMessageBus()
  const setToken = useAuthStore(state => state.setToken)

  useEffect(() => {
    const handleTokenRefresh = ({ accessToken }: { accessToken: string }) => {
      setToken(accessToken)
    }

    messageBus.subscribe('auth:token-refresh', handleTokenRefresh)

    return () => {
      messageBus.unsubscribe('auth:token-refresh', handleTokenRefresh)
    }
  }, [messageBus, setToken])
}
