export type AuthSourceType = 'host' | 'remote'

export type AuthEvents = {
  'auth:login': { accessToken: string }
  'auth:logout': { showToast?: boolean }
  'auth:token-refresh': { accessToken: string; source?: AuthSourceType }
  'auth:error': { message: string }
}

export type ToastType = 'success' | 'error' | 'info'

export type ToastEvents = {
  'toast:show': { message: string; type: ToastType }
}

export type EventMap = AuthEvents & ToastEvents
export type EventName = keyof EventMap
export type EventHandler<T extends EventName> = (data: EventMap[T]) => void
