import {ImageSourcePropType, StyleProp, ViewStyle} from "react-native";

export interface ClassicButtonProps {
    title: string; // Texte du bouton
    onPress: () => void; // Fonction déclenchée au clic
    backgroundColor?: string; // Couleur de fond (par défaut : bleu)
    textColor?: string; // Couleur du texte (par défaut : blanc)
    logo?: ImageSourcePropType; // Image (local ou distante) pour le logo
    logoPosition?: "left" | "right"; // Position du logo par rapport au texte
    width?: number | string; // Largeur du bouton (par défaut : auto)
    height?: number; // Hauteur du bouton (par défaut : 50)
    fontSize?: number; // Taille du texte (par défaut : 16)
    logoSize?: number; // Taille du logo (par défaut : 20)
    style?: StyleProp<ViewStyle>; // Style supplémentaire pour le bouton
}
