import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { defineConfig } from 'vitest/config'

// package.json의 dependencies를 가져옵니다
const deps = require('./package.json').dependencies

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
        employee: 'http://localhost:3003/assets/employee.js',
      },
      shared: {
        react: {
          import: false,
          requiredVersion: deps.react,
        },
        'react-dom': {
          import: false,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          import: false,
          requiredVersion: deps['react-router-dom'],
        },
        '@allwagelab/message-bus': {
          import: false,
          version: deps['@allwagelab/message-bus'],
          modulePreload: true,
        },
      },
    }),
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
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
})
