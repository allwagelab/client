/** @jsxImportSource react */
import { type ReactNode, createContext, useContext, useState, useEffect, useCallback } from 'react'

import { showGlobalToast } from '@allwagelab/message-bus'
import type { AuthState } from '@allwagelab/schemas'

import { useAuthStorage } from './hooks/useAuthStorage'

import { useMessageBus } from '../MessageBusContext'

interface AuthContextType extends AuthState {
  loginHandler: ({ accessToken, autoLogin }: { accessToken: string; autoLogin?: boolean }) => void
  logoutHandler: () => void
  refreshTokenHandler: ({ accessToken }: { accessToken: string }) => void
  authErrorHandler: ({ source }: { source?: string }) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  tokenKey: string
  encodeToken?: (token: string) => string
  decodeToken?: (encodedToken: string) => string
  children: ReactNode
}

export function AuthProvider({ tokenKey, encodeToken, decodeToken, children }: AuthProviderProps) {
  const messageBus = useMessageBus()
  const { token, saveToken, removeToken } = useAuthStorage({
    tokenKey,
    encode: encodeToken,
    decode: decodeToken,
  })

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: !!token,
    accessToken: token,
  })

  const loginHandler = useCallback(
    ({ accessToken, autoLogin = false }: { accessToken: string; autoLogin?: boolean }) => {
      if (autoLogin) {
        saveToken(accessToken)
      }

      setAuthState({
        isAuthenticated: true,
        accessToken,
      })

      showGlobalToast('성공적으로 로그인되었습니다', 'success')
    },
    [saveToken],
  )

  const logoutHandler = useCallback(() => {
    removeToken()
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
    })
    showGlobalToast('성공적으로 로그아웃되었습니다', 'info')
  }, [removeToken])

  const refreshTokenHandler = useCallback(
    ({ accessToken, source }: { accessToken: string; source?: string }) => {
      if (token) {
        saveToken(accessToken)
      }

      setAuthState(prev => ({
        ...prev,
        accessToken,
      }))

      if (source !== 'remote') {
        messageBus.publishEvent('AUTH_TOKEN_REFRESH', {
          accessToken,
          source: 'host',
        })
      }
    },
    [token, saveToken, messageBus],
  )

  const authErrorHandler = useCallback(
    ({ source }: { source?: string }) => {
      if (source !== 'remote') {
        showGlobalToast('로그인에 실패했습니다. 다시 시도해 주세요.', 'error')
        messageBus.publishEvent('AUTH_ERROR', {
          message: '로그인에 실패했습니다. 다시 시도해 주세요.',
          source: 'host',
        })
      }
      logoutHandler()
    },
    [messageBus, logoutHandler],
  )

  useEffect(() => {
    if (token) {
      loginHandler({ accessToken: token, autoLogin: true })
    }
  }, [])

  useEffect(() => {
    messageBus.subscribe('AUTH_ERROR', authErrorHandler)
    messageBus.subscribe('AUTH_TOKEN_REFRESH', refreshTokenHandler)

    return () => {
      messageBus.unsubscribe('AUTH_ERROR', authErrorHandler)
      messageBus.unsubscribe('AUTH_TOKEN_REFRESH', refreshTokenHandler)
    }
  }, [messageBus, authErrorHandler, refreshTokenHandler])

  return (
    <AuthContext.Provider
      value={{ ...authState, loginHandler, logoutHandler, refreshTokenHandler, authErrorHandler }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
