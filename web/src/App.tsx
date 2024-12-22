import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Router from './router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={null}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </React.Suspense>
    </QueryClientProvider>
  )
}

export default App
