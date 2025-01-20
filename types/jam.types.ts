import { ImageSourcePropType } from "react-native";
import { Comment } from "@/types/comment.types";
import { User } from "@/types/user.types";

export enum JamStatus {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
  SCHEDULED = "SCHEDULED",
  CANCELED = "CANCELED",
}

export interface Jam {
  id: number;
  name: string;
  host: User;
  status: JamStatus;
  background: ImageSourcePropType;
  description: string;
  participants: User[];
  themes: string[];
  comments: Comment[];
  likes: number;
}
