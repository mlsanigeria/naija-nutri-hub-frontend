// stores/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  token: string;
  username: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

interface AuthState {
  user: User | null;
  theme: "light" | "dark";
  hasHydrated: boolean;
  setUser: (u: User | null) => void;
  updateUsername: (username: string) => void;
  updateProfile: (profile: { firstname?: string; lastname?: string }) => void;
  setTheme: (theme: "light" | "dark") => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      theme: "dark",
      hasHydrated: false,
      setUser: (user) => set({ user }),
      updateUsername: (username) =>
        set((state) => ({
          user: state.user ? { ...state.user, username } : null,
        })),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        })),
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
