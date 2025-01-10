import Button from "@/components/Button";
import OrbitAnimation from "@/components/orbit-animation/orbit-animation";
import WebBrowserView from "@/components/WebBrowserView";
import { Colors } from "@/constants/Colors";
import { useAuthenticationStore } from "@/store/authentication.store";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthenticationScreen = () => {
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const { token, loading, error, setJWTToken, removeJWTToken } =
    useAuthenticationStore();
  const [url, setUrl] = useState<string>("");

  const [buttonLoading, setButtonLoading] = useState<{
    spotify: boolean;
    apple: boolean;
    amazon: boolean;
  }>({
    spotify: false,
    apple: false,
    amazon: false,
  });

  const [buttonStatus, setButtonStatus] = useState<{
    spotify: null | number;
    apple: null | number;
    amazon: null | number;
  }>({
    spotify: null,
    apple: null,
    amazon: null,
  });

  const handleSpotifyConnect = () => {
    setButtonLoading((prev) => ({ ...prev, spotify: true }));

    setTimeout(() => {
      setUrl("https://jamify.daddyornot.xyz/oauth2/authorization/spotify");
      setShowWebView(true);
      setButtonLoading((prev) => ({ ...prev, spotify: false }));
    }, 700);
  };

  const handleTokenReceived = (token: string) => {
    setJWTToken(token);
    // Set success status for the button
    setButtonStatus((prev) => ({
      ...prev,
      spotify: 200,
    }));
  };

  const handleAppleConnect = async () => {
    setButtonLoading((prev) => ({ ...prev, apple: true }));
    setShowWebView(true);
    setButtonLoading((prev) => ({ ...prev, apple: false }));
  };

  const handleAmazonConnect = async () => {
    setButtonLoading((prev) => ({ ...prev, amazon: true }));
    setShowWebView(true);
    setButtonLoading((prev) => ({ ...prev, amazon: false }));
  };

  return (
    <LinearGradient colors={Colors.light.background} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logoText}>JAMIFY</Text>
          <OrbitAnimation
            innerOrbitRadius={60}
            outerOrbitRadius={95}
            iconSize={25}
            ringWidth={4}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Button
            label="CONNECT WITH SPOTIFY"
            leftIcon={require("../assets/images/music-logos/spotify.png")}
            loading={buttonLoading.spotify || loading}
            onPress={handleSpotifyConnect}
            colors={{ base: "#35BE62", pressed: "#5dba7c" }}
            responseStatus={buttonStatus.spotify}
            successMessage={"CONNECTED!"}
            errorMessage={error ?? ""}
          />

          <Button
            label="CONNECT WITH APPLE"
            leftIcon={require("../assets/images/music-logos/apple.png")}
            loading={buttonLoading.apple}
            onPress={handleAppleConnect}
            colors={{ base: "#fc3c44", pressed: "#f94c57" }}
            responseStatus={buttonStatus.apple}
            disabled={true}
          />

          <Button
            label="CONNECT WITH AMAZON"
            leftIcon={require("../assets/images/music-logos/amazon.png")}
            loading={buttonLoading.amazon}
            onPress={handleAmazonConnect}
            colors={{ base: "#ff9900", pressed: "#ffb74a" }}
            responseStatus={buttonStatus.amazon}
            disabled={true}
          />
        </View>
        <WebBrowserView
          showWebView={showWebView}
          setShowWebView={setShowWebView}
          url={url}
          onTokenReceived={handleTokenReceived}
        />
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
