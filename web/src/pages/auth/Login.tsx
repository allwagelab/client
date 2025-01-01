import { css } from '@emotion/react'
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
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
      <CopyRightText>Copyright 2025 (주) 올웨이지. All rights reserved</CopyRightText>
    </Container>
  )
}

export default LoginPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title.t1_sb}
    color: ${theme.colors.baseBlack};
    padding-bottom: 2.5rem;
  `}
`

const Form = styled.form`
  width: 100%;
  max-width: 428px;
  display: flex;
  flex-direction: column;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
`

const Label = styled.label`
  ${({ theme }) => css`
    ${theme.typography.body.b4_rg}
    color: ${theme.colors.gray80};
  `}
`

const Input = styled.input`
  ${({ theme }) => css`
    padding: 1rem;
    border: 1px solid ${theme.colors.gray30};
    border-radius: 4px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: ${theme.colors.blue60};
    }

    &::placeholder {
      color: ${theme.colors.gray70};
    }
  `}
`

const LoginButton = styled.button`
  padding: 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

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
  padding-bottom: 3.75rem;
`

const CheckboxLabel = styled.label`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    ${theme.typography.body.b2_rg}
    color: ${theme.colors.gray100};
    cursor: pointer;
  `}
`

const Checkbox = styled.input`
  ${({ theme }) => css`
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid ${theme.colors.gray30};
    cursor: pointer;
    position: relative;

    &:checked {
      background-color: ${theme.colors.blue60};

      &::after {
        content: '';
        position: absolute;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:hover {
      border-color: ${theme.colors.gray30};
    }
  `}
`

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 428px;
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
  gap: 20px;
`

const DividerLine = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray90};
  `}
`

const FindAccountButton = styled.button`
  ${({ theme }) => css`
    background: none;
    border: none;
    color: ${theme.colors.gray90};
    ${theme.typography.body.b4_rg}
    cursor: pointer;
    padding: 1rem;

    &:hover {
      color: ${theme.colors.blue60};
      text-decoration: underline;
    }
  `}
`

const CopyRightText = styled.span`
  ${({ theme }) => css`
    margin-top: 3rem;
    ${theme.typography.body.b4_rg}
    color: ${theme.colors.gray70};
  `}
`
