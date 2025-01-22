import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BadgeProps {
  text: string;
  backgroundColor: string;
  borderColor: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  backgroundColor,
  borderColor,
  style,
  textStyle,
}) => {
  // Capitalise la première lettre du texte
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
          borderColor,
          borderWidth: 2,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {}, // Utilise la couleur de la bordure pour le texte
          textStyle,
        ]}
      >
        {capitalizedText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "Jost_500Medium_Italic",
    color: "white",
  },
});

export default Badge;
