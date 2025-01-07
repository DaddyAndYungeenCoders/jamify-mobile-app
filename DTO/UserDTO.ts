import {ImageSourcePropType} from "react-native";
import {JamDTO, JamStatus} from "@/DTO/JamDTO";
import {EventDTO} from "@/DTO/EventDTO";
import {PlaylistDTO} from "@/DTO/PlaylistDTO";

class Badges {
    id: number;
    name: string;
    imgUrl: string;
}

export interface UserDTO {
    id: number;
    name: string;
    playlists: PlaylistDTO[];
    events: EventDTO[];
    jams: JamDTO[]
    badges: Badges[];


    email: string;
    country: string;
    provider: string;
    imgUrl: string;
    userProviderId: string;
    roles: string[];
}
