import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { requestPhoneVerification, verifyPhoneNumber, findId } from '@/apis/auth'
import { useNavigate } from 'react-router-dom'

const findIdSchema = z.object({
  phoneNumber: z.string().regex(/^01\d{9}$/, '올바른 휴대폰 번호 형식이 아닙니다'),
  verificationCode: z.string().min(1, '인증번호를 입력해주세요'),
})

type FindIdFormData = z.infer<typeof findIdSchema>

type FindIdStep = 'FORM' | 'NOT_FOUND' | 'FOUND'

interface FoundState {
  email: string
}

function FindIdPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<FindIdStep>('FORM')
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [showVerificationField, setShowVerificationField] = useState(false)
  const [foundData, setFoundData] = useState<FoundState | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FindIdFormData>({
    resolver: zodResolver(findIdSchema),
    mode: 'onBlur',
  })

  const { mutate: sendVerification, isPending: isSendingVerification } = useMutation({
    mutationFn: requestPhoneVerification,
    onSuccess: () => {
      setShowVerificationField(true)
    },
    onError: (error: Error) => {
      setError('phoneNumber', {
        type: 'manual',
        message: error.message,
      })
    },
  })

  const { mutate: verifyPhone, isPending: isVerifyingPhone } = useMutation({
    mutationFn: ({
      phoneNumber,
      code,
    }: {
      phoneNumber: string
      code: string
    }) => verifyPhoneNumber(phoneNumber, code),
    onSuccess: (isValid) => {
      if (isValid) {
        setIsPhoneVerified(true)
        clearErrors('verificationCode')
      } else {
        setError('verificationCode', {
          type: 'manual',
          message: '잘못된 인증번호입니다',
        })
      }
    },
    onError: (error: Error) => {
      setError('verificationCode', {
        type: 'manual',
        message: error.message,
      })
    },
  })

  const { mutate: findAccount /* , isPending: isFinding */ } = useMutation({
    mutationFn: findId,
    onSuccess: (response) => {
      setFoundData({ email: response.data.email })
      setCurrentStep('FOUND')
    },
    onError: (error) => {
      if (error.message === '가입된 계정이 없습니다') {
        setCurrentStep('NOT_FOUND')
      } else {
        // 다른 에러 처리
        setError('phoneNumber', {
          type: 'manual',
          message: error.message,
        })
      }
    },
  })

  const handlePhoneVerification = () => {
    const phoneNumber = watch('phoneNumber')

    // 휴대폰 번호 형식 검사
    const phoneNumberRegex = /^01\d{9}$/
    if (!phoneNumber) {
      setError('phoneNumber', {
        type: 'manual',
        message: '휴대폰 번호를 입력해주세요',
      })
      return
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      setError('phoneNumber', {
        type: 'manual',
        message: '올바른 휴대폰 번호 형식이 아닙니다 (예: 01012345678)',
      })
      return
    }

    sendVerification(phoneNumber)
  }

  const handleVerifyCode = () => {
    const code = watch('verificationCode')
    const phoneNumber = watch('phoneNumber')
    if (!code) {
      setError('verificationCode', {
        type: 'manual',
        message: '인증번호를 입력해주세요',
      })
      return
    }
    verifyPhone({ phoneNumber, code })
  }

  const onSubmit = async (data: FindIdFormData) => {
    if (!isPhoneVerified) {
      setError('phoneNumber', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다',
      })
      return
    }

    findAccount(data.phoneNumber)
  }

  if (currentStep === 'FOUND' && foundData) {
    return (
      <Container>
        <Title>가입된 이메일 확인</Title>
        <SubTitle>입력하신 휴대폰 번호로 인증된 이메일은 다음과 같습니다.</SubTitle>
        <EmailBox>{foundData.email}</EmailBox>
        <ButtonGroup>
          <SignupButton onClick={() => navigate('/login')}>로그인 하기</SignupButton>
          <RetryButton onClick={() => navigate('/find-password')}>비밀번호 찾기</RetryButton>
        </ButtonGroup>
      </Container>
    )
  }

  if (currentStep === 'NOT_FOUND') {
    return (
      <Container>
        <Title>가입된 계정이 없습니다</Title>
        <SubTitle>
          입력하신 휴대폰 번호로 가입된 계정이 없습니다.
          <br />
          회원가입 후 서비스를 이용해 주세요.
        </SubTitle>
        <ButtonGroup>
          <SignupButton onClick={() => navigate('/login')}>회원가입하기</SignupButton>
          <RetryButton onClick={() => setCurrentStep('FORM')}>다시 찾기</RetryButton>
        </ButtonGroup>
      </Container>
    )
  }

  return (
    <Container>
      <Title>아이디를 잊으셨나요?</Title>
      <SubTitle>가입된 이메일 확인을 위해 휴대폰번호를 입력해 주세요.</SubTitle>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>휴대폰 번호</Label>
          <InputWithButton>
            <Input
              type="tel"
              placeholder="(-) 제외 입력해주세요"
              {...register('phoneNumber')}
              onChange={(e) => {
                register('phoneNumber').onChange(e)
                setIsPhoneVerified(false)
                setShowVerificationField(false)
                clearErrors('phoneNumber')
              }}
            />
            <VerifyButton
              type="button"
              onClick={handlePhoneVerification}
              disabled={isSendingVerification}
            >
              {isSendingVerification ? '전송 중...' : '인증 요청'}
            </VerifyButton>
          </InputWithButton>
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
        </InputGroup>

        {showVerificationField && (
          <InputGroup>
            <Label>인증 번호</Label>
            <InputWithButton>
              <Input
                type="text"
                placeholder="인증번호를 입력해주세요"
                {...register('verificationCode')}
              />
              <VerifyButton type="button" onClick={handleVerifyCode} disabled={isVerifyingPhone}>
                {isVerifyingPhone ? '확인 중...' : '인증 확인'}
              </VerifyButton>
            </InputWithButton>
            {errors.verificationCode && (
              <ErrorMessage>{errors.verificationCode.message}</ErrorMessage>
            )}
            {isPhoneVerified && <SuccessMessage>휴대폰 인증이 완료되었습니다</SuccessMessage>}
          </InputGroup>
        )}

        <FindButton type="submit" disabled={!isPhoneVerified}>
          아이디 찾기
        </FindButton>
      </Form>
    </Container>
  )
}

export default FindIdPage

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
  margin-bottom: 12px;
`

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
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

const InputWithButton = styled.div`
  display: flex;
  gap: 8px;
`

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`

const VerifyButton = styled.button`
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

const FindButton = styled.button`
  width: 100%;
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

  &:hover:not(:disabled) {
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin-top: 32px;
`

const SignupButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1557b0;
  }
`

const RetryButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #1a73e8;
  border: 1px solid #1a73e8;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`

const EmailBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  margin: 24px 0;
`