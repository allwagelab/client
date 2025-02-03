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
            <Provider auth={null} />
          </ToastProvider>
        </MessageBusProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}

export default App
