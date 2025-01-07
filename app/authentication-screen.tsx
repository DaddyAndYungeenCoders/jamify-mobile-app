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

  const { token, loading, error, getJWTToken, removeJWTToken } =
    useAuthenticationStore();

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

  const handleSpotifyConnect = async () => {
    setButtonLoading((prev) => ({ ...prev, spotify: true }));
    setShowWebView(true);
    await getJWTToken(null);
    setButtonLoading((prev) => ({ ...prev, spotify: false }));
  };

  const handleAppleConnect = async () => {
    setButtonLoading((prev) => ({ ...prev, apple: true }));
    await getJWTToken(null);
    setButtonLoading((prev) => ({ ...prev, apple: false }));
  };

  const handleAmazonConnect = async () => {
    setButtonLoading((prev) => ({ ...prev, amazon: true }));
    await getJWTToken(null);
    setButtonLoading((prev) => ({ ...prev, amazon: false }));
  };

  useEffect(() => {
    if (token != null) {
      const status = token ? 200 : 400;
      setButtonStatus({
        spotify: status,
        apple: null,
        amazon: null,
      });
      if (status) {
        removeJWTToken();
      }
    }
  }, [token]);
  useEffect(() => {
    console.log("showWebView changed:", showWebView);
  }, [showWebView]);

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
            loading={buttonLoading.spotify || loading}
            onPress={handleSpotifyConnect}
            colors={{ base: "#35BE62", pressed: "#5dba7c" }}
            responseStatus={buttonStatus.spotify}
            successMessage={token ?? "CONNECTED !"}
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
