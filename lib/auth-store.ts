import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null;
  adminEmail: string | null;
  setAuth: (token: string, adminEmail: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      adminEmail: null,
      setAuth: (token, adminEmail) => set({ token, adminEmail }),
      logout: () => set({ token: null, adminEmail: null }),
    }),
    {
      name: 'admin-auth-storage',
    }
  )
)
