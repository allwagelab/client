import { Routes, Route } from 'react-router-dom'

import { MessageBusProvider, RemoteAuthProvider, ToastProvider } from '@allwagelab/message-bus'
import type { AuthState } from '@allwagelab/schemas'

import { EntrancePage, DashboardPage } from '@/pages'

interface Props {
  auth: AuthState
}

function Router({ auth }: Props) {
  return (
    <MessageBusProvider>
      <ToastProvider>
        <RemoteAuthProvider initialState={auth}>
          <Routes>
            <Route index element={<EntrancePage />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="*" element={<>Other...</>} />
          </Routes>
        </RemoteAuthProvider>
      </ToastProvider>
    </MessageBusProvider>
  )
}

export default Router
