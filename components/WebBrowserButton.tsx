import { WebBrowserButtonProps } from "@/types/web-browser-button.types";
import React, { useCallback } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const WebBrowserButton: React.FC<WebBrowserButtonProps> = ({
  Icon,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 100 });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}
    >
      <Animated.View
        style={[styles.iconContainer, { transform: [{ scale: scale.value }] }]}
      >
        {Icon}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WebBrowserButton;
