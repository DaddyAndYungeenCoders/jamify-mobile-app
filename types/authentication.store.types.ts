export interface AuthenticationState {
  token: string | null;
  loading: boolean;
  error: string | null;
  setJWTToken: (token: string) => void;
  removeJWTToken: () => void;
}
