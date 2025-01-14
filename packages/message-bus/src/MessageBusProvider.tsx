/** @jsxImportSource react */
import { ReactNode } from 'react'

import { MessageBus } from './MessageBus'
import { MessageBusContext, getGlobalMessageBus } from './MessageBusContext'

interface MessageBusProviderProps {
  children: ReactNode
  messageBus?: MessageBus
}

export function MessageBusProvider({
  children,
  messageBus = getGlobalMessageBus(),
}: MessageBusProviderProps) {
  return <MessageBusContext.Provider value={messageBus}>{children}</MessageBusContext.Provider>
}
