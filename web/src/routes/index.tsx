import { useRoutes } from 'react-router-dom'

import { useAuth } from '@allwagelab/message-bus'

import { privateRoutes } from './private'
import { protectedRoutes } from './protected'

function Router() {
  const auth = useAuth()
  const routes = useRoutes([protectedRoutes, privateRoutes(auth)])

  return routes
}

export default Router
