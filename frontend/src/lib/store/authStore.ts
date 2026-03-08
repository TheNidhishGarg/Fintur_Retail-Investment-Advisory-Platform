import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    auth_provider: "google" | "phone";
    tier: string | null;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    updateTier: (tier: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setAuth: (token, user) =>
                set({ token, user, isAuthenticated: true }),
            updateTier: (tier) =>
                set((state) => ({
                    user: state.user ? { ...state.user, tier } : null,
                })),
            clearAuth: () =>
                set({ token: null, user: null, isAuthenticated: false }),
        }),
        { name: "fintur-auth" }
    )
);
