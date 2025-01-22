import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

interface DateDisplayProps {
  dateArray: number[];
  showIcon?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  borderColor?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({
  dateArray,
  showIcon = true,
  style,
  textStyle,
  backgroundColor = "rgba(42, 42, 42, 0.9)",
  borderColor = "rgba(255, 255, 255, 0.2)",
}) => {
  const formatDate = (dateArray: number[]): string => {
    if (!Array.isArray(dateArray) || dateArray.length < 5) {
      return "Date invalide";
    }

    const [year, month, day, hours, minutes] = dateArray;
    const date = new Date(year, month - 1, day, hours, minutes);

    const dateStr = new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return dateStr;
  };

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
      {showIcon && (
        <MaterialIcons
          name="event"
          size={14}
          color="white"
          style={styles.icon}
        />
      )}
      <ThemedText style={[styles.text, textStyle]}>
        {formatDate(dateArray)}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    alignSelf: "flex-start",
    justifyContent: "center",
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

export default DateDisplay;
