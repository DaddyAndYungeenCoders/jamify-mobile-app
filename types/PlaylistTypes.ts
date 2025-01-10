import {TagTypes} from "@/types/TagTypes";

export interface PlaylistTypes {
    id: number;
    name: string;
    tags: TagTypes[];
    musics: number[];
    likes: number;
}
