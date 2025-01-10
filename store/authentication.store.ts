import { AuthenticationState } from "@/types/authentication.store.types";
import { create } from "zustand";

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
  token: null,
  loading: false,
  error: null,
  setJWTToken: (token: string) => {
    set({ loading: true });
    try {
      set({ token: token, loading: false });
    } catch (error) {
      set({ error: "Connexion Failed", loading: false });
    }
  },
  removeJWTToken: () => set({ token: null, error: null }),
}));
