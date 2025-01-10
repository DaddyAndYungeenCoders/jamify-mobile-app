import {ImageSourcePropType} from "react-native";
import {UserTypes} from "@/types/UserTypes";

export enum EventStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export interface EventTypes {
    id: number;
    name: string;
    status: EventStatus;
    background: ImageSourcePropType,
    description: string,
    scheduledDate: Date;
    participants: UserTypes[];
    themes: string[];
    address: string;
}
