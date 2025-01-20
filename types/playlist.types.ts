import { Tag } from "@/types/tag.types";
import { ImageSourcePropType } from "react-native";

export interface Playlist {
  id: number;
  name: string;
  tags: Tag[];
  musics: number[];
  likes: number;
  image: ImageSourcePropType;
}
