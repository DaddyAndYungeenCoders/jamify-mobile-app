import { User } from "@/types/user.types";

export interface Comment {
  id: number;
  content: string;
  author: User;
}
