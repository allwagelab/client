import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

import AccountForm from './AccountForm'
import BusinessForm from './BusinessForm'
import Modal from './Modal'

import type { BusinessInfoFormData, SignupFormData, SignupModalProps } from '@/types/auth'

import { signup } from '@/apis/auth'

type SignupStep = 'ACCOUNT' | 'BUSINESS' | 'SUCCESS'

function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [currentStep, setCurrentStep] = useState<SignupStep>('ACCOUNT')
  const [accountData, setAccountData] = useState<SignupFormData | null>(null)

  const { mutate: registerUser } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setCurrentStep('SUCCESS')
    },
    onError: (error: Error) => {
      throw error
    },
  })

  const handleAccountSubmit = (data: SignupFormData) => {
    setAccountData(data)
    setCurrentStep('BUSINESS')
  }

  const handleBusinessSubmit = (businessData: BusinessInfoFormData) => {
    if (!accountData) {
      return
    }

    registerUser({
      email: accountData.email,
      password: accountData.password,
      hp: businessData.phoneNumber,
      sub: {
        name: businessData.businessName,
        registration: businessData.businessNumber,
        staffCount: businessData.employeeCount === 'under5' ? 'UNDER_FIVE' : 'OVER_FIVE',
      },
    })
  }

  const handleBack = () => {
    setCurrentStep('ACCOUNT')
  }

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('ACCOUNT')
      setAccountData(null)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="회원가입">
      {currentStep === 'ACCOUNT' ? (
        <AccountForm onSubmit={handleAccountSubmit} defaultValues={accountData || undefined} />
      ) : currentStep === 'BUSINESS' ? (
        <BusinessForm onSubmit={handleBusinessSubmit} onBack={handleBack} />
      ) : (
        <SuccessView onComplete={onClose} />
      )}
    </Modal>
  )
}

const SuccessView = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <SuccessContainer>
      <SuccessIcon>✓</SuccessIcon>
      <SuccessTitle>가입 성공</SuccessTitle>
      <SuccessMessage>회원가입이 완료되었습니다.</SuccessMessage>
      <CompleteButton onClick={onComplete}>로그인 하기</CompleteButton>
    </SuccessContainer>
  )
}

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
`

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #0f9d58;
  color: white;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`

const CompleteButton = styled.button`
  padding: 12px 24px;
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

export default SignupModal
