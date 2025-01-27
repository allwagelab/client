import React, { type ReactElement } from 'react'

import { ThemeProvider } from '@emotion/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { render, renderHook, type RenderOptions } from '@testing-library/react'

import { theme } from '@allwagelab/design'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper, ...options })

const customRenderHook: typeof renderHook = (render, options) =>
  renderHook(render, { wrapper, ...options })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render, customRenderHook as renderHook }
