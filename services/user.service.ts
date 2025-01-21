import { API_BASE_URL } from "@/constants/Server";
import { User } from "@/types/user.types";
import { useAuthenticationStore } from "@/store/authentication.store";

class UserService {
  private static instance: UserService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/users`;
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private getAuthHeaders(): HeadersInit {
    const token = useAuthenticationStore.getState().token;
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        useAuthenticationStore.getState().removeJWTToken();
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }
    return response.json();
  }

  public async getCurrentUser(): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        headers: this.getAuthHeaders(),
      });
      const userData = await this.handleResponse<any>(response);

      // Transformer la réponse API en objet User
      const user: User = {
        id: userData.userProviderId,
        userProviderId: userData.userProviderId,
        name: userData.name,
        email: userData.email,
        country: userData.country,
        provider: userData.provider,
        imgUrl: userData.imgUrl || "",
        roles: userData.roles,
        jams: userData.jams || [],
        hasJamRunning: userData.hasJamRunning,
        playlists: [],
        events: [],
        badges: [],
      };

      return user;
    } catch (error) {
      console.error("UserService Error:", error);
      throw error;
    }
  }
}

export const userService = UserService.getInstance();
