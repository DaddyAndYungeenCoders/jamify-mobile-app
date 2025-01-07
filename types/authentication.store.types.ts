export interface AuthenticationState {
  token: string | null;
  loading: boolean;
  error: string | null;
  getJWTToken: (urlProvider: string | null) => Promise<void>;
  removeJWTToken: () => void;
}
