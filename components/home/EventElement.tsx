import React, { useCallback } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Event } from "@/types/event.types";
import { useRouter } from "expo-router";
import Badge from "../Badge";
import { useUserStore } from "@/store/user.store";
import { User } from "@/types/user.types";
import { getStatusColors, getStatusText } from "@/utils/event.utils";
import DateDisplay from "../DateDisplay";

interface EventElementProps extends Omit<TouchableOpacityProps, "onPress"> {
  event: Event;
}

const EventElement: React.FC<EventElementProps> = ({ event, ...props }) => {
  const router = useRouter();
  const { getUser } = useUserStore();
  const myUser: User = getUser()!;

  const formatDate = (dateArray: number[]) => {
    if (!Array.isArray(dateArray) || dateArray.length < 5) {
      return "Date invalide";
    }

    const [year, month, day, hours, minutes] = dateArray;
    const date = new Date(year, month - 1, day, hours, minutes);

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const handleEventPress = useCallback(() => {
    router.push({
      pathname: "/(details)/event-detail",
      params: { eventId: JSON.stringify(event.id) },
    });
  }, [router]);
  const isCurrentUserMember: boolean = event.participants.some(
    (member) => member.email === myUser.email,
  );

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => handleEventPress()}
      {...props}
    >
      <View style={styles.content}>
        {/* En-tête avec statut et date */}
        <View style={styles.header}>
          <ThemedText style={styles.name} numberOfLines={2}>
            {event.name}
          </ThemedText>
          <DateDisplay
            dateArray={event.scheduledStart}
            backgroundColor="rgba(42, 42, 42, 0.9)"
            borderColor="rgba(255, 255, 255, 0.2)"
          />
        </View>

        {/* Titre de l'événement */}

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

          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Badge
              text={getStatusText(event.status)}
              backgroundColor={getStatusColors(event.status).background}
              borderColor={getStatusColors(event.status).border}
            />
            {isCurrentUserMember && (
              <Badge
                text="membre"
                backgroundColor="rgba(14, 128, 86,1)"
                borderColor="rgba(6, 64, 43,0.5)"
              />
            )}

            {!isCurrentUserMember && (
              <Badge
                text="pas membre"
                backgroundColor="rgba(161, 20, 18,1)"
                borderColor="rgba(128, 16, 14,0.5)"
              />
            )}
          </View>
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
    //backgroundColor: "#2a2a2a",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
