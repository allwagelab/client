import { theme, GlobalStyles } from '@allwagelab/design'
import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'

import Router from './router'
import { useAuthStore } from './stores/auth'

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks')
  worker.start()
}

const queryClient = new QueryClient()

function App() {
  const setAuth = useAuthStore(useShallow((state) => state.setAuth))
  useEffect(() => {
    if (localStorage.getItem('autoLogin') !== 'Y') {
      setAuth(null)
    }
  }, [setAuth])

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
