import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import { useAuth } from '@allwagelab/message-bus'

import { initAxiosInterceptors } from '@/apis'

import { privateRoutes } from './private'
import { protectedRoutes } from './protected'

function Router() {
  const auth = useAuth()

  useEffect(() => {
    initAxiosInterceptors(auth)
  }, [auth])

  const routes = useRoutes([protectedRoutes, privateRoutes(auth)])

  return routes
}

export default Router
