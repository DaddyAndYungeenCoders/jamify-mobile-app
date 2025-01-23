import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface BadgedIconProps {
  text: string;
  iconName: string;
  backgroundColor: string;
  borderColor: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const BadgedIcon: React.FC<BadgedIconProps> = ({
  text,
  iconName,
  backgroundColor,
  borderColor,
  style,
  textStyle,
}) => {
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
      <FontAwesome5
        name={iconName}
        size={14}
        color="white"
        style={styles.icon}
      />
      <Text style={[styles.text, textStyle]}>{capitalizedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: "Jost_500Medium_Italic",
    color: "white",
  },
});

export default BadgedIcon;
