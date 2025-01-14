import { ImageSourcePropType, ViewStyle } from "react-native";

export interface PlaylistElementProps {
  name: string;
  onPress: () => void;
  image: ImageSourcePropType;
}
