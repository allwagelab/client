import { useEffect } from 'react'

import Routes from '@/routes'
import { initializeAuthStore } from '@/stores/auth'

interface ProviderProps {
  auth: string | null
}

function Provider({ auth }: ProviderProps) {
  useEffect(() => {
    initializeAuthStore(auth)
  }, [auth])

  return <Routes />
}

export default Provider
