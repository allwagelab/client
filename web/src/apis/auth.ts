import { AxiosError } from 'axios'

import { MESSAGES } from '@allwagelab/constants'

import { axiosInstance, axiosCredentialsInstance } from '@/apis'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/auth'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosCredentialsInstance.post<LoginResponse>('/auth/login/email', data)
    return response.data
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.LOG_IN.ERROR

    if (error instanceof AxiosError && error.response?.status === 401) {
      errorMessage = MESSAGES.AUTH.LOG_IN.UNAUTHORIZED
    }

    throw new Error(errorMessage)
  }
}

export const checkEmailDuplicate = async (email: string) => {
  try {
    await axiosInstance.post<boolean>('/auth/check/email', { email })
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.EMAIL.DUPLICATED_ERROR

    if (error instanceof AxiosError && error.response?.status === 401) {
      errorMessage = MESSAGES.AUTH.EMAIL.DUPLICATED
    }

    throw new Error(errorMessage)
  }
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<SignupResponse>('/auth/signup/email', data)
    return response.data
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.SIGN_UP.ERROR

    if (error instanceof AxiosError && error.response?.status === 401) {
      errorMessage = MESSAGES.AUTH.SIGN_UP.UNAUTHORIZED
    }

    throw new Error(errorMessage)
  }
}

export const verifyBusinessNumber = async (businessNumber: string) => {
  try {
    await axiosInstance.post('/auth/check/registration', {
      registration: businessNumber,
    })
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.BUSINESS.REGISTRATION_NUMBER.ERROR

    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        errorMessage = MESSAGES.AUTH.BUSINESS.REGISTRATION_NUMBER.INVALID_FORMAT
      }
      if (error.response.status === 401) {
        errorMessage = MESSAGES.AUTH.BUSINESS.REGISTRATION_NUMBER.DUPLICATED
      }
      if (error.response.status === 404) {
        errorMessage = MESSAGES.AUTH.BUSINESS.REGISTRATION_NUMBER.NOT_FOUND
      }
    }
    throw new Error(errorMessage)
  }
}

export const requestPhoneVerification = async (phoneNumber: string) => {
  try {
    await axiosInstance.post('/auth/signup/send/code', {
      hp: phoneNumber,
    })
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.PHONE.VERIFICATION_REQUEST_ERROR

    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        errorMessage = MESSAGES.AUTH.PHONE.INVALID_FORMAT
      }
      if (error.response.status === 401) {
        errorMessage = MESSAGES.AUTH.PHONE.DUPLICATED
      }
    }

    throw new Error(errorMessage)
  }
}

export const verifyPhoneNumber = async (phoneNumber: string, code: string) => {
  try {
    await axiosInstance.post('/auth/signup/verify/code', {
      hp: phoneNumber,
      code,
    })
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.PHONE.VERIFICATION_CHECK_ERROR

    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        errorMessage = MESSAGES.AUTH.PHONE.UNAUTHORIZED_CODE
      }
    }

    throw new Error(errorMessage)
  }
}

export const requestPhoneVerificationFindId = async (phoneNumber: string) => {
  try {
    await axiosInstance.post('/auth/email/send/code', {
      hp: phoneNumber,
    })
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.PHONE.VERIFICATION_REQUEST_ERROR

    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        errorMessage = MESSAGES.AUTH.PHONE.INVALID_FORMAT
      }
      if (error.response.status === 401) {
        errorMessage = MESSAGES.AUTH.PHONE.NOT_FOUND
      }
    }

    throw new Error(errorMessage)
  }
}

export const verifyPhoneNumberFindId = async (phoneNumber: string, code: string) => {
  try {
    const response = await axiosInstance.post('/auth/email/verify/code', {
      hp: phoneNumber,
      code,
    })

    return response.data.data
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.PHONE.VERIFICATION_CHECK_ERROR

    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 401) {
        errorMessage = MESSAGES.AUTH.PHONE.UNAUTHORIZED_CODE
      }
    }

    throw new Error(errorMessage)
  }
}

export const sendTempPassword = async (email: string) => {
  try {
    await axiosInstance.post('/auth/password/send/code', {
      email,
    })
  } catch (error) {
    let errorMessage = MESSAGES.AUTH.PASSWORD.TEMP_REQUEST_ERROR

    if (error instanceof AxiosError && error.response?.status === 401) {
      errorMessage = MESSAGES.AUTH.EMAIL.NOT_FOUND
    }

    throw new Error(errorMessage)
  }
}
