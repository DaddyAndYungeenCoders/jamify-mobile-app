import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebBrowserViewProps } from "@/types/web-browser-view.types";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import WebBrowserButton from "./WebBrowserButton";
import Fontisto from "@expo/vector-icons/Fontisto";

const WebBrowserView = ({
  showWebView,
  setShowWebView,
  url,
}: WebBrowserViewProps) => {
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const webViewRef = useRef<WebView | null>(null);

  useEffect(() => {
    const animationSequence = () => {
      rotation.value = withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(720, {
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
        }),
      );

      // Translation
      translateX.value = withSequence(
        withTiming(50, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(-20, { duration: 0 }),
        withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
      );

      // Opacité
      opacity.value = withSequence(
        withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
        withDelay(
          500,
          withTiming(1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
      );
    };

    const interval = setInterval(animationSequence, 4000);
    animationSequence();

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const goBack = () => {
    if (webViewRef.current && webViewRef.current.goBack) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current && webViewRef.current.goForward) {
      webViewRef.current.goForward();
    }
  };

  const reloadPage = () => {
    if (webViewRef.current && webViewRef.current.reload) {
      webViewRef.current.reload();
    }
  };

  const closeWebView = () => {
    setShowWebView(false);
  };

  return (
    <Modal visible={showWebView} onRequestClose={() => setShowWebView(false)}>
      <LinearGradient
        colors={Colors.light.background}
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: "black",
          display: "flex",
        }}
      >
        <View style={styles.topNavigationBar}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Animated.View style={[styles.animatedIcon, animatedStyle]}>
                  <Fontisto name="world-o" size={24} color="#1ca1bd" />
                </Animated.View>
              </View>
            </View>
            <Text style={styles.title}>JAMIFY WEB BROWSER</Text>
          </View>
        </View>
        <View style={styles.webView}>
          <View style={styles.webViewPage}>
            <WebView
              ref={webViewRef}
              source={{ uri: url }}
              style={{
                flex: 1,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                overflow: "hidden",
              }}
              onError={(error) => {
                console.log("ERROR : ", error);
              }}
              onHttpError={(error) => {
                console.log("ERROR HTTP : ", error);
              }}
            />
          </View>
          <View style={styles.bottomNavigationBar}>
            <WebBrowserButton
              Icon={
                <Ionicons name="chevron-back-outline" size={26} color="white" />
              }
              onPress={goBack}
            />
            <WebBrowserButton
              Icon={
                <Ionicons
                  name="chevron-forward-outline"
                  size={26}
                  color="white"
                />
              }
              onPress={goForward}
            />
            <WebBrowserButton
              Icon={<Ionicons name="reload-sharp" size={26} color="white" />}
              onPress={reloadPage}
            />
            <WebBrowserButton
              Icon={<Ionicons name="close-outline" size={30} color="white" />}
              onPress={closeWebView}
            />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: "99%",
    height: "90%",
    borderRadius: 15,
    overflow: "hidden",
    display: "flex",
    backgroundColor: "#212121",
    margin: "0.5%",
  },
  webViewPage: {
    width: "100%",
    height: "92.5%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  bottomNavigationBar: {
    width: "100%",
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  topNavigationBar: {
    width: "100%",
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    position: "absolute",
    left: 0,
    right: 0,
  },
  iconContainer: {
    width: 60, // Réduit de 200 à 40
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Jost_600SemiBold",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    paddingLeft: "10%",
  },
});

export default WebBrowserView;
