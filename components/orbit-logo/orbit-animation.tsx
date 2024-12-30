import { useEffect } from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  radius: number,
  startAngle: number,
  endAngle: number,
  cx: number,
  cy: number,
) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

export default function OrbitAnimation({
  innerOrbitalIcons,
  outerOrbitalIcons,
  innerOrbitRadius = 70,
  outerOrbitRadius = 120,
  iconSize = 30,
  ringWidth = 5,
  animationDuration = 6000,
  outerTimingMultiplier = 1.5,
}: OrbitAnimationProps) {
  const innerRotation = useSharedValue(0);
  const outerRotation = useSharedValue(0);
  const innerRingsRotation = useSharedValue(0);
  const outerRingsRotation = useSharedValue(0);

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

  return (
    <View
      style={[
        styles.centerContainer,
        {
          width: (outerOrbitRadius + iconSize) * 2,
          height: (outerOrbitRadius + iconSize) * 2,
        },
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, outerRingsAnimatedStyle]}>
        <Svg height="100%" width="100%">
          {createRingSegments(outerOrbitRadius, [45, 165, 285])}
        </Svg>
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, innerRingsAnimatedStyle]}>
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
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  orbitalIcon: {
    position: "absolute",
    zIndex: 2,
  },
});
