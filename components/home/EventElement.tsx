import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
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
  const formatDate = (dateArray: number[]) => {
    if (!Array.isArray(dateArray) || dateArray.length < 6) {
      return "Date invalide";
    }

    const [year, month, day, hours, minutes] = dateArray;
    const date = new Date(year, month - 1, day, hours, minutes); // month-1 car les mois commencent à 0 en JS

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "SCHEDULED":
        return "#4CAF50";
      case "STARTED":
        return "#2196F3";
      case "CANCELLED":
        return "#F44336";
      case "FINISHED":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const getStatusText = (status: Event["status"]) => {
    switch (status) {
      case "SCHEDULED":
        return "Prévu";
      case "STARTED":
        return "En cours";
      case "CANCELLED":
        return "Annulé";
      case "FINISHED":
        return "Terminé";
      default:
        return status;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => onPress(event)}
      {...props}
    >
      <View style={styles.content}>
        {/* En-tête avec statut et date */}
        <View style={styles.header}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(event.status) },
            ]}
          >
            <ThemedText style={styles.statusText}>
              {getStatusText(event.status)}
            </ThemedText>
          </View>
          <ThemedText style={styles.date}>
            {formatDate(event.scheduledStart as unknown as number[])}
          </ThemedText>
        </View>

        {/* Titre de l'événement */}
        <ThemedText style={styles.name} numberOfLines={2}>
          {event.name}
        </ThemedText>

        {/* Adresse */}
        <View style={styles.addressContainer}>
          <MaterialIcons
            name="location-on"
            size={16}
            color="#fff"
            style={styles.icon}
          />
          <View style={styles.addressTextContainer}>
            <ThemedText style={styles.addressText} numberOfLines={2}>
              {event.address.street}
            </ThemedText>
            <ThemedText style={styles.addressText} numberOfLines={1}>
              {event.address.zipCode} {event.address.city},{" "}
              {event.address.country}
            </ThemedText>
          </View>
        </View>

        {/* Section bas avec participants et bouton */}
        <View style={styles.bottomContainer}>
          <View style={styles.participantsContainer}>
            <MaterialIcons
              name="people"
              size={18}
              color="#fff"
              style={styles.icon}
            />
            <ThemedText style={styles.participantsText}>
              {event.participants.length}
            </ThemedText>
          </View>
          <ClassicButton
            title="Participer"
            onPress={() => onPress(event)}
            style={styles.participateButton}
            backgroundColor="rgba(52, 152, 219, 0.8)"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  date: {
    color: "#fff",
    fontSize: 12,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 24,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 4,
  },
  addressText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
  },
  participantsText: {
    color: "#fff",
    fontSize: 14,
  },
  participateButton: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#2CD6F7",
  },
});

export default EventElement;
