import '@testing-library/jest-dom'
import { vi } from 'vitest'

import { server } from '@/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// 전역 모의 객체 설정
vi.mock('@allwagelab/message-bus', () => ({
  getGlobalMessageBus: vi.fn(),
  showGlobalToast: vi.fn(),
}))

// localStorage 모의 구현
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: 0,
}
global.localStorage = localStorageMock
