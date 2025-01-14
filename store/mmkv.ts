import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
  id: "auth-storage",
  // optionally you can encrypt the storage
  // encryptionKey: 'encryption-key'
});
