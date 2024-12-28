export interface IToken {
  accessToken: string
}

export interface SignupFormData {
  email: string
  password: string
  passwordConfirm: string
}

export interface BusinessInfoFormData {
  businessName: string
  businessNumber: string
  phoneNumber: string
  verificationCode: string
  employeeCount: 'under5' | 'over5'
}

export interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    id: number
    email: string
    name: string
    level: number
    isCompany: boolean
    isJob: boolean
    isCompanyInfo: boolean
    accessToken: string
    refreshToken: string
  }
}

export interface ErrorResponse {
  message: string
}

export interface SignupRequest {
  email: string
  password: string
  hp: string
  sub: {
    name: string
    registration: string
    staffCount: '5인 미만' | '5인 이상'
  }
}

export interface SignupResponse {
  success: boolean
  data: {
    email: string
  }
}
