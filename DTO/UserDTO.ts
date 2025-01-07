import {ImageSourcePropType} from "react-native";
import {JamDTO, JamStatus} from "@/DTO/JamDTO";
import {EventDTO} from "@/DTO/EventDTO";

export interface UserDTO {
    id: number;
    name: string;
    playlists: PlaylistDTO[];
    events: EventDTO[];
    jams: JamDTO[]
    badges: Badges[];
}
