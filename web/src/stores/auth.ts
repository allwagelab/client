import { create } from 'zustand'
<<<<<<< HEAD
=======
import { persist } from 'zustand/middleware'
>>>>>>> develop

import type { IToken } from '@/types/auth'

interface IAuthStore {
  auth: IToken | null
  setAuth: (authData: IToken | null) => void
  reset: () => void
}

<<<<<<< HEAD
export const useAuthStore = create<IAuthStore>(set => ({
  auth: null,
  setAuth: (authData: IToken | null) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}))
=======
export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (authData: IToken | null) => {
        set({ auth: authData })
      },
      reset: () => {
        set({ auth: null })
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (localStorage.getItem('autoLogin') !== 'Y' && state) {
          localStorage.removeItem('autoLogin')
          state.setAuth(null)
        }
      },
    },
  ),
)
>>>>>>> develop
