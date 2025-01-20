import { ImageSourcePropType } from "react-native";

export interface ProfilHeaderProps {
  name: string;
  image: ImageSourcePropType;
  onPress: () => void;
}
