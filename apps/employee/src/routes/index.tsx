import { Routes as RouteGroup, Route } from 'react-router-dom'

import { EntrancePage } from '@/pages'
import { useAuthStateListener } from '@/stores/auth'

function Routes() {
  useAuthStateListener()

  return (
    <RouteGroup>
      <Route index element={<EntrancePage />} />
      <Route path="*" element={<>Other...</>} />
    </RouteGroup>
  )
}

export default Routes
