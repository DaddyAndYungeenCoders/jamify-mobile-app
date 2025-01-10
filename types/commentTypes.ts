import {UserTypes} from "@/types/UserTypes";

export interface CommentTypes {
    id: number;
    content: string;
    author: UserTypes;
}
