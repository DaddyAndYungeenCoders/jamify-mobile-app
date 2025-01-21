import { User } from "@/types/user.types";
import { create } from "zustand";
import { storage } from "./mmkv";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  getUser: () => User | null;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

const zustandStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: (name) => storage.getString(name) ?? null,
  removeItem: (name) => storage.delete(name),
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      getUser: () => get().user,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearUser: () => set({ user: null, error: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
