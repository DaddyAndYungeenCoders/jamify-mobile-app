import {JamTypes} from "@/types/JamTypes";
import {EventTypes} from "@/types/EventTypes";
import {PlaylistTypes} from "@/types/PlaylistTypes";

class Badges {
    id: number;
    name: string;
    imgUrl: string;
}

export interface UserTypes {
    id: number;
    name: string;
    playlists: PlaylistTypes[];
    events: EventTypes[];
    jams: JamTypes[]
    badges: Badges[];


    email: string;
    country: string;
    provider: string;
    imgUrl: string;
    userProviderId: string;
    roles: string[];
}
