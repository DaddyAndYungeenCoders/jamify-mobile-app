import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import OrbitAnimation from "@/components/orbit-animation/orbit-animation";

const { height } = Dimensions.get("window");

const SplashScreen = () => {
  return (
    <LinearGradient colors={Colors.light.background} style={styles.container}>
      <OrbitAnimation />

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>JAMIFY</Text>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
