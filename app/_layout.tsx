import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (loaded) {
          //          await SplashScreen.hideAsync();
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
  if (false) {
    return <AuthenticationScreen />;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <LinearGradient style={{ flex: 1 }} colors={Colors.light.background}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
        <StatusBar style="auto" />
      </LinearGradient>
    </ThemeProvider>
  );
}
