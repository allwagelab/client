import { useRoutes } from 'react-router-dom'

import { useAuth } from '@allwagelab/message-bus'

import { privateRoutes } from './private'
import { protectedRoutes } from './protected'

function Routes() {
  const { accessToken } = useAuth()
  const routes = useRoutes([protectedRoutes, privateRoutes(accessToken)])

  return routes
}

export default Routes
