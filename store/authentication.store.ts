import { create } from "zustand";
import { storage } from "./mmkv";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

interface AuthenticationState {
  token: string | null;
  loading: boolean;
  error: string | null;
  setJWTToken: (token: string) => void;
  removeJWTToken: () => void;
}

const zustandStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: (name) => storage.getString(name) ?? null,
  removeItem: (name) => storage.delete(name),
};

export const useAuthenticationStore = create<AuthenticationState>()(
  persist(
    (set) => ({
      token: null,
      loading: false,
      error: null,
      setJWTToken: (token) => {
        set({ token, loading: false, error: null });
      },
      removeJWTToken: () => {
        set({ token: null, error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
