import { Routes as RouteGroup, Route } from 'react-router-dom'

import { HomePage } from '@/pages'
import { useAuthStateListener } from '@/stores/auth'

function Routes() {
  useAuthStateListener()

  return (
    <RouteGroup>
      <Route index element={<HomePage />} />
      <Route path="*" element={<>Other...</>} />
    </RouteGroup>
  )
}

export default Routes
