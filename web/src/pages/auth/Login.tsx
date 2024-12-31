import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import SignupModal from '@/components/auth/SignupModal'
import { useLogin } from '@/hooks'
import { PASSWORD_REGEX } from '@/lib/constants'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(PASSWORD_REGEX, '영문, 숫자, 특수문자를 모두 포함해야 합니다'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<string>('')
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  const { login, isLoggingIn } = useLogin({
    onError: (error) => setLoginError(error.message),
    redirectTo: '/home',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: LoginFormData) => {
    setLoginError('') // 에러 메시지 초기화
    login(data)
  }

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>이메일</Label>
          <Input type="email" placeholder="example@email.com" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>
          <Input type="password" placeholder="비밀번호를 입력해 주세요" {...register('password')} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </InputGroup>

        <CheckboxGroup>
          <CheckboxLabel>
            <Checkbox type="checkbox" />
            로그인 상태 유지
          </CheckboxLabel>
        </CheckboxGroup>

        <LoginButton type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? '로그인 중...' : '로그인'}
        </LoginButton>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
      </Form>

      <ActionGroup>
        <SignupButton type="button" onClick={() => setIsSignupModalOpen(true)}>
          회원가입
        </SignupButton>
        <Divider>
          <FindAccountButton onClick={() => navigate('/find-id')}>아이디 찾기</FindAccountButton>
          <DividerLine>|</DividerLine>
          <FindAccountButton onClick={() => navigate('/find-password')}>
            비밀번호 찾기
          </FindAccountButton>
        </Divider>
      </ActionGroup>

      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </Container>
  )
}

export default LoginPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 32px;
`

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`

const LoginButton = styled.button`
  padding: 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #1557b0;
  }
`

const ErrorMessage = styled.span`
  color: #d93025;
  font-size: 14px;
`

const CheckboxGroup = styled.div`
  margin-top: 8px;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
`

const Checkbox = styled.input`
  cursor: pointer;
`

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  width: 100%;
  max-width: 400px;
`

const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #1a73e8;
  border: 1px solid #1a73e8;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const DividerLine = styled.span`
  color: #ddd;
`

const FindAccountButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #1a73e8;
    text-decoration: underline;
  }
`
