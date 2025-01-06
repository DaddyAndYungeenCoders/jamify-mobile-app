import Button from "@/components/Button";
import OrbitAnimation from "@/components/orbit-animation/orbit-animation";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

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
      <View>
        <OrbitAnimation
          innerOrbitRadius={40}
          outerOrbitRadius={70}
          iconSize={20}
          ringWidth={3}
        />
      </View>

      <Button
        label="CONNECT WITH AMAZON"
        leftIcon={require("../assets/images/music-logos/amazon.png")}
        loading={isLoading}
        onPress={handleSpotifyConnect}
        colors={{ base: "#ff9900", pressed: "#ffb74a" }}
        responseStatus={200}
      />
    </LinearGradient>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
