/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'

import { css, keyframes } from '@emotion/react'

import type { ToastType } from '../MessageBus.types'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`

const toastStyles = css`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 14px;
  z-index: 1000;
  animation: ${slideIn} 0.3s ease forwards;

  &.closing {
    animation: ${slideOut} 0.3s ease forwards;
  }
`

const typeStyles = {
  success: css`
    background-color: #10b981;
  `,
  error: css`
    background-color: #ef4444;
  `,
  info: css`
    background-color: #3b82f6;
  `,
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true)
      setTimeout(onClose, 300) // 애니메이션 종료 후 제거
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div css={[toastStyles, typeStyles[type]]} className={isClosing ? 'closing' : ''}>
      {message}
    </div>
  )
}
