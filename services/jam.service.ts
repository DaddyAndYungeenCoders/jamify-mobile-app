import { Jam, JamDTO, JamStatus } from "@/types/jam.types";
import { LaunchDtoTypes } from "@/types/launch.dto.types";
import { useAuthenticationStore } from "@/store/authentication.store";
import { User } from "@/types/user.types";
import { userService } from "@/services/user.service";
import { Comment } from "@/types/comment.types";
import { API_BASE_URL } from "@/constants/Server";
import { Alert } from "react-native";

class JamService {
  private static instance: JamService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/jams`;
  }

  public static getInstance(): JamService {
    if (!JamService.instance) {
      JamService.instance = new JamService();
    }
    return JamService.instance;
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
      // Alert.alert("Error", await response.text());
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  public async getAllJams(): Promise<Jam[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: this.getAuthHeaders(),
      });
      console.log("BODY : ", response);
      const jamDTOs = this.handleResponse<JamDTO[]>(response);
      return this.toJams(await jamDTOs);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getRunningJams(): Promise<Jam[]> {
    try {
      const response = await fetch(this.baseUrl + "/running", {
        headers: this.getAuthHeaders(),
      });
      console.log(useAuthenticationStore.getState().token);
      // console.log(response)
      // console.log("BODY : ", await response.text());
      const jamDTOs = await this.handleResponse<JamDTO[]>(response);
      const jams = await this.toJams(jamDTOs);
      // console.log("jams" + JSON.stringify(jams));
      return jams;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getById(id: number): Promise<Jam> {
    try {
      const response = await fetch(this.baseUrl + "/" + id, {
        headers: this.getAuthHeaders(),
      });
      // console.log("BODY : ", response);
      console.log(response.url);
      const jamDTO = this.handleResponse<JamDTO>(response);
      return this.toJam(await jamDTO);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async launch(launch: LaunchDtoTypes): Promise<Jam> {
    try {
      const response = await fetch(this.baseUrl + "/launch", {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(launch),
      });
      // console.log("BODY : ", response);
      console.log(response.url);
      const jamDTO = this.handleResponse<JamDTO>(response);
      return this.toJam(await jamDTO);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async play(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/play`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });
      // console.log("BODY : ", response);
      console.log(response.url);
      console.log(response.status);
      // this.handleResponse<boolean>(response);
      return this.handleResponse<boolean>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async stop(jamId: number): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl + "/stop/" + jamId, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });
      // console.log(useAuthenticationStore.getState().token)
      console.log(response.url);
      console.log(response.status);
      // console.log("BODY : ", await response.json());
      return response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async join(jamId: number): void {
    try {
      const response = await fetch(this.baseUrl + "/join/" + jamId, {
        method: "PUT",
        headers: this.getAuthHeaders(),
      });
      console.log(response.url);
      console.log(response.status);
      if (!response.ok) {
        Alert.alert("ERROR", await response.text());
        // throw new Error(`Erreur HTTP : ${response.status}`);
      }
      // return response.json();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async leave(jamId: number): void {
    try {
      const response = await fetch(this.baseUrl + "/leave/" + jamId, {
        method: "PUT",
        headers: this.getAuthHeaders(),
      });
      console.log(response.url);
      console.log(response.status);
      if (!response.ok) {
        Alert.alert("ERROR", await response.text());
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async toJam(jamDTO: JamDTO): Promise<Jam> {
    try {
      const host: User = await userService.getByProviderId(
        jamDTO.host_user_provider_id,
      );

      const participants: User[] = await Promise.all(
        jamDTO.participants.map((participantId) =>
          userService.getById(participantId),
        ),
      );

      // TODO
      // const comments = await CommentService.getCommentsByIds(jamDTO.messages);
      const comments: Comment[] = [
        {
          author: host,
          content: "test",
          id: 0,
        },
      ];

      const jam: Jam = {
        id: jamDTO.id,
        name: jamDTO.name,
        host: host,
        status: jamDTO.status,
        background: require("@/assets/images/music-exemple.png"),
        description: `Jam organisée par ${host.name}`,
        participants: participants,
        themes: jamDTO.themes,
        comments: comments,
        likes: 0,
        scheduledDate: jamDTO.scheduledDate,
      };
      // console.log("jam " + JSON.stringify(jam))
      return jam;
    } catch (error) {
      console.error("Erreur lors du mappage de JamDTO vers Jam :", error);
      throw error;
    }
  }
  public async playAsHost(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/play`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        Alert.alert("Error", await response.text());
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return this.handleResponse<boolean>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  public async toJams(jamDTOs: JamDTO[]): Promise<Jam[]> {
    let newJam: Jam[] = [];
    for (const jamDTO of jamDTOs) {
      newJam.push(await this.toJam(jamDTO));
    }
    return newJam;
  }

  public async toDTOs(jams: Jam[]): Promise<JamDTO[]> {
    jams.forEach((jam) => {
      return this.toDTO(jam);
    });
  }

  public async toDTO(jam: Jam): Promise<JamDTO> {
    let jamDTO: JamDTO = {
      hostId: jam.host.id,
      id: jam.id,
      messages: jam.comments.map((comment) => {
        return comment.id;
      }),
      name: jam.name,
      participants: jam.participants,
      scheduledDate: jam.scheduledDate,
      status: JamStatus.RUNNING,
      themes: jam.themes,
    };
    // let jamDTO: JamDTO = {
    //     id: jam.id,
    //     hostId: jam.host.id,
    //     messages: jam.comments.map(comment => {
    //         return comment.id;
    //     }),
    //     name: jam.name,
    //     participants: jam.participants.map(participant => {
    //         return participant.id;
    //     }),
    //     scheduledDate: jam.scheduledDate,
    //     status: jam.status,
    //     themes: jam.themes
    // };
    return jamDTO;
  }

  private handleError(error: any): Error {
    console.error("JamService Error:", error);
    if (error instanceof Error) {
      return error;
    }
    return new Error("An unexpected error occurred");
  }
}

export const jamService = JamService.getInstance();
