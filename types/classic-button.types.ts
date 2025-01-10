import {ImageSourcePropType, StyleProp, ViewStyle} from "react-native";
import {IconProps} from "@expo/vector-icons/build/createIconSet";

export interface ClassicButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    logo?: string;
    logoPosition?: "left" | "right";
    width?: number | string;
    height?: number;
    fontSize?: number;
    logoSize?: number;
    style?: StyleProp<ViewStyle>;
}
