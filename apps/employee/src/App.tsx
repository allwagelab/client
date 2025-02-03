import { BrowserRouter } from 'react-router-dom'

import { MessageBusProvider, ToastProvider } from '@allwagelab/message-bus'

import { QueryProvider } from '@/providers'
import { Provider } from '@/providers'

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <MessageBusProvider>
          <ToastProvider>
            <Provider
              auth={
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiYWxzZ2hrOTcwMUBnbWFpbC5jb20iLCJuYW1lIjpudWxsLCJsZXZlbCI6MywiaXNDb21wYW55Ijp0cnVlLCJpYXQiOjE3Mzg1NjcyOTUsImV4cCI6MTczODc0MDA5NX0.xKaKhlD4v6v4M2WfPPN-fy0L2p-OJt95CesabizUQf8'
              }
            />
          </ToastProvider>
        </MessageBusProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}

export default App
