/** @jsxImportSource react */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

import type { AuthState } from '@allwagelab/schemas'

import { useMessageBus } from '../MessageBusContext'

interface AuthContextType extends AuthState {
  refreshTokenHandler: ({ accessToken }: { accessToken: string }) => void
  authErrorHandler: ({ message }: { message?: string }) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
  initialState: AuthState
}

export function RemoteAuthProvider({ children, initialState }: AuthProviderProps) {
  const messageBus = useMessageBus()
  const [authState, setAuthState] = useState<AuthState>(initialState)

  const refreshTokenHandler = useCallback(
    ({ accessToken }: { accessToken: string }) => {
      setAuthState(prev => ({
        ...prev,
        accessToken,
      }))

      messageBus.publishEvent('AUTH_TOKEN_REFRESH', {
        accessToken,
        source: 'remote',
      })
    },
    [messageBus],
  )

  const authErrorHandler = useCallback(
    ({ message }: { message?: string }) => {
      messageBus.publishEvent('AUTH_ERROR', {
        message: message || '인증이 만료되었습니다',
      })
    },
    [messageBus],
  )

  useEffect(() => {
    const refreshTokenHandler = ({ accessToken }: { accessToken: string }) => {
      setAuthState({
        isAuthenticated: true,
        accessToken,
      })
    }

    messageBus.subscribe('AUTH_TOKEN_REFRESH', refreshTokenHandler)

    return () => {
      messageBus.unsubscribe('AUTH_TOKEN_REFRESH', refreshTokenHandler)
    }
  }, [messageBus])

  return (
    <AuthContext.Provider value={{ ...authState, refreshTokenHandler, authErrorHandler }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useRemoteAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useRemoteAuth must be used within RemoteAuthProvider')
  }
  return context
}
