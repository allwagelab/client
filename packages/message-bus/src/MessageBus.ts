import type { EventMap, EventName, EventHandler } from './MessageBus.types'

export class MessageBus {
  private handlers: Map<EventName, Set<EventHandler<any>>>

  constructor() {
    this.handlers = new Map()
  }

  publishEvent<T extends EventName>(
    eventName: T,
    data?: EventMap[T] extends void ? never : EventMap[T],
  ) {
    const handlers = this.handlers.get(eventName)
    handlers?.forEach(handler => handler(data as EventMap[T]))
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
