/** @jsxImportSource @emotion/react */
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { Toast } from './Toast'

import type { ToastType } from '../MessageBus.types'
import { useMessageBus } from '../MessageBusContext'

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

interface ToastMessage {
  id: number
  message: string
  type: ToastType
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const messageBus = useMessageBus()

  const showToast = useCallback((message: string, type: ToastType) => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  useEffect(() => {
    const handleShowToast = ({ message, type }: { message: string; type: ToastType }) => {
      showToast(message, type)
    }

    messageBus.subscribe('toast:show', handleShowToast)

    return () => {
      messageBus.unsubscribe('toast:show', handleShowToast)
    }
  }, [messageBus, showToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
