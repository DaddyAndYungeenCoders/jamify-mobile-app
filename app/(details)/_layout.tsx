import Header from "@/components/detail/header";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface HeaderOption {
  title?: string;
  centerComponent?: React.ReactNode;
}

const TAB_BAR_HEIGHT = 45;
const screenHeight = Dimensions.get("window").height;
const contentHeight = screenHeight - TAB_BAR_HEIGHT;

const screenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_right",
  presentation: "card",
  fullScreenGestureEnabled: true,
  gestureEnabled: true,
  animationDuration: 300,
  ...Platform.select({
    ios: {
      animationTypeForReplace: "push",
    },
  }),
};

export default function DetailLayout() {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  // Cache les tabs quand un écran de la stack est monté
  useEffect(() => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      // Cache la tab bar
      parentNav.setOptions({
        tabBarStyle: { display: "none" },
      });

      // Restore la tab bar quand l'écran est démonté
      return () => {
        parentNav.setOptions({
          tabBarStyle: {
            display: "flex",
            position: "absolute",
            bottom: 30,
            left: 16,
            right: 16,
            height: TAB_BAR_HEIGHT,
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderTopWidth: 0,
          },
        });
      };
    }
  }, []);

  const renderHeader = (headerOption?: HeaderOption) => {
    return (
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={28} color="white" />
          </TouchableOpacity>
        }
        centerComponent={headerOption?.centerComponent}
      />
    );
  };

  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            ...screenOptions,
            headerShown: true,
            header: ({ options }) => renderHeader(options as HeaderOption),
            contentStyle: styles.stackContent,
          }}
        >
          <Stack.Screen
            name="conversation-detail"
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="event-detail"
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="create-event"
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="join-event"
            options={{
              animation: "slide_from_right",
            }}
          />
            <Stack.Screen
                name="create-jam"
                options={{
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="jam-detail"
                options={{
                    animation: "slide_from_right",
                }}
            />
          <Stack.Screen
              name="create-playlist"
              options={{
                animation: "slide_from_right",
              }}
          />
        </Stack>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: contentHeight,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  stackContent: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "100%",
    width: "100%",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
});
