import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import type { BusinessInfoFormData } from '@/types/auth'
import { useState } from 'react'
import { verifyBusinessNumber, requestPhoneVerification, verifyPhoneNumber } from '@/apis/auth'

const businessInfoSchema = z.object({
  businessName: z.string().min(1, '사업장 이름을 입력해주세요'),
  businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}$/, '올바른 사업자 등록번호 형식이 아닙니다'),
  phoneNumber: z.string().regex(/^01\d{9}$/, '올바른 휴대폰 번호 형식이 아닙니다'),
  verificationCode: z.string().min(1, '인증번호를 입력해주세요'),
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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
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

  const handleBusinessNumberVerify = () => {
    const businessNumber = watch('businessNumber')

    // 사업자 등록번호 형식 검사
    const businessNumberRegex = /^\d{3}-\d{2}-\d{5}$/
    if (!businessNumber) {
      setError('businessNumber', {
        type: 'manual',
        message: '사업자 등록번호를 입력해주세요',
      })
      return
    }

    if (!businessNumberRegex.test(businessNumber)) {
      setError('businessNumber', {
        type: 'manual',
        message: '올바른 사업자 등록번호 형식이 아닙니다 (예: 123-45-67890)',
      })
      return
    }

    verifyBusiness(businessNumber)
  }

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

  const onFormSubmit = async (data: BusinessInfoFormData) => {
    setSubmitError('') // 에러 메시지 초기화

    // 사업자 등록번호 인증 확인
    if (!isBusinessNumberVerified) {
      setError('businessNumber', {
        type: 'manual',
        message: '사업자 등록번호 중복 확인이 필요합니다',
      })
      return
    }

    // 휴대폰 인증 확인
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
        <Label>사업자 등록번호</Label>
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
            placeholder="01012341234"
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
          <Label>인증번호</Label>
          <InputWithButton>
            <Input type="text" placeholder="인증번호 입력" {...register('verificationCode')} />
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

export default BusinessForm
