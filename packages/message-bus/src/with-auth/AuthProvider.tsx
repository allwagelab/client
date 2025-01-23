/** @jsxImportSource react */
import { type ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react'

import type { AuthState } from '@allwagelab/schemas'

import { AuthService } from './AuthService'

import type { AuthSourceType } from '../MessageBus.types'
import { useMessageBus } from '../MessageBusContext'

interface AuthContextType extends AuthState {
  login: ({ accessToken, autoLogin }: { accessToken: string; autoLogin?: boolean }) => void
  logout: () => void
  authStateChange: ({ accessToken }: { accessToken: string }) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  authService: AuthService
  children: ReactNode
}

export function AuthProvider({ authService, children }: AuthProviderProps) {
  const messageBus = useMessageBus()

  const [authState, setAuthState] = useState<AuthState>(() => ({
    isAuthenticated: !!authService.getToken(),
    accessToken: authService.getToken(),
  }))

  const login = useCallback(
    ({ accessToken, autoLogin = false }: { accessToken: string; autoLogin?: boolean }) => {
      authService.handleLogin({ accessToken, autoLogin })
      setAuthState({
        isAuthenticated: true,
        accessToken,
      })
    },
    [],
  )

  const logout = useCallback(() => {
    authService.handleLogout()
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
    })
  }, [])

  const authStateChange = useCallback(
    ({ accessToken, source }: { accessToken: string; source?: AuthSourceType }) => {
      if (source === 'remote') {
        authService.handleTokenRefresh({ accessToken })
      }

      setAuthState(prev => ({
        ...prev,
        accessToken,
      }))
    },
    [],
  )

  useEffect(() => {
    messageBus.subscribe('auth:token-refresh', authStateChange)

    return () => {
      messageBus.unsubscribe('auth:token-refresh', authStateChange)
    }
  }, [messageBus, authStateChange])

  // 초기 토큰 검증
  useEffect(() => {
    const token = authService.getToken()

    if (token) {
      setAuthState({
        accessToken: token,
        isAuthenticated: true,
      })
    }
  }, [])

  const contextValue = {
    ...authState,
    login,
    logout,
    authStateChange,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
