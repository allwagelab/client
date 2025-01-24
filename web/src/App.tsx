import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

import { theme, GlobalStyles } from '@allwagelab/design'
import { MessageBusProvider, AuthProvider, ToastProvider } from '@allwagelab/message-bus'

import { QueryClientProvider } from '@/providers'
import Routes from '@/routes'
import { authService } from '@/services/authService'

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks')
  worker.start()
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MessageBusProvider>
          <QueryClientProvider>
            <ToastProvider>
              <AuthProvider authService={authService}>
                <Routes />
              </AuthProvider>
            </ToastProvider>
          </QueryClientProvider>
        </MessageBusProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
