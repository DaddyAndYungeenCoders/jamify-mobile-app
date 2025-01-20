import React, { useCallback, memo, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Animated, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import EventElement from "@/components/home/EventElement";
import { Event } from "@/types/event.types";
import { useEvents } from "@/hooks/useEvent";
import { Feather } from "@expo/vector-icons";
import DropDownMenu from "../DropDownMenu";

interface EventsProps {
  onRefresh?: () => void;
}

const MemoizedEventElement = memo(
  ({ event, onPress }: { event: Event; onPress: (event: Event) => void }) => (
    <EventElement event={event} onPress={() => onPress(event)} />
  ),
);

const CircularLoader = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const Events: React.FC<EventsProps> = ({ onRefresh }) => {
  const router = useRouter();
  const { events, isLoading, error, refetch } = useEvents();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleEventPress = useCallback(
    (event: Event) => {
      router.push({
        pathname: "/(details)/event-detail",
        params: { eventId: JSON.stringify(event.id) },
      });
    },
    [router],
  );

  const handleCreateEvent = useCallback(() => {
    router.push("/(details)/create-event");
  }, [router]);

  const handleJoinEvent = useCallback(() => {
    router.push("/(details)/join-event");
  }, [router]);

  const renderItem = useCallback(
    ({ item: event }: { item: Event }) => (
      <MemoizedEventElement event={event} onPress={handleEventPress} />
    ),
    [handleEventPress],
  );

  const keyExtractor = useCallback(
    (item: Event, key: number) =>
      key.toString() + item.id.toString() + item.name,
    [],
  );

  // Dans le renderHeader
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ThemedText style={styles.title}>Events</ThemedText>
      <DropDownMenu
        onCreatePress={handleCreateEvent}
        onJoinPress={handleJoinEvent}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <CircularLoader />
      </View>
    );
  }

  if (error || !events?.length) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.centerContainer}>
          <ThemedText style={styles.error}>
            {error ? error.message : "Aucun event"}
          </ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {renderHeader()}
        <FlatList
          horizontal
          data={events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          onRefresh={onRefresh || refetch}
          refreshing={isLoading}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    textDecorationLine: "underline",
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "Jost_600SemiBold",
    color: "white",
  },
  addButton: {
    padding: 8,
    zIndex: 1001, // Plus grand que le zIndex du menu overlay
    position: "relative",
  },
  flatList: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 18,
    fontFamily: "Jost_600SemiBold",
    color: "white",
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
    borderTopColor: "transparent",
  },

  plusButtonOverlay: {
    position: "absolute",
    top: 8, // Ajustez ces valeurs pour correspondre à la position de votre bouton +
    right: 15, // Ajustez ces valeurs pour correspondre à la position de votre bouton +
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});

export default memo(Events);
