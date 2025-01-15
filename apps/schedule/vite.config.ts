import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { defineConfig } from 'vite'

const deps = require('./package.json').dependencies

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    federation({
      name: 'remote-app',
      filename: 'schedule.js',
      // Modules to expose
      exposes: {
        './ScheduleRoutes': './src/router/index.tsx',
      },
      shared: {
        react: {
          import: true, // host의 shared module을 사용
          requiredVersion: deps.react,
        },
        'react-dom': {
          import: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          import: true,
          requiredVersion: deps['react-router-dom'],
        },
        '@allwagelab/message-bus': {
          import: true,
          requiredVersion: false, // 버전 체크 비활성화
          generate: false, // remote는 shared chunk를 생성하지 않음
        },
      },
    }),
  ],
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
