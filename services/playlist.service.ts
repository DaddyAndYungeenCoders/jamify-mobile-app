import {Jam, JamDTO} from "@/types/jam.types";
import {LaunchDtoTypes} from "@/types/launch.dto.types";
import {useAuthenticationStore} from "@/store/authentication.store";
import {User} from "@/types/user.types";
import {userService} from "@/services/user.service";
import {Comment} from "@/types/comment.types";
import {API_BASE_URL} from "@/constants/Server";
import {Alert} from "react-native";
import {GeneratePlaylistDtoTypes} from "@/types/generatePlaylist.dto.types";
import {Playlist} from "@/types/playlist.types";


class PlaylistService {
    private static instance: PlaylistService;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = `${API_BASE_URL}/playlist`
    }

    public static getInstance(): PlaylistService {
        if (!PlaylistService.instance) {
            PlaylistService.instance = new PlaylistService();
        }
        return PlaylistService.instance;
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

    public async generate(generatePlaylist: GeneratePlaylistDtoTypes) : Promise<Playlist> {
        try {
            const user: User = await userService.getCurrentUser();
            const response = await fetch(this.baseUrl + "/generate", {
                method: "POST",
                headers: this.getAuthHeaders(),
                body: JSON.stringify({
                    userId : user.id,
                    data: generatePlaylist,
                }),
            });
            // console.log("BODY : ", response);
            console.log(response.url)
            const playlistPromise = this.handleResponse<Playlist>(response);
            return playlistPromise
        } catch (error) {
            throw this.handleError(error);
        }
    }


    private handleError(error: any): Error {
        console.error("EventService Error:", error);
        if (error instanceof Error) {
            return error;
        }
        return new Error("An unexpected error occurred");
    }
}

export const playlistService = PlaylistService.getInstance();
