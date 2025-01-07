import {ImageSourcePropType} from "react-native";
import {CommentDTO} from "@/DTO/commentDTO";
import {UserDTO} from "@/DTO/UserDTO";

export enum JamStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
}

export interface JamDTO {
    id: number;
    name: string;
    host: UserDTO;
    status: JamStatus;
    background: ImageSourcePropType,
    description: string,
    participants: UserDTO[];
    themes: string[];
    comments: CommentDTO[];
    likes: number;
}
