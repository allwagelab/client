import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

import { theme, GlobalStyles } from '@allwagelab/design'

import Router from './router'

function App() {
  return (
    <React.Suspense fallback={null}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
