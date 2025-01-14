import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import EventElement from "@/components/home/EventElement";
import { Event } from "@/types/event.types";

interface EventProps {
  events: Event[];
}

const Events: React.FC<EventProps> = ({ events }) => {
  return (
    <View style={styles.content}>
      <ThemedText style={styles.text}>Events</ThemedText>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {events ? (
          events.map((event, index) => (
            <EventElement event={event} key={index} />
          ))
        ) : (
          <ThemedText style={styles.error}>Aucun Event</ThemedText>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
    textDecorationLine: "underline",
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: "Jost",
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  error: {
    marginLeft: 100,
  },
});

export default Events;
