import React, { useCallback, memo } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import EventElement from "@/components/home/EventElement";
import { Event } from "@/types/event.types";
import { useRouter } from "expo-router";

interface EventsProps {
  events: Event[];
  isLoading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onEventPress?: (event: Event) => void;
}

const MemoizedEventElement = memo(
  ({ event, onPress }: { event: Event; onPress: (event: Event) => void }) => (
    <EventElement event={event} onPress={() => onPress(event)} />
  ),
);

const Events: React.FC<EventsProps> = ({
  events,
  isLoading = false,
  error = null,
  onEventPress,
}) => {
  const navigation = useNavigation();

  const router = useRouter();
  const handleEventPress = useCallback(
    (event: Event) => {
      router.push({
        pathname: "/(details)/event-detail",
        params: { eventId: JSON.stringify(event.id) },
      });
    },
    [navigation, onEventPress],
  );

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Events</ThemedText>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !events?.length) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Events</ThemedText>
        <ThemedText style={styles.error}>
          {error ? error.message : "Aucun event"}
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Events</ThemedText>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 18,
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: "Jost_600SemiBold",
  },
  flatList: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  error: {
    marginLeft: 100,
  },
});

export default memo(Events);
