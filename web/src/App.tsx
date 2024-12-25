import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { theme, GlobalStyles } from '@allwagelab/design'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Router from './router'

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
