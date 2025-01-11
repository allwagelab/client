import { useState, useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'

import { signup } from '@/apis/auth'
import type { BusinessInfoFormData, SignupFormData, SignupModalProps } from '@/types/auth'

import AccountForm from './AccountForm'
import BusinessForm from './BusinessForm'
import SuccessView from './SuccessView'

import Modal from '../../ui/Modal'

type SignupStep = 'ACCOUNT' | 'BUSINESS' | 'SUCCESS'

function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [currentStep, setCurrentStep] = useState<SignupStep>('ACCOUNT')
  const [accountData, setAccountData] = useState<SignupFormData | null>(null)
  const [name, setName] = useState<string>('')

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

    setName(businessData.businessName)
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
    <Modal isOpen={isOpen} onClose={onClose} title={currentStep === 'SUCCESS' ? '' : '회원가입'}>
      {currentStep === 'ACCOUNT' ? (
        <AccountForm onSubmit={handleAccountSubmit} defaultValues={accountData || undefined} />
      ) : currentStep === 'BUSINESS' ? (
        <BusinessForm onSubmit={handleBusinessSubmit} onBack={handleBack} />
      ) : (
        <SuccessView name={name} onComplete={onClose} />
      )}
    </Modal>
  )
}

export default SignupModal
