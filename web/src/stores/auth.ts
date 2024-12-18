import { create } from "zustand";
import type { IToken } from "@/types/auth";

interface IAuthStore {
  auth: IToken | null;
  setAuth: (authData: IToken | null) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  auth: null,
  setAuth: (authData: IToken | null) => set({ auth: authData }),
  reset: () => set({ auth: null }),
}));
