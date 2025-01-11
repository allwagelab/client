import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    federation({
      name: 'host-app',
      remotes: {
        home: 'http://localhost:3001/assets/home.js',
        schedule: 'http://localhost:3002/assets/schedule.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/?(*.)test.ts?(x)'],
  },
})
