type EventMap = {
  // 기존 이벤트
  SHOW_TOAST: { message: string; type: 'success' | 'error' | 'info' }

  // 인증 관련 이벤트
  AUTH_LOGIN: { accessToken: string }
  AUTH_LOGOUT: void
  AUTH_TOKEN_REFRESH: { accessToken: string }
  AUTH_ERROR: { message: string }
  AUTH_STATE_CHANGE: { isAuthenticated: boolean }
}

type EventName = keyof EventMap
type EventHandler<T extends EventName> = (data: EventMap[T]) => void

export class MessageBus {
  private handlers: Map<EventName, Set<EventHandler<any>>>

  constructor() {
    this.handlers = new Map()
  }

  publishEvent<T extends EventName>(eventName: T, data: EventMap[T]) {
    const handlers = this.handlers.get(eventName)
    handlers?.forEach(handler => handler(data))
  }

  subscribe<T extends EventName>(eventName: T, handler: EventHandler<T>) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set())
    }
    this.handlers.get(eventName)?.add(handler)
  }

  unsubscribe<T extends EventName>(eventName: T, handler: EventHandler<T>) {
    this.handlers.get(eventName)?.delete(handler)
  }
}
