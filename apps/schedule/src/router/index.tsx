import { Routes, Route } from 'react-router-dom'

import { MessageBusProvider, ToastProvider } from '@allwagelab/message-bus'

import { EntrancePage, DashboardPage } from '@/pages'

interface RouterProps {
  auth: string | null
}

function Router({ auth }: RouterProps) {
  console.log('auth:', auth)

  return (
    <MessageBusProvider>
      <ToastProvider>
        <Routes>
          <Route index element={<EntrancePage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="*" element={<>Other...</>} />
        </Routes>
      </ToastProvider>
    </MessageBusProvider>
  )
}

export default Router
