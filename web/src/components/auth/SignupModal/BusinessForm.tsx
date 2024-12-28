import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { BusinessInfoFormData } from '@/types/auth'

import { verifyBusinessNumber, requestPhoneVerification, verifyPhoneNumber } from '@/apis/auth'
import useTimer from '@/hooks/useTimer'

const businessInfoSchema = z.object({
  businessName: z.string().min(1, '사업장 이름을 입력해주세요'),
  businessNumber: z
    .string()
    .min(1, '사업장 등록 번호를 입력해주세요')
    .regex(/^\d{3}-\d{2}-\d{5}$/, '올바른 사업자 등록번호 형식이 아닙니다'),
  phoneNumber: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .regex(/^010-\d{4}-\d{4}$/, '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-0000-0000)'),
  employeeCount: z.enum(['under5', 'over5'], {
    required_error: '직원 수를 선택해주세요',
  }),
})

interface BusinessFormProps {
  onSubmit: (data: BusinessInfoFormData) => void
  onBack: () => void
}

function BusinessForm({ onSubmit, onBack }: BusinessFormProps) {
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] = useState(false)

  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [showVerificationField, setShowVerificationField] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    mode: 'onBlur',
  })
  const { mutate: verifyBusiness, isPending: isVerifyingBusiness } = useMutation({
    mutationFn: verifyBusinessNumber,
    onSuccess: (isValid) => {
      if (isValid) {
        clearErrors('businessNumber')
        setIsBusinessNumberVerified(true)
      } else {
        setError('businessNumber', {
          type: 'manual',
          message: '이미 등록된 사업자 등록번호입니다',
        })
        setIsBusinessNumberVerified(false)
      }
    },
    onError: (error: Error) => {
      setError('businessNumber', {
        type: 'manual',
        message: error.message,
      })
      setIsBusinessNumberVerified(false)
    },
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
    mutationFn: requestPhoneVerification,
    onSuccess: () => {
      setShowVerificationField(true)
      clearErrors('verificationCode')
      startTimer()
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

  const handleBusinessNumberVerify = async () => {
    const isValid = await trigger('businessNumber')

    if (isValid) {
      const businessNumber = watch('businessNumber')
      verifyBusiness(businessNumber)
    }
  }

  const handlePhoneVerification = async () => {
    const isValid = await trigger('phoneNumber')

    if (isValid) {
      const phoneNumber = watch('phoneNumber')
      sendVerification(phoneNumber)
    }
  }

  const handleVerifyCode = async () => {
    const code = watch('verificationCode')
    if (!code) {
      setError('verificationCode', {
        message: '인증번호를 입력해주세요',
      })

      return
    }

    const phoneNumber = watch('phoneNumber')
    verifyPhone({ phoneNumber, code })
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numbers = value.replace(/[^\d]/g, '')

    let formattedNumber = ''
    if (numbers.length <= 3) {
      formattedNumber = numbers
    } else if (numbers.length <= 7) {
      formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    } else {
      formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
    }

    e.target.value = formattedNumber
    register('phoneNumber').onChange(e)
    setIsPhoneVerified(false)
    setShowVerificationField(false)
    clearErrors('phoneNumber')
    stopTimer()
  }

  const onFormSubmit = async (data: BusinessInfoFormData) => {
    setSubmitError('')

    if (!isBusinessNumberVerified) {
      setError('businessNumber', {
        type: 'manual',
        message: '사업자 등록번호 중복 확인이 필요합니다',
      })
      return
    }

    if (!isPhoneVerified) {
      setError('phoneNumber', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다',
      })
      return
    }

    try {
      await onSubmit(data)
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message)
      } else {
        setSubmitError('회원가입 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <InputGroup>
        <Label>사업장 이름</Label>
        <Input type="text" placeholder="올웨이지 시청점" {...register('businessName')} />
        {errors.businessName && <ErrorMessage>{errors.businessName.message}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>사업자 등록 번호</Label>
        <InputWithButton>
          <Input
            type="text"
            placeholder="000-00-00000"
            {...register('businessNumber')}
            onChange={(e) => {
              register('businessNumber').onChange(e)
              setIsBusinessNumberVerified(false)
            }}
          />
          <VerifyButton
            type="button"
            onClick={handleBusinessNumberVerify}
            disabled={isVerifyingBusiness}
          >
            {isVerifyingBusiness ? '확인 중...' : '중복 확인'}
          </VerifyButton>
        </InputWithButton>
        {errors.businessNumber && <ErrorMessage>{errors.businessNumber.message}</ErrorMessage>}
        {isBusinessNumberVerified && <SuccessMessage>등록 가능한 사업자 번호입니다</SuccessMessage>}
      </InputGroup>

      <InputGroup>
        <Label>휴대폰 번호</Label>
        <InputWithButton>
          <Input
            type="tel"
            placeholder="010-0000-0000"
            {...register('phoneNumber')}
            onChange={handlePhoneNumberChange}
          />
          <VerifyButton
            type="button"
            onClick={handlePhoneVerification}
            disabled={isSendingVerification}
          >
            {isSendingVerification ? '전송 중...' : showVerificationField ? '재전송' : '인증 요청'}
          </VerifyButton>
        </InputWithButton>
        {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
        {isRunning && (
          <SuccessMessage>인증번호를 발송했습니다. 최대 3분이 소요될 수 있습니다.</SuccessMessage>
        )}
      </InputGroup>

      {showVerificationField && (
        <InputGroup>
          <Label>인증번호</Label>
          <InputWithButton>
            <Input type="text" placeholder="인증번호 입력" {...register('verificationCode')} />
            <VerifyButton type="button" onClick={handleVerifyCode} disabled={isVerifyingPhone}>
              {isVerifyingPhone ? '확인 중...' : '인증 확인'}
            </VerifyButton>
          </InputWithButton>
          {isRunning && <TimerText>{formatTime()}</TimerText>}
          {errors.verificationCode && (
            <ErrorMessage>{errors.verificationCode.message}</ErrorMessage>
          )}
          {isPhoneVerified && <SuccessMessage>휴대폰 인증이 완료되었습니다</SuccessMessage>}
        </InputGroup>
      )}

      <InputGroup>
        <Label>직원 수</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput type="radio" value="under5" defaultChecked {...register('employeeCount')} />
            5인 미만
          </RadioLabel>
          <RadioLabel>
            <RadioInput type="radio" value="over5" {...register('employeeCount')} />
            5인 이상
          </RadioLabel>
        </RadioGroup>
        {errors.employeeCount && <ErrorMessage>{errors.employeeCount.message}</ErrorMessage>}
      </InputGroup>

      <ButtonGroup>
        <BackButton type="button" onClick={onBack}>
          이전
        </BackButton>
        <SubmitButton type="submit">회원가입</SubmitButton>
      </ButtonGroup>
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
    </Form>
  )
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`

const BackButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #fff;
  color: #1a73e8;
  border: 1px solid #1a73e8;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`

const SubmitButton = styled.button`
  flex: 2;
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

const InputWithButton = styled.div`
  display: flex;
  gap: 8px;
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

  &:not(:disabled):hover {
    background-color: #1557b0;
  }
`

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
`

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`

const RadioInput = styled.input`
  cursor: pointer;
`

const ErrorMessage = styled.span`
  color: #d93025;
  font-size: 14px;
`

const SuccessMessage = styled.span`
  color: #0f9d58;
  font-size: 14px;
`

const TimerText = styled.span`
  color: #1c61ff;
  font-size: 14px;
`

export default BusinessForm
