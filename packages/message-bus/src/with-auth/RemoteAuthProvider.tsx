/** @jsxImportSource react */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

import type { AuthState } from '@allwagelab/schemas'

import { useMessageBus } from '../MessageBusContext'

interface AuthContextType extends AuthState {
  refreshToken: ({ accessToken }: { accessToken: string }) => void
  authError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  initialState: AuthState
}

export function RemoteAuthProvider({ children, initialState }: AuthProviderProps) {
  const messageBus = useMessageBus()

  const [authState, setAuthState] = useState<AuthState>(initialState)

  const refreshToken = ({ accessToken }: { accessToken: string }) => {
    setAuthState(prev => ({
      ...prev,
      accessToken,
    }))

    messageBus?.publishEvent('AUTH_TOKEN_REFRESH', {
      accessToken,
      source: 'remote',
    })
  }

  const authError = () => {
    messageBus?.publishEvent('AUTH_ERROR', {
      message: '로그인에 실패했습니다. 다시 시도해 주세요.',
      source: 'host',
    })
  }

  useEffect(() => {
    const refreshTokenHandler = ({ accessToken }: { accessToken: string }) => {
      setAuthState({
        isAuthenticated: true,
        accessToken,
      })
    }

    messageBus?.subscribe('AUTH_TOKEN_REFRESH', refreshTokenHandler)

    return () => {
      messageBus?.unsubscribe('AUTH_TOKEN_REFRESH', refreshTokenHandler)
    }
  }, [messageBus])

  return (
    <AuthContext.Provider value={{ ...authState, refreshToken, authError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useRemoteAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
