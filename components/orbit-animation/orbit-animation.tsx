import { OrbitAnimationProps } from "@/types/orbit-animation.types";
import { describeArc } from "@/utils/orbital-animation.utils";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  ReduceMotion,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const playButtonImage = {
  image: require("../../assets/images/music-logos/play.png"),
};
export default function OrbitAnimation({
  innerOrbitalIcons = [
    {
      image: require("../../assets/images/music-logos/apple.png"),
      initialAngle: 0,
    },
    {
      image: require("../../assets/images/music-logos/spotify.png"),
      initialAngle: 120,
    },
    {
      image: require("../../assets/images/music-logos/amazon.png"),
      initialAngle: 240,
    },
  ],
  outerOrbitalIcons = [
    {
      image: require("../../assets/images/music-logos/apple.png"),
      initialAngle: 60,
    },
    {
      image: require("../../assets/images/music-logos/spotify.png"),
      initialAngle: 180,
    },
    {
      image: require("../../assets/images/music-logos/amazon.png"),
      initialAngle: 300,
    },
  ],
  innerOrbitRadius = 70,
  outerOrbitRadius = 120,
  iconSize = 30,
  ringWidth = 5,
  animationDuration = 8000,
  outerTimingMultiplier = 1.5,
}: OrbitAnimationProps) {
  const innerRotation = useSharedValue(0);
  const outerRotation = useSharedValue(0);
  const innerRingsRotation = useSharedValue(0);
  const outerRingsRotation = useSharedValue(0);

  const playButtonScale = useSharedValue(1);

  const createRotationAnimation = (
    sharedValue: Animated.SharedValue<number>,
    durationMultiplier = 1,
  ) => {
    sharedValue.value = withRepeat(
      withTiming(360, {
        duration: animationDuration * durationMultiplier,
        easing: Easing.out(Easing.linear),
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
    );
  };

  useEffect(() => {
    [innerRotation, innerRingsRotation].forEach((value) =>
      createRotationAnimation(value),
    );
    [outerRotation, outerRingsRotation].forEach((value) =>
      createRotationAnimation(value, outerTimingMultiplier),
    );

    playButtonScale.value = withRepeat(
      withSpring(1.2, {
        damping: 2,
        stiffness: 80,
      }),
      -1,
      true,
    );
  }, []);

  const innerRingsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${innerRingsRotation.value}deg` }],
  }));

  const outerRingsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${outerRingsRotation.value}deg` }],
  }));

  const createOrbitalStyle = (
    radius: number,
    rotation: Animated.SharedValue<number>,
    initialAngle: number,
  ) => {
    return useAnimatedStyle(() => {
      const angle = ((rotation.value + initialAngle) * Math.PI) / 180;
      return {
        transform: [
          {
            translateX: radius * Math.cos(angle),
          },
          {
            translateY: radius * Math.sin(angle),
          },
        ],
      };
    });
  };

  const createRingSegments = (
    radius: number,
    startAngles: Array<number> = [-15, 105, 225],
    segmentArc: number = 90,
  ) => {
    const segments = [];
    for (let i = 0; i < 3; i++) {
      const startAngle = startAngles[i];
      const endAngle = startAngle + segmentArc;
      segments.push(
        <Path
          key={`segment-${radius}-${i}`}
          d={describeArc(
            radius,
            startAngle,
            endAngle,
            outerOrbitRadius + iconSize,
            outerOrbitRadius + iconSize,
          )}
          stroke="white"
          strokeWidth={ringWidth}
          fill="none"
          strokeOpacity={1}
        />,
      );
    }
    return segments;
  };

  const playButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playButtonScale.value }],
  }));

  return (
    <View style={styles.content}>
      <View
        style={[
          styles.centerContainer,
          {
            width: (outerOrbitRadius + iconSize) * 2,
            height: (outerOrbitRadius + iconSize) * 2,
          },
        ]}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, outerRingsAnimatedStyle]}
        >
          <Svg height="100%" width="100%">
            {createRingSegments(outerOrbitRadius, [45, 165, 285])}
          </Svg>
        </Animated.View>

        <Animated.View
          style={[StyleSheet.absoluteFill, innerRingsAnimatedStyle]}
        >
          <Svg height="100%" width="100%">
            {createRingSegments(innerOrbitRadius, [-10, 110, 230], 80)}
          </Svg>
        </Animated.View>

        {innerOrbitalIcons.map((item, index) => (
          <Animated.Image
            key={`inner-${index}`}
            source={item.image}
            style={[
              styles.orbitalIcon,
              { width: iconSize, height: iconSize },
              createOrbitalStyle(
                innerOrbitRadius,
                innerRotation,
                item.initialAngle,
              ),
            ]}
            resizeMode="contain"
          />
        ))}

        {outerOrbitalIcons.map((item, index) => (
          <Animated.Image
            key={`outer-${index}`}
            source={item.image}
            style={[
              styles.orbitalIcon,
              { width: iconSize, height: iconSize },
              createOrbitalStyle(
                outerOrbitRadius,
                outerRotation,
                item.initialAngle,
              ),
            ]}
            resizeMode="contain"
          />
        ))}
      </View>

      <Animated.View style={[styles.playButton, playButtonAnimatedStyle]}>
        <Animated.Image
          source={playButtonImage.image}
          style={{ height: iconSize, width: iconSize }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  orbitalIcon: {
    position: "absolute",
    zIndex: 2,
  },

  playButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 3,
  },
});
