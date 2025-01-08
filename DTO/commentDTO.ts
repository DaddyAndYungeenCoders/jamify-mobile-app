import {UserDTO} from "@/DTO/UserDTO";

export interface CommentDTO {
    id: number;
    content: string;
    author: UserDTO;
}
