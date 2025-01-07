// WebBrowserView.tsx

import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebBrowserViewProps } from "@/types/web-browser-view.types";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
  withDelay,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import WebBrowserButton from "./WebBrowserButton";

const WebBrowserView = ({
  showWebView,
  setShowWebView,
}: WebBrowserViewProps) => {
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);

  // Référence à la WebView
  const webViewRef = useRef<WebView | null>(null);

  useEffect(() => {
    rotation.value = withDelay(
      200,
      withRepeat(
        withTiming(360, {
          duration: 1000, //
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        false,
      ),
    );
  }, []);

  const animatedRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

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
          <View style={styles.emoji}>
            <Animated.Text
              style={[
                styles.title,
                animatedRotationStyle, // Appliquer la rotation animée ici
              ]}
            >
              🌐
            </Animated.Text>
          </View>
          <Text style={styles.title}> JAMIFY WEB BROWSER</Text>
        </View>
        <View style={styles.webView}>
          {/* Passer la référence à la WebView */}
          <WebView
            ref={webViewRef}
            source={{ uri: "https://www.example.com" }}
            style={{
              flex: 1,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              overflow: "hidden",
            }}
          />

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

export default WebBrowserView;

const styles = StyleSheet.create({
  webView: {
    marginHorizontal: "0.5%",
    width: "99%",
    height: "90%",
    borderRadius: 15,
    overflow: "hidden",
    display: "flex",
    backgroundColor: "#212121",
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
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  emoji: {
    height: 30,
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Jost_600SemiBold",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
