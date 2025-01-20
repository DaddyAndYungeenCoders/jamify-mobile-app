import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ClassicButton from "@/components/ClassicButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Event } from "@/types/event.types";

interface EventElementProps extends Omit<TouchableOpacityProps, "onPress"> {
  event: Event;
  onPress: (event: Event) => void;
}

const EventElement: React.FC<EventElementProps> = ({
  event,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => onPress(event)}
      {...props}
    >
      <Image source={event.background} style={styles.image} />
      <View style={styles.overlay}>
        <ThemedText style={styles.date}>
          {event.scheduledDate.toLocaleDateString()}
        </ThemedText>
        <View style={styles.participateBack} />
        <ClassicButton
          title="Participer"
          onPress={() => {
            onPress(event);
          }}
          style={styles.participateButton}
          backgroundColor="none"
        />
        <View style={styles.bottomContainer}>
          <ThemedText style={styles.name}>{event.name}</ThemedText>
          <View style={styles.participantsContainer}>
            <MaterialIcons
              name="people-outline"
              size={15}
              color="white"
              style={styles.icon}
            />
            <ThemedText style={styles.participantsText}>
              {event.participants.length}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.description}>{event.description}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 207,
    marginLeft: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 10,
    justifyContent: "space-between",
  },
  date: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#fff",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
  participateButton: {
    position: "absolute",
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 30,
    width: 100,
  },
  participateBack: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    height: 30,
    width: 100,
    opacity: 0.7,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    top: 100,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  participantsContainer: {
    top: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  participantsText: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#fff",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
});

export default EventElement;
