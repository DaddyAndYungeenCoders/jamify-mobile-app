import { AuthenticationState } from "@/types/authentication.store.types";
import { create } from "zustand";
import { storage } from "./mmkv";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export const useAuthenticationStore = create<AuthenticationState>()(
  persist(
    (set) => ({
      token: null,
      loading: false,
      error: null,
      setJWTToken: (token) => set({ token }),
      removeJWTToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
