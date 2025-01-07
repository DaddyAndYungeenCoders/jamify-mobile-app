import {ImageSourcePropType} from "react-native";
import {UserDTO} from "@/DTO/UserDTO";

export enum EventStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
}

export interface EventDTO {
    id: number;
    name: string;
    status: EventStatus;
    background: ImageSourcePropType,
    description: string,
    scheduledDate: Date;
    participants: UserDTO[];
    themes: string[];
}
