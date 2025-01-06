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
  const backgroundColor = useSharedValue(colors.base);
  const iconRotation = useSharedValue(0);
  const iconTranslateX = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    "worklet";
    scale.value = withSpring(0.98, { damping: 15, stiffness: 120 });
  }, []);

  const handlePressOut = useCallback(() => {
    "worklet";
    scale.value = withSpring(1, { damping: 15, stiffness: 120 });
  }, []);

  const shakeAnimation = (success: boolean) => {
    "worklet";
    if (success) {
      return withSequence(
        withTiming(-3, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(3, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(0, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
      );
    } else {
      return withSequence(
        withTiming(-5, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(5, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(-5, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(5, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(-5, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(5, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
        withTiming(0, {
          duration: 50,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        }),
      );
    }
  };

  useEffect(() => {
    if (loading) {
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
          duration: 500,
          easing: Easing.bounce,
          reduceMotion: ReduceMotion.System,
        });

        iconRotation.value = withDelay(
          500,
          withRepeat(
            withTiming(360, {
              duration: 1000,
              easing: Easing.cubic,
              reduceMotion: ReduceMotion.System,
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
    } else if (responseStatus !== undefined) {
      loaderOpacity.value = withTiming(0, { duration: 100 });
      iconRotation.value = withTiming(0, { duration: 100 });
      iconTranslateX.value = withTiming(0, { duration: 100 });

      mainTextOpacity.value = withTiming(0, { duration: 100 });

      backgroundColor.value = responseStatus === 200 ? "#4CAF50" : "#F44336";
      shake.value = shakeAnimation(responseStatus === 200);

      statusTextTranslateY.value = withSequence(
        withTiming(0, { duration: 200 }),
        withDelay(1500, withTiming(20, { duration: 200 })),
      );
      statusTextOpacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(1500, withTiming(0, { duration: 200 })),
      );

      const delay = 2000;

      backgroundColor.value = withDelay(
        delay,
        withTiming(colors.base, { duration: 300 }),
      );

      textTranslateY.value = withDelay(delay, withTiming(0, { duration: 300 }));
      mainTextOpacity.value = withDelay(
        delay,
        withTiming(1, { duration: 300 }),
      );
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
    }
  }, [loading, responseStatus]);

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
            height: 8,
          },
          shadowOpacity: 0.65,
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
            {label}
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
