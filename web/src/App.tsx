import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

import { theme, GlobalStyles } from '@allwagelab/design'

import { QueryClientProvider } from '@/providers'
import Router from '@/router'

if (import.meta.env.MODE === 'mock') {
  const { worker } = await import('@/mocks')
  worker.start()
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
