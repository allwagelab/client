import { PHONE_NUMBER_REGEX } from '@allwagelab/constants'
import { Button } from '@allwagelab/react'
import { formatPhoneNumber } from '@allwagelab/utils'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { requestPhoneVerificationFindId, verifyPhoneNumberFindId } from '@/apis/auth'
import SignupModal from '@/components/auth/SignupModal'
import useTimer from '@/hooks/useTimer'

const findIdSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .regex(PHONE_NUMBER_REGEX, '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-0000-0000)'),
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
  const [isRequestButtonActive, setIsRequestButtonActive] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [foundData, setFoundData] = useState<FoundState | null>(null)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FindIdFormData>({
    resolver: zodResolver(findIdSchema),
    mode: 'onBlur',
  })

  const {
    formatTime,
    start: startTimer,
    stop: stopTimer,
    isRunning,
  } = useTimer({
    initialSeconds: 180,
    onEnd: () => {
      setError('verificationCode', {
        type: 'manual',
        message: '인증 시간이 만료되었습니다. 다시 시도해주세요.',
      })
    },
  })

  const { mutate: sendVerification, isPending: isSendingVerification } = useMutation({
    mutationFn: requestPhoneVerificationFindId,
    onSuccess: () => {
      setIsCodeSent(true)
      clearErrors('verificationCode')
      startTimer()
    },
    onError: (error: Error) => {
      if (error.message === '가입된 계정이 없습니다') {
        setCurrentStep('NOT_FOUND')
      } else {
        setError('phoneNumber', {
          type: 'manual',
          message: error.message,
        })
      }
    },
  })

  const { mutate: verifyPhone, isPending: isVerifyingPhone } = useMutation({
    mutationFn: ({ phoneNumber, code }: { phoneNumber: string; code: string }) =>
      verifyPhoneNumberFindId(phoneNumber, code),
    onSuccess: (email: string) => {
      setIsPhoneVerified(true)
      clearErrors('verificationCode')
      setFoundData({ email })
    },
    onError: (error: Error) => {
      setError('verificationCode', {
        type: 'manual',
        message: error.message,
      })
    },
  })

  const handlePhoneVerification = async () => {
    const isValid = await trigger('phoneNumber')
    if (isValid) {
      const phoneNumber = watch('phoneNumber')
      sendVerification(phoneNumber)
    }
  }

  const handleVerifyCode = () => {
    const code = watch('verificationCode')
    if (!code) {
      setError('verificationCode', {
        type: 'manual',
        message: '인증번호를 입력해주세요',
      })
      return
    }

    const phoneNumber = watch('phoneNumber')
    verifyPhone({ phoneNumber, code })
    stopTimer()
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    e.target.value = formatPhoneNumber(value)

    if (value === '') {
      setIsRequestButtonActive(false)
    } else {
      setIsRequestButtonActive(true)
    }

    register('phoneNumber').onChange(e)
    setIsPhoneVerified(false)
    setIsCodeSent(false)
    clearErrors('phoneNumber')
  }

  const onSubmit = async () => {
    if (!isPhoneVerified) {
      setError('phoneNumber', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다',
      })
      return
    }

    setCurrentStep('FOUND')
  }

  if (currentStep === 'FOUND' && foundData) {
    return (
      <Container>
        <Form>
          <Title>가입된 이메일 확인</Title>
          <SubTitle>입력하신 휴대폰 번호로 인증된 이메일은 다음과 같습니다.</SubTitle>
          <EmailBox>{foundData.email}</EmailBox>
          <ButtonGroup>
            <Button type="button" variant="outline" onClick={() => navigate('/find-password')}>
              비밀번호 찾기
            </Button>
            <Button type="button" onClick={() => navigate('/login')}>
              로그인 하기
            </Button>
          </ButtonGroup>
        </Form>
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
          <Button type="button" onClick={() => setIsSignupModalOpen(true)}>
            회원가입
          </Button>
          <Button type="button" onClick={() => setCurrentStep('FORM')}>
            다시 찾기
          </Button>
        </ButtonGroup>
        <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
      </Container>
    )
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>아이디를 잊으셨나요?</Title>
        <SubTitle>가입된 이메일 확인을 위해 휴대폰번호를 입력해 주세요.</SubTitle>

        <InputGroup>
          <Label>휴대폰 번호</Label>
          <InputWithButton>
            <Input
              type="tel"
              placeholder="010-0000-0000"
              {...register('phoneNumber')}
              onChange={handlePhoneNumberChange}
            />

            <Button
              type="button"
              loading={isSendingVerification}
              onClick={handlePhoneVerification}
              disabled={!isRequestButtonActive}
            >
              {isCodeSent ? '재전송' : '인증 요청'}
            </Button>
          </InputWithButton>
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label>인증 번호</Label>
          <InputWithButton>
            <Input
              type="text"
              placeholder="인증번호를 입력해주세요"
              {...register('verificationCode')}
            />
            <Button
              type="button"
              loading={isVerifyingPhone}
              onClick={handleVerifyCode}
              disabled={isPhoneVerified || !isCodeSent}
            >
              인증 확인
            </Button>
          </InputWithButton>
          {isRunning && <TimerText>{formatTime()}</TimerText>}
          {errors.verificationCode && (
            <ErrorMessage>{errors.verificationCode.message}</ErrorMessage>
          )}
          {isPhoneVerified && <SuccessMessage>휴대폰 인증이 완료되었습니다</SuccessMessage>}
        </InputGroup>

        <ButtonGroup>
          <Button type="submit">가입된 아이디 찾기</Button>
        </ButtonGroup>
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
`

const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title.t1_sb}
    color: ${theme.colors.baseBlack};
  `}
`

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
  ${({ theme }) => css`
    ${theme.typography.body.b2_rg}
    color: ${theme.colors.baseBlack};
  `}
`

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
`

const Label = styled.label`
  ${({ theme }) => css`
    ${theme.typography.body.b4_rg}
    color: ${theme.colors.gray80};
  `}
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

const TimerText = styled.span`
  color: #1c61ff;
  font-size: 14px;
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
  margin-top: 6rem;
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
  ${({ theme }) => css`
    background-color: ${theme.colors.blue10};
  `}
`