import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { URLS } from '@allwagelab/constants'
import { useAuth } from '@allwagelab/message-bus'

import { login } from '@/apis/auth'

interface UseLoginProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  autoLogin?: boolean
  redirectTo?: string
}

export const useLogin = ({
  onSuccess,
  onError,
  autoLogin = false,
  redirectTo = URLS.APP_HOME,
}: UseLoginProps = {}) => {
  const auth = useAuth()
  const navigate = useNavigate()

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: response => {
      const { accessToken } = response.data
      auth.login({ accessToken, autoLogin })

      if (onSuccess) {
        onSuccess()
      }

      navigate(redirectTo)
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error)
      }
    },
  })

  return {
    login: loginMutate,
    isLoggingIn: isLoading,
  }
}
