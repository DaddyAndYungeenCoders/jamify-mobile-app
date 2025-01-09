import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, StyleSheet, Dimensions } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import BottomTabBar from "@/components/BottomTabBar";

export default function TabLayout() {
  const TAB_BAR_HEIGHT = 45;
  const screenHeight = Dimensions.get("window").height;
  const contentHeight = screenHeight - TAB_BAR_HEIGHT;

  return (
    <View style={styles.container}>
      <View style={styles.pageContainer}>
        <Tabs
          tabBar={(props) => <BottomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            sceneStyle: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 12,
              overflow: "visible",
              height: contentHeight,
              maxHeight: contentHeight,
              width: "100%",
              marginBottom: TAB_BAR_HEIGHT + 30,
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.55,
              shadowRadius: 3,
              elevation: 5,
              paddingTop: 10,
            },
          }}
        >
          <Tabs.Screen
            name="map"
            options={{
              title: "Map",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="map.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Foundation name="home" size={26} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="conversations"
            options={{
              title: "Conversation",

              tabBarIcon: ({ color }) => (
                <Feather name="message-square" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  pageContainer: {
    flex: 1,
    marginHorizontal: 16,
    //paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
});
