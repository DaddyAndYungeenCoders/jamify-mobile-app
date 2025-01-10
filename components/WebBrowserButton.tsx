import { WebBrowserButtonProps } from "@/types/web-browser-button.types";
import React, { useCallback } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

const WebBrowserButton: React.FC<WebBrowserButtonProps> = ({
  Icon,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 7, stiffness: 300 });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 7, stiffness: 300 });
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}
    >
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
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
