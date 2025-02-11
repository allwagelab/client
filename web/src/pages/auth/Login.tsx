import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { PASSWORD_REGEX, MESSAGES } from '@allwagelab/constants'
import { Button, Checkbox } from '@allwagelab/react'

import SignupModal from '@/components/auth/SignupModal'
import { useLogin } from '@/hooks'
import {
  Container,
  ErrorMessage,
  Form,
  Input,
  InputGroup,
  Label,
  Title,
  TitleGroup,
} from '@/styles'

const loginSchema = z.object({
  email: z.string().min(1, MESSAGES.AUTH.EMAIL.EMPTY).email(MESSAGES.AUTH.EMAIL.INVALID_FORMAT),
  password: z.string().refine(pwd => {
    if (pwd.length < 1 || PASSWORD_REGEX.test(pwd)) {
      return true
    }
    return false
  }, MESSAGES.AUTH.PASSWORD.INVALID_FORMAT),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate()
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isAutoLogin, setIsAutoLogin] = useState(localStorage.getItem('autoLogin') === 'Y')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const { login, isLoggingIn } = useLogin({
    autoLogin: isAutoLogin,
    onError: error =>
      setError('password', {
        message: error.message,
      }),
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <Container>
      <TitleGroup>
        <Title>로그인</Title>
      </TitleGroup>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>이메일</Label>
          <Input type="email" placeholder="example@email.com" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder={MESSAGES.AUTH.PASSWORD.EMPTY}
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </InputGroup>

        <CheckboxGroup>
          <Checkbox
            label="로그인 상태 유지"
            checked={isAutoLogin}
            onChange={e => setIsAutoLogin(e.target.checked)}
          />
        </CheckboxGroup>

        <Button full type="submit" loading={isLoggingIn} disabled={isLoggingIn}>
          로그인
        </Button>
      </Form>

      <ActionGroup>
        <Button full type="button" onClick={() => setIsSignupModalOpen(true)} variant="outline">
          회원가입
        </Button>
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

const CheckboxGroup = styled.div`
  padding-bottom: 3.75rem;
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
