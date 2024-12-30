import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import OrbitAnimation from "@/components/orbit-animation/orbit-animation";

const { height } = Dimensions.get("window");

const ICON_SIZE = 30;

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

export default function AnimatedSplash() {
  const playButtonScale = useSharedValue(1);

  useEffect(() => {
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

  return (
    <LinearGradient colors={Colors.light.background} style={styles.container}>
      <View style={styles.content}>
        <OrbitAnimation
          innerOrbitalIcons={innerOrbitalIcons}
          outerOrbitalIcons={outerOrbitalIcons}
          iconSize={ICON_SIZE}
        />

        <Animated.View style={[styles.playButton, playButtonAnimatedStyle]}>
          <Animated.Image
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
  content: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
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
