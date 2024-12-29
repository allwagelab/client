import { http, HttpResponse, type PathParams } from 'msw'

const createURL = (url: string) => {
  const baseURL = import.meta.env.VITE_BASE_URL
  const fullURL = new URL(url, baseURL)
  return fullURL.href
}

// 로그인 mock
const login = http.post<PathParams, { email: string }>(
  createURL('/auth/login/email'),
  async ({ request }) => {
    const { email } = await request.json()
    return HttpResponse.json({
      success: true,
      data: {
        id: 1,
        email,
        name: '홍길동',
        level: 3,
        isCompany: true,
        isJob: true,
        isCompanyInfo: true,
        accessToken: 'accessToken값',
      },
    })
  },
)

// 이메일 중복 체크 mock
const checkEmailDuplicate = http.post<PathParams, { email: string }>(
  createURL('auth/check-email'),
  async ({ request }) => {
    const { email } = await request.json()

    return HttpResponse.json({
      success: true,
      isDuplicate: email === 'test@test.com', // test@test.com은 이미 존재하는 이메일로 가정
    })
  },
)

// 회원가입 mock
const signup = http.post(createURL('/auth/signup/email'), async () => {
  return HttpResponse.json({
    success: true,
    data: {
      name: '홍길동',
      email: 'test1@test.com',
    },
  })
})

// 사업자 등록번호 확인 mock
const verifyBusinessNumber = http.post<PathParams, { businessNumber: string }>(
  createURL('/auth/verify-business'),
  async ({ request }) => {
    const { businessNumber } = await request.json()
    const DB = ['000-00-00000']

    return HttpResponse.json({
      isDuplicate: DB.includes(businessNumber),
    })
  },
)

// 휴대폰 인증번호 요청 mock
const requestPhoneVerification = http.post(createURL('/auth/signup/send/code'), async () => {
  return HttpResponse.json({
    success: true,
    message: '인증번호가 발송되었습니다.',
  })
})

// 휴대폰 인증번호 확인 mock
const verifyPhoneNumber = http.post<PathParams, { code: string }>(
  createURL('/auth/signup/verify/code'),
  async ({ request }) => {
    const { code } = await request.json()
    // 1234는 올바른 인증번호로 가정
    if (code === '1234') {
      return HttpResponse.json({
        success: true,
        message: '인증이 완료되었습니다',
      })
    }

    return new HttpResponse(null, { status: 401, statusText: 'Unauthorized' })
  },
)

// 휴대폰 인증번호 요청 mock (아이디 찾기)
const requestPhoneVerificationFindId = http.post(createURL('/auth/email/send/code'), async () => {
  return HttpResponse.json({
    success: true,
    message: '인증번호가 발송되었습니다.',
  })
})

// 휴대폰 인증번호 확인 mock (아이디 찾기)
const verifyPhoneNumberFindId = http.post<PathParams, { code: string }>(
  createURL('/auth/email/verify/code'),
  async ({ request }) => {
    const { code } = await request.json()
    // 1234는 올바른 인증번호로 가정
    if (code === '1234') {
      return HttpResponse.json({
        success: true,
        message: '인증이 완료되었습니다',
      })
    }

    return new HttpResponse(null, { status: 401, statusText: 'Unauthorized' })
  },
)

// 아이디 찾기 mock
const findId = http.post<PathParams, { phoneNumber: string }>(
  createURL('/auth/find-id'),
  async ({ request }) => {
    const { phoneNumber } = await request.json()

    if (phoneNumber === '010-1234-5678') {
      return HttpResponse.json({
        success: true,
        data: {
          email: 'test@test.com',
        },
      })
    }

    return new HttpResponse(null, {
      status: 404,
      statusText: '가입된 계정이 없습니다.',
    })
  },
)

// 임시 비밀번호 발급 mock
const sendTempPassword = http.post<PathParams, { email: string }>(
  createURL('/auth/password/send/code'),
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'test@test.com') {
      return HttpResponse.json({
        success: true,
        message: '임시 비밀번호가 발송되었습니다.',
      })
    }

    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized',
    })
  },
)

export const handlers = [
  login,
  checkEmailDuplicate,
  signup,
  verifyBusinessNumber,
  requestPhoneVerification,
  verifyPhoneNumber,
  requestPhoneVerificationFindId,
  verifyPhoneNumberFindId,
  findId,
  sendTempPassword,
]
