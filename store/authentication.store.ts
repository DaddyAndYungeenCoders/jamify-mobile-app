import { AuthenticationState } from "@/types/authentication.store.types";
import { create } from "zustand";

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
  token: null,
  loading: false,
  error: null,
  getJWTToken: async (urlProvider: string | null) => {
    set({ loading: true });
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word",
      );
      const data = await response.json();
      set({ token: data[0], loading: false });
    } catch (error) {
      set({ error: "Connexion Failed", loading: false });
    }
  },
  removeJWTToken: () => set({ token: null, error: null }),
}));
