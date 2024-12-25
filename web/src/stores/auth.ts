import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IToken } from '@/types/auth'

interface IAuthStore {
  auth: IToken | null
  setAuth: (authData: IToken | null) => void
  reset: () => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (authData: IToken | null) => {
        if (authData) {
          localStorage.setItem('accessToken', authData.accessToken)
          localStorage.setItem('refreshToken', authData.refreshToken)
        } else {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
        set({ auth: authData })
      },
      reset: () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        set({ auth: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.auth?.accessToken || null,
        refreshToken: state.auth?.refreshToken || null,
      }),
    },
  ),
)
