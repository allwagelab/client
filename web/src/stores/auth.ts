import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { IToken } from '@/types/auth'

interface IAuthStore {
  auth: IToken | null
  reset: () => void
  setAuth: (authData: IToken | null) => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    set => ({
      auth: null,
      reset: () => {
        set({ auth: null })
      },
      setAuth: (authData: IToken | null) => {
        set({ auth: authData })
      },
    }),
    {
      name: 'auth',
    },
  ),
)
