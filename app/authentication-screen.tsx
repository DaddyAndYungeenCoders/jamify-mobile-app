import Button from "@/components/Button";
import OrbitAnimation from "@/components/orbit-animation/orbit-animation";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthenticationScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyConnect = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simuler une connexion
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={Colors.light.background} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoText}>JAMIFY</Text>
          <OrbitAnimation
            innerOrbitRadius={60}
            outerOrbitRadius={95}
            iconSize={24}
            ringWidth={4}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Button
            label="CONNECT WITH SPOTIFY"
            leftIcon={require("../assets/images/music-logos/spotify.png")}
            loading={isLoading}
            onPress={handleSpotifyConnect}
            colors={{ base: "#35BE62", pressed: "#5dba7c" }}
            //responseStatus={200}
          />

          <Button
            label="CONNECT WITH APPLE"
            leftIcon={require("../assets/images/music-logos/apple.png")}
            loading={isLoading}
            onPress={handleSpotifyConnect}
            colors={{ base: "#fc3c44", pressed: "#f94c57" }}
            responseStatus={200}
          />

          <Button
            label="CONNECT WITH AMAZON"
            leftIcon={require("../assets/images/music-logos/amazon.png")}
            loading={isLoading}
            onPress={handleSpotifyConnect}
            colors={{ base: "#ff9900", pressed: "#ffb74a" }}
            responseStatus={400}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  topContainer: {
    height: "50%",
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 20,
  },
  bottomContainer: {
    height: "50%",
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 50,
    gap: 30,
    bottom: 0,
  },
  logoText: {
    fontSize: 50,
    color: "white",
    fontFamily: "Jost_700Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
});
