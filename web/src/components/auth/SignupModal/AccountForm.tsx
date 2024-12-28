import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { checkEmailDuplicate } from '@/apis/auth'
import type { SignupFormData } from '@/types/auth'

const signupSchema = z
  .object({
    email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        '영문, 숫자, 특수문자를 모두 포함해야 합니다',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

interface AccountFormProps {
  onSubmit: (data: SignupFormData) => void
  defaultValues?: SignupFormData
}

function AccountForm({ onSubmit, defaultValues }: AccountFormProps) {
  const [isEmailVerified, setIsEmailVerified] = useState(Boolean(defaultValues?.email))

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const { mutate: checkEmail, isPending: isCheckingEmail } = useMutation({
    mutationFn: checkEmailDuplicate,
    onSuccess: (isDuplicate) => {
      if (isDuplicate) {
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다',
        })
        setIsEmailVerified(false)
      } else {
        clearErrors('email')
        setIsEmailVerified(true)
      }
    },
    onError: () => {
      setError('email', {
        type: 'manual',
        message: '이메일 중복 확인 중 오류가 발생했습니다',
      })
      setIsEmailVerified(false)
    },
  })

  const handleEmailCheck = async () => {
    const isValid = await trigger('email')
    if (isValid) {
      const email = watch('email')
      checkEmail(email)
    }
  }

  const handleFormSubmit = (data: SignupFormData) => {
    if (!isEmailVerified) {
      setError('email', {
        type: 'manual',
        message: '이메일 중복 확인이 필요합니다',
      })
      return
    }
    onSubmit(data)
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputGroup>
        <Label>이메일</Label>
        <EmailInputWrapper>
          <EmailInput
            type="email"
            placeholder="example@email.com"
            {...register('email')}
            onChange={(e) => {
              register('email').onChange(e)
              setIsEmailVerified(false)
            }}
          />
          <CheckButton type="button" onClick={handleEmailCheck} disabled={isCheckingEmail}>
            {isCheckingEmail ? '확인 중...' : '중복 확인'}
          </CheckButton>
        </EmailInputWrapper>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        {isEmailVerified && <SuccessMessage>사용 가능한 이메일입니다</SuccessMessage>}
      </InputGroup>

      <InputGroup>
        <Label>비밀번호</Label>
        <Input type="password" placeholder="비밀번호를 입력해 주세요" {...register('password')} />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
      </InputGroup>

      <NextButton type="submit">다음</NextButton>
    </Form>
  )
}

const Form = styled.form`
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

const EmailInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`

const EmailInput = styled(Input)`
  flex: 1;
`

const CheckButton = styled.button`
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

  &:not(:disabled):hover {
    background-color: #1557b0;
  }
`

const NextButton = styled.button`
  padding: 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #1557b0;
  }
`

const ErrorMessage = styled.span`
  color: #d93025;
  font-size: 14px;
`

const SuccessMessage = styled.span`
  color: #0f9d58;
  font-size: 14px;
`

export default AccountForm
