import {ImageSourcePropType} from "react-native";

export interface musicDisplayProps {
    title : string;
    image: ImageSourcePropType;
    artist: string;
    description: string;
    duration: number;
    lcurrentTime: number;
}
