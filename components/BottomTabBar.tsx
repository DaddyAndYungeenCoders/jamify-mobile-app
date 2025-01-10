import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  LayoutRectangle,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const [tabBarLayout, setTabBarLayout] = useState<LayoutRectangle | null>(
    null,
  );
  const slidePosition = useSharedValue(0);

  // Calculer la largeur du tab uniquement une fois que nous avons les dimensions réelles
  const tabWidth = tabBarLayout ? tabBarLayout.width / state.routes.length : 0;

  React.useEffect(() => {
    if (tabBarLayout) {
      slidePosition.value = withSpring(state.index * tabWidth, {
        damping: 10, // Contrôle la force de "freinage" de l'animation
        stiffness: 150, // Contrôle la "rigidité" du ressort
        mass: 0.5, // Contrôle l'inertie
        overshootClamping: false, // Si true, empêche tout dépassement
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      });
    }
  }, [state.index, tabBarLayout]);

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slidePosition.value }],
    };
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => setTabBarLayout(event.nativeEvent.layout)}
    >
      {tabBarLayout && (
        <Animated.View
          style={[styles.slider, sliderStyle, { width: tabWidth }]}
        >
          <View style={styles.sliderBar} />
        </Animated.View>
      )}

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Style animé pour l'icône
        const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
        const iconStyle = useAnimatedStyle(() => {
          const isActive = state.index === index;
          return {
            transform: [
              {
                translateY: withSpring(isActive ? -5 : 0),
              },
            ],
            opacity: withTiming(isActive ? 1 : 0.6, {
              duration: 200,
            }),
          };
        });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tabBarIcon = options.tabBarIcon;

        return (
          <AnimatedPressable
            key={route.key}
            onPress={onPress}
            style={[styles.tab, iconStyle]}
          >
            {tabBarIcon && tabBarIcon({ color: "white" })}
          </AnimatedPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  slider: {
    position: "absolute",
    bottom: 10,
    height: 3,
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderBar: {
    backgroundColor: "white",
    borderRadius: 2,
    height: 3,
    width: 20,
  },
});
