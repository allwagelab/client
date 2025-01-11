<<<<<<< HEAD
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

=======
>>>>>>> develop
import { theme, GlobalStyles } from '@allwagelab/design'
import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from './router'

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks')
  worker.start()
}

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
