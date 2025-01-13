export type EventMap = {
  AUTH_LOGIN: { accessToken: string }
  AUTH_LOGOUT: void
  AUTH_TOKEN_REFRESH: { accessToken: string; source?: string }
  AUTH_ERROR: { message: string; source?: string }
  AUTH_STATE_CHANGE: { isAuthenticated: boolean }

  SHOW_TOAST: { message: string; type: 'success' | 'error' | 'info' }
}

export type EventName = keyof EventMap
export type EventHandler<T extends EventName> = (data: EventMap[T]) => void
