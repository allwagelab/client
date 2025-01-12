import { Routes, Route } from 'react-router-dom'

import { EntrancePage } from '@/pages'

function Router() {
  return (
    <Routes>
      <Route index element={<EntrancePage />} />
      <Route path="*" element={<>Other...</>} />
    </Routes>
  )
}

export default Router
