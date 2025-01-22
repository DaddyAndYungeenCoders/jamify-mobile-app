import {ImageSourcePropType} from "react-native";
import {Tag} from "@/types/tag.types";

export interface musicDisplayProps {
    title : string;
    image: ImageSourcePropType;
    artist: string;
    description: string;
    duration: number;
    lcurrentTime: number;
}


export interface MusiqueDTO {
    id: number;
    isrc: string;
    author: string;
    title: string;
    imgUrl: string;
    tempo: string;
    energy: string;
    tags: Tag[]
}
