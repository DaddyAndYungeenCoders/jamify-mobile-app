import { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
  ReduceMotion,
  WithTimingConfig,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const ICON_SIZE = 30;
const INNER_ORBIT_RADIUS = 70;
const OUTER_ORBIT_RADIUS = 120;
const RING_WIDTH = 5;
const ANIMATION_DURATION = 6000;
const OUTER_TIMING_MULTIPLIER = 1.5;

const innerOrbitalIcons = [
  {
    image: require("../assets/images/music-logos/apple.png"),
    initialAngle: 0,
  },
  {
    image: require("../assets/images/music-logos/spotify.png"),
    initialAngle: 120,
  },
  {
    image: require("../assets/images/music-logos/amazon.png"),
    initialAngle: 240,
  },
];

const outerOrbitalIcons = [
  {
    image: require("../assets/images/music-logos/apple.png"),
    initialAngle: 60,
  },
  {
    image: require("../assets/images/music-logos/spotify.png"),
    initialAngle: 180,
  },
  {
    image: require("../assets/images/music-logos/amazon.png"),
    initialAngle: 300,
  },
];

const playButtonImage = {
  image: require("../assets/images/music-logos/play.png"),
};
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

export default function AnimatedSplash() {
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
        duration: ANIMATION_DURATION * durationMultiplier,
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
      createRotationAnimation(value, OUTER_TIMING_MULTIPLIER),
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

  const playButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playButtonScale.value }],
  }));

  const innerRingsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${innerRingsRotation.value}deg` }],
  }));

  const outerRingsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${outerRingsRotation.value}deg` }],
  }));

  const createOrbitalStyle = (
    radius: number,
    rotation: any,
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
    //const segmentArc = 90;
    //const startAngles = [40, 160, 280];

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
            OUTER_ORBIT_RADIUS + ICON_SIZE,
            OUTER_ORBIT_RADIUS + ICON_SIZE,
          )}
          stroke="white"
          strokeWidth={RING_WIDTH}
          fill="none"
          strokeOpacity={1}
        />,
      );
    }
    return segments;
  };

  return (
    <LinearGradient colors={Colors.light.background} style={styles.container}>
      <View style={styles.centerContainer}>
        <Animated.View
          style={[StyleSheet.absoluteFill, outerRingsAnimatedStyle]}
        >
          <Svg height="100%" width="100%">
            {createRingSegments(OUTER_ORBIT_RADIUS, [45, 165, 285])}
          </Svg>
        </Animated.View>

        <Animated.View
          style={[StyleSheet.absoluteFill, innerRingsAnimatedStyle]}
        >
          <Svg height="100%" width="100%">
            {createRingSegments(INNER_ORBIT_RADIUS, [-10, 110, 230], 80)}
          </Svg>
        </Animated.View>

        {innerOrbitalIcons.map((item, index) => (
          <Animated.Image
            key={`inner-${index}`}
            source={item.image}
            style={[
              styles.orbitalIcon,
              createOrbitalStyle(
                INNER_ORBIT_RADIUS,
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
              createOrbitalStyle(
                OUTER_ORBIT_RADIUS,
                outerRotation,
                item.initialAngle,
              ),
            ]}
            resizeMode="contain"
          />
        ))}

        <Animated.View style={[styles.playButton, playButtonAnimatedStyle]}>
          <Animated.Image
            key={`inner-play`}
            source={playButtonImage.image}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>JAMIFY</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    width: (OUTER_ORBIT_RADIUS + ICON_SIZE) * 2,
    height: (OUTER_ORBIT_RADIUS + ICON_SIZE) * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  orbitalIcon: {
    position: "absolute",
    width: ICON_SIZE,
    height: ICON_SIZE,
    zIndex: 2,
  },
  playButton: {
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
  playIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  logoContainer: {
    position: "absolute",
    top: height * 0.2,
  },
  logoText: {
    fontSize: 40,
    color: "white",
    fontFamily: "Jost_700Bold",
    fontWeight: "bold",
  },
});
