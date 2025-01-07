import {TagDTO} from "@/DTO/TagDTO";

export interface PlaylistDTO {
    id: number;
    name: string;
    tags: TagDTO[];
    musics: number[];
    likes: number;
}
