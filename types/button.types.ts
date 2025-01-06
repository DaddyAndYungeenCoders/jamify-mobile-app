import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface CustomButtonProps {
  label: string;
  onPress: () => void;
  //variant?: "spotify" | "deezer" | "apple" | "message" | "participate";
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
  colors?: { base: string; pressed: string };
}
