import { CustomButtonProps } from "@/types/button.types";
import React, { useCallback, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

const Button: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  size = "medium",
  disabled = false,
  loading = false,
  borderRadius,
  textColor,
  colors = { base: "#87CEEB", pressed: "#FFF" },
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const loadingRotation = useSharedValue(0);
  const loadingColorProgress = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    "worklet";
    scale.value = withSpring(0.98, { damping: 15, stiffness: 120 });
    opacity.value = withSpring(0.95);
  }, []);

  const handlePressOut = useCallback(() => {
    "worklet";
    scale.value = withSpring(1, { damping: 15, stiffness: 120 });
    opacity.value = withSpring(1);
  }, []);

  useEffect(() => {
    if (loading) {
      loadingRotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false,
      );

      loadingColorProgress.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0, { duration: 1000 }),
        ),
        -1,
        true,
      );
    } else {
      loadingRotation.value = withTiming(0);
      loadingColorProgress.value = withTiming(0);
    }
  }, [loading]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      loadingColorProgress.value,
      [0, 1],
      [colors.base, colors.pressed],
    );

    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      backgroundColor: loading ? bgColor : colors.base,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${loadingRotation.value}deg` }],
    };
  });

  const getVariantStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius || 5,
      alignItems: "center",
      justifyContent: "center",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        },
        android: {
          elevation: 5,
        },
      }),
    };

    return baseStyle;
  };

  const getSizeStyles = (): ViewStyle => {
    const sidePadding = {
      small: 16,
      medium: 20,
      large: 24,
    }[size];

    return {
      paddingVertical: size === "small" ? 8 : size === "large" ? 16 : 12,
      paddingHorizontal: sidePadding,
    };
  };

  return (
    <AnimatedTouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        animatedContainerStyle,
        containerStyle,
      ]}
    >
      <Animated.View style={styles.contentContainer}>
        {leftIcon && (
          <Animated.View style={styles.leftSection}>
            <AnimatedImage
              source={leftIcon}
              style={[styles.icon, loading && animatedIconStyle]}
              resizeMode="contain"
            />
          </Animated.View>
        )}
        <Animated.View style={styles.centerSection}>
          <AnimatedText
            style={[styles.text, { color: textColor || "#FFFFFF" }, textStyle]}
          >
            {loading ? "Chargement..." : label}
          </AnimatedText>
        </Animated.View>

        {rightIcon && (
          <Animated.View style={styles.rightSection}>
            <AnimatedImage
              source={rightIcon}
              style={[styles.icon, loading && animatedIconStyle]}
              resizeMode="contain"
            />
          </Animated.View>
        )}
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "90%",
    alignSelf: "center",
    height: 50,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "yellow",
  },
  leftSection: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  centerSection: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "purple",
  },
  rightSection: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    //   backgroundColor: "red",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Jost_600Bold",
    fontWeight: "600",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Button;
