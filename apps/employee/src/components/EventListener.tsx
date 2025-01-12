import { useEffect } from 'react'

import { type MessageData, isValidEventOrigin } from '@allwagelab/utils'

export const EventListener = () => {
  useEffect(() => {
    const handleIncomingMessage = ({ origin, data }: MessageEvent<MessageData>) => {
      console.log('data:', data)
      if (!isValidEventOrigin(origin)) {
        return
      }

      if (data.type === 'routeChange') {
        history.replaceState({}, '', data.route)
      }
    }

    addEventListener('message', handleIncomingMessage)

    return () => {
      removeEventListener('message', handleIncomingMessage)
    }
  }, [])

  return null
}