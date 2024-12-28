import { axiosInstance } from './index'
import { AxiosError } from 'axios'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/auth'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/auth/login/email', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('이메일 또는 비밀번호를 확인해 주세요')
    }
    throw new Error('로그인 중 오류가 발생했습니다')
  }
}

export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  // const response = await axiosInstance.post<{ isDuplicate: boolean }>(
  //   "",
  //   { email }
  // );

  // return response.data.isDuplicate;
  console.log(email)
  return false
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    // const response = await axiosInstance.post<SignupResponse>(
    //   "/auth/signup",
    //   data
    // );
    // return response.data;
    console.log(data)
    return { success: true, message: '회원가입 성공' }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      throw new Error(error.response.data.message || '회원가입에 실패했습니다')
    }
    throw new Error('회원가입 중 오류가 발생했습니다')
  }
}

export const verifyBusinessNumber = async (businessNumber: string): Promise<boolean> => {
  try {
    // const response = await axiosInstance.post<{ isDuplicate: boolean }>(
    //   "/auth/verify-business",
    //   { businessNumber }
    // );
    // return !response.data.isDuplicate;
    console.log(businessNumber)
    return true
  } catch {
    throw new Error('사업자 등록번호 확인 중 오류가 발생했습니다')
  }
}

export const requestPhoneVerification = async (phoneNumber: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/auth/signup/send/code', { hp: phoneNumber })
    return response.data
  } catch {
    throw new Error('인증번호 전송 중 오류가 발생했습니다')
  }
}

export const verifyPhoneNumber = async (phoneNumber: string, code: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/auth/signup/verify/code', { hp: phoneNumber, code })
    console.log(response)
    return true
  } catch {
    throw new Error('인증번호 확인 중 오류가 발생했습니다')
  }
}

export interface FindIdResponse {
  success: boolean
  data: {
    email: string
  }
}

export const findId = async (phoneNumber: string): Promise<FindIdResponse> => {
  try {
    // const response = await axiosInstance.post<FindIdResponse>("/test", {
    //   phoneNumber,
    // });
    console.log(phoneNumber)
    return { success: true, data: { email: 'test@test.com' } }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      throw new Error('가입된 계정이 없습니다')
    }
    throw new Error('아이디 찾기 중 오류가 발생했습니다')
  }
}

export interface SendTempPasswordResponse {
  success: boolean
  message: string
}

export const sendTempPassword = async (email: string): Promise<SendTempPasswordResponse> => {
  try {
    // const response = await axiosInstance.post<SendTempPasswordResponse>("/test", {
    //   email,
    // });
    // return response.data;
    console.log(email)
    return { success: true, message: '임시 비밀번호가 발급되었습니다' }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      throw new Error('등록되지 않은 이메일입니다')
    }
    throw new Error('임시 비밀번호 발급 중 오류가 발생했습니다')
  }
}
