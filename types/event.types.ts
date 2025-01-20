import { ImageSourcePropType } from "react-native";
import { User } from "@/types/user.types";

export enum EventStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface Event {
  id: number;
  name: string;
  status: EventStatus;
  background: ImageSourcePropType;
  description: string;
  scheduledDate: Date;
  participants: User[];
  themes: string[];
  address: string;
}
