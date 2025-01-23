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
  withDelay,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import CircularLoader from "./CircularLoading";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface ExtendedCustomButtonProps extends CustomButtonProps {}

const Button: React.FC<ExtendedCustomButtonProps> = ({
  label,
  onPress,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  size = "medium",
  disabled = false,
  loading = false,
  borderRadius = 5,
  textColor,
  colors = { base: "#87CEEB", pressed: "#FFF" },
  responseStatus,
  successMessage = "Success",
  errorMessage = "Error",
}) => {
  const scale = useSharedValue(1);
  const textTranslateY = useSharedValue(0);
  const mainTextOpacity = useSharedValue(1);
  const statusTextOpacity = useSharedValue(0);
  const statusTextTranslateY = useSharedValue(20);
  const loaderOpacity = useSharedValue(0);
  const shake = useSharedValue(0);
  const backgroundColor = useSharedValue(disabled ? "#a1a1a1" : colors.base);
  const iconRotation = useSharedValue(0);
  const iconTranslateX = useSharedValue(0);

  const isAnimating = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    "worklet";
    if (isAnimating.value === 0) {
      scale.value = withSpring(0.95, {
        damping: 8,
        stiffness: 40,
        mass: 1.2,
      });
    }
  }, []);

  const handlePressOut = useCallback(() => {
    "worklet";
    scale.value = withSpring(1, { damping: 20, stiffness: 120 });
  }, []);

  const shakeAnimation = (success: boolean) => {
    "worklet";
    return withSequence(
      withTiming(-10, { duration: 100 }),
      withRepeat(
        withSequence(
          withTiming(3, {
            duration: 100,
            easing: Easing.out(Easing.cubic),
            reduceMotion: ReduceMotion.System,
          }),
          withTiming(-3, {
            duration: 100,
            easing: Easing.out(Easing.cubic),
            reduceMotion: ReduceMotion.System,
          }),
        ),
        success ? 1 : 3,
      ),
      withTiming(0, { duration: 100 }),
    );
  };

  useEffect(() => {
    if (loading || typeof responseStatus === "number") {
      isAnimating.value = 1;
    }

    if (disabled) {
      backgroundColor.value = withTiming("#a1a1a1", { duration: 300 });
      return;
    } else if (loading) {
      textTranslateY.value = withTiming(50, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
      mainTextOpacity.value = withTiming(0, {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
      });

      if (leftIcon || rightIcon) {
        const targetX = rightIcon ? -120 : 120;
        iconTranslateX.value = withTiming(targetX, {
          duration: 400,
          easing: Easing.bounce,
        });

        iconRotation.value = withDelay(
          200,
          withRepeat(
            withTiming(360, {
              duration: 700,
              easing: Easing.cubic,
            }),
            -1,
          ),
        );
      } else {
        loaderOpacity.value = withDelay(
          200,
          withTiming(1, {
            duration: 200,
            easing: Easing.cubic,
          }),
        );
      }
    } else if (responseStatus !== null && responseStatus !== undefined) {
      loaderOpacity.value = withTiming(0, { duration: 100 });
      mainTextOpacity.value = withTiming(0, { duration: 100 });

      iconTranslateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.bounce,
      });
      iconRotation.value = withTiming(0, { duration: 300 });

      shake.value = shakeAnimation(responseStatus === 200);

      backgroundColor.value = withTiming(
        responseStatus === 200 ? "#4CAF50" : "#F44336",
        { duration: 300 },
      );

      statusTextTranslateY.value = withTiming(0, { duration: 200 });
      statusTextOpacity.value = withTiming(1, { duration: 200 });

      const delay = 2000;
      setTimeout(() => {
        backgroundColor.value = withTiming(colors.base, { duration: 300 });
        statusTextOpacity.value = withTiming(0, { duration: 200 });
        statusTextTranslateY.value = withTiming(20, { duration: 200 });
        textTranslateY.value = withTiming(0, { duration: 300 });
        mainTextOpacity.value = withTiming(1, { duration: 300 });
        isAnimating.value = withDelay(200, withTiming(0, { duration: 100 }));
      }, delay);
    } else {
      loaderOpacity.value = withTiming(0, { duration: 200 });
      statusTextOpacity.value = withTiming(0, { duration: 200 });
      statusTextTranslateY.value = withTiming(20, { duration: 200 });
      iconRotation.value = withTiming(0, { duration: 200 });
      iconTranslateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      textTranslateY.value = withTiming(0, { duration: 300 });
      mainTextOpacity.value = withTiming(1, { duration: 300 });
      backgroundColor.value = colors.base;
      isAnimating.value = withDelay(200, withTiming(0, { duration: 100 }));
    }
  }, [loading, responseStatus, colors.base]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: shake.value }],
    backgroundColor: backgroundColor.value,
  }));

  const animatedMainTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: mainTextOpacity.value,
  }));

  const animatedStatusTextStyle = useAnimatedStyle(() => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: statusTextTranslateY.value }],
    opacity: statusTextOpacity.value,
  }));

  const animatedLoaderStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: iconTranslateX.value },
      { rotate: `${iconRotation.value}deg` },
    ],
  }));

  const isDisabled = useAnimatedStyle(() => {
    return {
      pointerEvents: isAnimating.value === 1 ? "none" : "auto",
    };
  });

  const getVariantStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius,
      alignItems: "center",
      justifyContent: "center",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.55,
          shadowRadius: 3,
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
        isDisabled,
        containerStyle,
      ]}
    >
      <Animated.View style={styles.contentContainer}>
        {leftIcon && (
          <Animated.View style={[styles.leftSection, animatedIconStyle]}>
            <AnimatedImage
              source={leftIcon}
              style={[styles.icon]}
              resizeMode="contain"
            />
          </Animated.View>
        )}
        <Animated.View style={[styles.centerSection]}>
          {!leftIcon && !rightIcon && (
            <Animated.View style={[styles.loaderWrapper, animatedLoaderStyle]}>
              <CircularLoader />
            </Animated.View>
          )}
          <AnimatedText
            style={[
              styles.text,
              { color: textColor || "#FFFFFF" },
              textStyle,
              animatedMainTextStyle,
            ]}
          >
            {label.toUpperCase()}
          </AnimatedText>
          <Animated.View style={[animatedStatusTextStyle]}>
            <AnimatedText
              style={[
                styles.text,
                styles.statusText,
                { color: textColor || "#FFFFFF" },
                textStyle,
              ]}
            >
              {responseStatus !== undefined
                ? responseStatus === 200
                  ? successMessage.toUpperCase()
                  : errorMessage.toUpperCase()
                : ""}
            </AnimatedText>
          </Animated.View>
        </Animated.View>
        {rightIcon && (
          <Animated.View style={[styles.rightSection, animatedIconStyle]}>
            <AnimatedImage
              source={rightIcon}
              style={[styles.icon]}
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
  },
  leftSection: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerSection: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  rightSection: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Jost_600SemiBold",
  },
  statusText: {
    textAlign: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Button;
