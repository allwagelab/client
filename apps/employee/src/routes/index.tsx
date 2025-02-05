import { Routes as RouteGroup, Route } from 'react-router-dom'

import { EntrancePage, AddEmployeePage } from '@/pages'
import { useAuthStateListener } from '@/stores/auth'

function Routes() {
  useAuthStateListener()

  return (
    <RouteGroup>
      <Route index element={<EntrancePage />} />
      <Route path="/new" element={<AddEmployeePage />} />
      <Route path="*" element={<>Other...</>} />
    </RouteGroup>
  )
}

export default Routes
