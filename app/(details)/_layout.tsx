// DetailLayout.tsx
import Header from "@/components/detail/header";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface HeaderOption {
  title?: string;
  centerComponent?: React.ReactNode;
}

export default function DetailLayout() {
  const renderHeader = (headerOption?: HeaderOption) => {
    return (
      <Header
        leftComponent={
          <TouchableOpacity onPress={router.back}>
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
            contentStyle: styles.stackContent,
            headerShown: true,
            header: ({ options }) => renderHeader(options as HeaderOption),
          }}
        >
          <Stack.Screen name="conversation-detail" />
          <Stack.Screen name="event-detail" />
          <Stack.Screen name="create-event" />
          <Stack.Screen name="join-event" />
        </Stack>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "black",
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  stackContent: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
