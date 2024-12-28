import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendTempPassword } from '@/apis/auth'
import { useLogin } from '@/hooks'

const findPasswordSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
  temporaryPassword: z.string().min(1, '임시 비밀번호를 입력해주세요'),
})

type FindPasswordFormData = z.infer<typeof findPasswordSchema>

function FindPasswordPage() {
  const [showTemporaryPasswordField, setShowTemporaryPasswordField] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onBlur',
  })

  const { mutate: sendTemporaryPassword, isPending: isSendingTemp } = useMutation({
    mutationFn: sendTempPassword,
    onSuccess: () => {
      setShowTemporaryPasswordField(true)
      setSuccessMessage('이메일로 임시 비밀번호를 발송했습니다. 이메일을 확인해주세요.')
    },
    onError: (error: Error) => {
      setError('email', {
        type: 'manual',
        message: error.message,
      })
      setSuccessMessage('')
    },
  })

  const { login, isLoggingIn } = useLogin({
    onError: () => {
      setError('temporaryPassword', {
        type: 'manual',
        message: '임시 비밀번호가 올바르지 않습니다',
      })
    },
    redirectTo: '/home',
    // redirectTo: '/mypage/reset-password',
  })

  const handleSendTemporary = async () => {
    const isValid = await trigger('email')
    if (isValid) {
      const email = watch('email')
      sendTemporaryPassword(email)
    }
  }

  const onSubmit = async (data: FindPasswordFormData) => {
    login({
      email: data.email,
      password: data.temporaryPassword,
    })
  }

  return (
    <Container>
      <Title>비밀번호를 잊으셨나요?</Title>
      <SubTitle>가입된 이메일로 임시 비밀번호를 발급받아 로그인하실 수 있습니다.</SubTitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>이메일</Label>
          <InputWithButton>
            <Input
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              onChange={(e) => {
                register('email').onChange(e)
                setSuccessMessage('')
                clearErrors('email')
              }}
            />
            <VerifyButton type="button" onClick={handleSendTemporary} disabled={isSendingTemp}>
              {isSendingTemp ? '발급 중...' : '임시 비밀번호 발급'}
            </VerifyButton>
          </InputWithButton>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </InputGroup>

        {showTemporaryPasswordField && (
          <InputGroup>
            <Label>임시 비밀번호</Label>
            <Input
              type="password"
              placeholder="발급받은 임시 비밀번호를 입력해주세요"
              {...register('temporaryPassword')}
            />
            {errors.temporaryPassword && (
              <ErrorMessage>{errors.temporaryPassword.message}</ErrorMessage>
            )}
          </InputGroup>
        )}

        <ButtonGroup>
          <LoginButton type="submit" disabled={!showTemporaryPasswordField || isLoggingIn}>
            {isLoggingIn ? '로그인 중...' : '로그인'}
          </LoginButton>
        </ButtonGroup>
      </Form>
    </Container>
  )
}

export default FindPasswordPage

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 12px;
`

export const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
`

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`

export const InputWithButton = styled.div`
  display: flex;
  gap: 8px;
`

export const VerifyButton = styled.button`
  padding: 0 16px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1557b0;
  }
`

export const ErrorMessage = styled.span`
  color: #d93025;
  font-size: 14px;
`

const ButtonGroup = styled.div`
  margin-top: 32px;
`

const LoginButton = styled.button`
  width: 100%;
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

  &:hover:not(:disabled) {
    background-color: #1557b0;
  }
`

export const SuccessMessage = styled.span`
  color: #0f9d58;
  font-size: 14px;
`
