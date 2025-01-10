import {ImageSourcePropType} from "react-native";
import {CommentTypes} from "@/types/commentTypes";
import {UserTypes} from "@/types/UserTypes";

export enum JamStatus {
    RUNNING = "RUNNING",
    PAUSED= "PAUSED",
    STOPPED = "STOPPED",
    SCHEDULED = "SCHEDULED",
    CANCELED = "CANCELED",
}

export interface JamTypes {
    id: number;
    name: string;
    host: UserTypes;
    status: JamStatus;
    background: ImageSourcePropType,
    description: string,
    participants: UserTypes[];
    themes: string[];
    comments: CommentTypes[];
    likes: number;
}
