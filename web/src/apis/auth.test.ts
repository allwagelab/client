import { describe, it, expect, beforeEach } from 'vitest'

import { login } from '@/apis/auth'

describe('Auth API', () => {
  beforeEach(() => {
    // 테스트 전 상태 초기화
    localStorage.clear()
  })

  it('should login successfully with valid credentials', async () => {
    const mockCredentials = {
      email: 'test@test.com',
      password: 'Test123!@#',
    }

    const { data } = await login(mockCredentials)

    expect(data).toHaveProperty('accessToken')
    expect(data.accessToken).toBeTruthy()
  })

  it('should throw error with invalid credentials', async () => {
    const mockCredentials = {
      email: 'test@test.com',
      password: 'test1234!',
    }

    await expect(login(mockCredentials)).rejects.toThrow()
  })
})
