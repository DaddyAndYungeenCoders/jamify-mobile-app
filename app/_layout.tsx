import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import SplashScreen from "./splash-screen";
import AuthenticationScreen from "./authentication-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useAuthenticationStore } from "@/store/authentication.store";
import Button from "@/components/Button";

export default function RootLayout() {
  const { token, loading, error, setJWTToken, removeJWTToken } =
    useAuthenticationStore();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (loaded) {
          const timer = setTimeout(() => {
            setIsAppReady(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, [loaded]);

  if (!loaded || !isAppReady) {
    return <SplashScreen />;
  }

  if (token === null) {
    return <AuthenticationScreen />;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <LinearGradient style={{ flex: 1 }} colors={Colors.light.background}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          <Button
            label="Disconnect"
            onPress={() => removeJWTToken()}
            colors={{ base: "#fc3c44", pressed: "#f94c57" }}
          />
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: "transparent" },
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(details)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
        <StatusBar style="auto" />
      </LinearGradient>
    </ThemeProvider>
  );
}
