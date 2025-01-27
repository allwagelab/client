import { test, expect } from '@playwright/test'

test.describe('Login', () => {
  test('access to login page', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible()
  })

  test('should login successfully', async ({ page }) => {
    await page.goto('/login')

    // 로그인 폼 입력
    await page.fill('input[type="email"]', 'test@test.com')
    await page.fill('input[type="password"]', 'test1234!')

    // 로그인 버튼 클릭
    await page.click('button[type="submit"]')

    // 로그인 후 홈 페이지로 이동 확인
    await expect(page).toHaveURL('/home')

    // 로그인 상태 확인
    const userMenu = await page.getByText('USER NAME')
    await expect(userMenu).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[type="email"]', 'wrong@example.com')
    await page.fill('input[type="password"]', 'wrong1234!')

    await page.click('button[type="submit"]')

    // 에러 메시지 확인
    const errorMessage = await page.getByText('이메일과 비밀번호가 일치하지 않습니다.')
    await expect(errorMessage).toBeVisible()
  })
})
