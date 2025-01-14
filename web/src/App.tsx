import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

import { theme, GlobalStyles } from '@allwagelab/design'
import { MessageBusProvider, AuthProvider, ToastProvider } from '@allwagelab/message-bus'

import { decodeToken, encodeToken, PRIVATE_TOKEN_KEY } from '@/data'
import { QueryClientProvider } from '@/providers'
import Router from '@/routes'

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
              <AuthProvider
                tokenKey={PRIVATE_TOKEN_KEY}
                encodeToken={encodeToken}
                decodeToken={decodeToken}
              >
                <Router />
              </AuthProvider>
            </ToastProvider>
          </QueryClientProvider>
        </MessageBusProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
