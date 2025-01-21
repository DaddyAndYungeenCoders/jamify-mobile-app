import Button from "@/components/Button";
import OrbitAnimation from "@/components/orbit-animation/orbit-animation";
import WebBrowserView from "@/components/WebBrowserView";
import { Colors } from "@/constants/Colors";
import { useAuthenticationStore } from "@/store/authentication.store";
import { useUserStore } from "@/store/user.store";
import { userService } from "@/services/user.service";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ModalPdfViewer from "@/components/cgu-page";

const AuthenticationScreen = () => {
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const {
    token,
    loading: authLoading,
    error: authError,
    setJWTToken,
  } = useAuthenticationStore();
  const {
    loading: userLoading,
    error: userError,
    setUser,
    setLoading: setUserLoading,
    setError: setUserError,
  } = useUserStore();
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

  const [showCGU, setShowCGU] = useState(false);

  const handleConversationPress = (): void => {
    setShowCGU(true);
  };

  const handleSpotifyConnect = () => {
    setButtonLoading((prev) => ({ ...prev, spotify: true }));
    setTimeout(() => {
      setUrl("https://jamify.daddyornot.xyz/oauth2/authorization/spotify");
      setShowWebView(true);
      setButtonLoading((prev) => ({ ...prev, spotify: false }));
    }, 700);
  };

  const handleTokenReceived = async (token: string) => {
    try {
      // 1. Met à jour le token
      setJWTToken(token);

      // 2. Récupère les infos utilisateur
      setUserLoading(true);
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
        setUserError(null);
      } catch (error) {
        setUserError(
          error instanceof Error ? error.message : "Failed to fetch user",
        );
        throw error;
      } finally {
        setUserLoading(false);
      }

      // 3. Met à jour l'UI
      setButtonLoading((prev) => ({ ...prev, spotify: false }));
      setTimeout(() => {
        setButtonStatus((prev) => ({
          ...prev,
          spotify: 200,
        }));
      }, 700);
    } catch (error) {
      setButtonLoading((prev) => ({ ...prev, spotify: false }));
      setButtonStatus((prev) => ({
        ...prev,
        spotify: 400,
      }));
    }
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
            loading={buttonLoading.spotify || authLoading || userLoading}
            onPress={handleSpotifyConnect}
            colors={{ base: "#35BE62", pressed: "#5dba7c" }}
            responseStatus={buttonStatus.spotify}
            successMessage={"CONNECTED!"}
            errorMessage={authError ?? userError ?? ""}
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
          <Pressable onPress={handleConversationPress}>
            <Text style={styles.cgu}>Read CGU</Text>
          </Pressable>
        </View>
        <WebBrowserView
          showWebView={showWebView}
          setShowWebView={setShowWebView}
          url={url}
          onTokenReceived={handleTokenReceived}
        />

        <ModalPdfViewer visible={showCGU} onClose={() => setShowCGU(false)} />
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
  cgu: {
    fontSize: 22,
    color: "white",
    fontFamily: "Jost_700Bold",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
