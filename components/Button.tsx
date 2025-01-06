import { CustomButtonProps } from "@/types/button.types";
import React, { useCallback, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
  Platform,
  View,
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

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface ExtendedCustomButtonProps extends CustomButtonProps {
  responseStatus?: number;
}

const CircularLoader = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.loaderContainer, animatedStyle]}>
      <View style={styles.loader} />
    </Animated.View>
  );
};

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
  borderRadius = 8,
  textColor,
  colors = { base: "#87CEEB", pressed: "#FFF" },
  responseStatus,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const textTranslateY = useSharedValue(0);
  const textOpacity = useSharedValue(1);
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
        withTiming(-3, { duration: 50 }),
        withTiming(3, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    } else {
      return withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
  };

  useEffect(() => {
    if (loading) {
      // Disparition rapide du texte
      textTranslateY.value = withTiming(50, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
      textOpacity.value = withTiming(0, {
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

        // Commencer la rotation après que l'icône soit centrée
        iconRotation.value = withDelay(
          500, // Délai correspondant à la durée du slide
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
            reduceMotion: ReduceMotion.System,
          }),
        );
      }
    } else if (responseStatus !== undefined) {
      loaderOpacity.value = withTiming(0, { duration: 200 });
      iconRotation.value = withTiming(0, { duration: 200 });
      iconTranslateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.bounce,
        reduceMotion: ReduceMotion.System,
      });

      // Changement de couleur instantané
      backgroundColor.value = responseStatus === 200 ? "#4CAF50" : "#F44336";

      // Animation de secouement
      shake.value = shakeAnimation(responseStatus === 200);

      // Retour à l'état initial après 1.5s
      backgroundColor.value = withDelay(
        2000,
        withTiming(colors.base, { duration: 300 }),
      );

      // Réapparition du texte
      textTranslateY.value = withDelay(1000, withTiming(0, { duration: 300 }));
      textOpacity.value = withDelay(1100, withTiming(1, { duration: 300 }));
    } else {
      // Retour direct à l'état initial
      loaderOpacity.value = withTiming(0, { duration: 200 });
      iconRotation.value = withTiming(0, { duration: 200 });
      iconTranslateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      textTranslateY.value = withTiming(0, { duration: 300 });
      textOpacity.value = withTiming(1, { duration: 300 });
      backgroundColor.value = colors.base;
    }
  }, [loading, responseStatus]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: shake.value }],
      backgroundColor: backgroundColor.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: textTranslateY.value }],
      opacity: textOpacity.value,
    };
  });

  const animatedLoaderStyle = useAnimatedStyle(() => {
    return {
      opacity: loaderOpacity.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: iconTranslateX.value },
        { rotate: `${iconRotation.value}deg` },
      ],
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
          <Animated.View style={[styles.leftSection, animatedIconStyle]}>
            <AnimatedImage
              source={leftIcon}
              style={[styles.icon]}
              resizeMode="contain"
            />
          </Animated.View>
        )}
        <Animated.View style={styles.centerSection}>
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
              animatedTextStyle,
            ]}
          >
            {label}
          </AnimatedText>
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
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
  loaderContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    borderTopColor: "transparent",
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
