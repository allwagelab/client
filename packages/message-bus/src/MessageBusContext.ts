import { createContext, useContext } from 'react'

import { MessageBus } from './MessageBus'

declare global {
  interface Window {
    __SHARED_MESSAGE_BUS__?: MessageBus
  }
}

export const getGlobalMessageBus = () => {
  if (!window.__SHARED_MESSAGE_BUS__) {
    window.__SHARED_MESSAGE_BUS__ = new MessageBus()
  }
  return window.__SHARED_MESSAGE_BUS__
}

export const MessageBusContext = createContext<MessageBus>(getGlobalMessageBus())

export const useMessageBus = () => useContext(MessageBusContext)
