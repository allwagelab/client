import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'

import { login } from '@/apis/auth'
import { useAuthStore } from '@/stores/auth'

interface UseLoginProps {
  onError?: (error: Error) => void
  redirectTo?: string
}

export const useLogin = ({ onError, redirectTo = '/' }: UseLoginProps = {}) => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore(
    useShallow((state) => ({
      setAuth: state.setAuth,
    })),
  )

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { accessToken } = response.data

      setAuth({ accessToken })
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
    isLoggingIn: isPending,
  }
}
