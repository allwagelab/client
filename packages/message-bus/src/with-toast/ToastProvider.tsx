/** @jsxImportSource @emotion/react */
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { Toast } from './Toast'

import { useMessageBus } from '../MessageBusContext'

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const messageBus = useMessageBus()

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  useEffect(() => {
    const handleShowToast = ({
      message,
      type,
    }: {
      message: string
      type: 'success' | 'error' | 'info'
    }) => {
      showToast(message, type)
    }

    messageBus.subscribe('SHOW_TOAST', handleShowToast)

    return () => {
      messageBus.unsubscribe('SHOW_TOAST', handleShowToast)
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
