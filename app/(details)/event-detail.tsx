import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Event } from "@/types/event.types";
import { eventService } from "@/services/event.service";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Button from "@/components/Button";
import { useRefreshStore } from "@/store/refresh.store";
import { useUserStore } from "@/store/user.store";
import { User } from "@/types/user.types";
import { getStatusColors, getStatusText } from "@/utils/event.utils";
import Badge from "@/components/Badge";
import DateDisplay from "@/components/DateDisplay";

const EventDetail: React.FC = () => {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);
  const { getUser } = useUserStore();
  const myUser: User = getUser()!;
  const userEmail = myUser.email;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      centerComponent: (
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
            Event Detail
          </Text>
        </View>
      ),
    });
  }, []); // Dépendances vides car nous ne voulons l'exécuter qu'une fois
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const parsedId = parseInt(eventId as string);
        const eventData = await eventService.getEventById(parsedId);
        setEvent(eventData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Une erreur est survenue"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

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

  const isUserParticipating = () => {
    return (
      event?.participants.some(
        (participant) => participant.email === userEmail,
      ) || false
    );
  };

  const handleJoinEvent = async () => {
    if (!event) return;

    try {
      setIsJoining(true);
      await eventService.joinEvent(event.id);
      setResponseStatus(200);
      triggerRefresh();

      // Rafraîchir les détails de l'événement
      const updatedEvent = await eventService.getEventById(event.id);
      setEvent(updatedEvent);

      setTimeout(() => {
        setResponseStatus(null);
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de la participation:", error);
      setResponseStatus(500);
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2CD6F7" />
        <ThemedText style={styles.loadingText}>
          Chargement des détails de l'événement...
        </ThemedText>
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          {error
            ? error.message
            : "Impossible de charger les détails de l'événement"}
        </ThemedText>
      </View>
    );
  }

  const canJoin = event.status === "SCHEDULED" && !isUserParticipating();

  function getFirstAndMiddleLetter(str: string): string {
    if (str.length === 0) return "";

    const firstLetter = str[0];
    const middleIndex = Math.floor(str.length / 2);
    const middleLetter = str[middleIndex];

    return firstLetter + middleLetter;
  }

  const isCurrentUserMember: boolean = event.participants.some(
    (member) => member.email === myUser.email,
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* En-tête avec statut et date */}

        {/* Titre de l'événement */}
        <ThemedText style={styles.title}>{event.name}</ThemedText>

        {/* Adresse */}
        <View style={styles.addressContainer}>
          <MaterialIcons
            name="location-on"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <View style={styles.addressTextContainer}>
            <ThemedText style={styles.addressText}>
              {event.address.street}
            </ThemedText>
            <ThemedText style={styles.addressText}>
              {event.address.zipCode} {event.address.city},{" "}
              {event.address.country}
            </ThemedText>
          </View>
        </View>
        <View style={styles.header}>
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

            <DateDisplay
              dateArray={event.scheduledStart}
              backgroundColor="rgba(42, 42, 42, 0.9)"
              borderColor="rgba(255, 255, 255, 0.2)"
            />
          </View>
          {/*<ThemedText style={styles.date}>
            {formatDate(event.scheduledStart)}
          </ThemedText>
          */}
        </View>

        {/* Section participants */}
        <View style={styles.participantsSection}>
          <View style={styles.participantsHeader}>
            <MaterialIcons
              name="people"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <ThemedText style={styles.participantsTitle}>
              Participants ({event.participants.length})
            </ThemedText>
          </View>
          <View style={styles.participantsList}>
            {event.participants.map((participant, index) => (
              <View key={index} style={styles.participantItem}>
                <View style={styles.avatar}>
                  {participant.profilePicture ? (
                    <Image
                      source={{ uri: participant.profilePicture }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Text style={styles.text}>
                      {getFirstAndMiddleLetter(
                        participant?.username || "",
                      ).toUpperCase()}
                    </Text>
                  )}
                </View>
                <View style={styles.participantInfo}>
                  <ThemedText style={styles.participantName}>
                    {participant.username}
                  </ThemedText>
                  <ThemedText style={styles.participantEmail}>
                    {participant.email}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bouton Participer */}
        <View style={styles.actionContainer}>
          <Button
            label={isUserParticipating() ? "Déjà participant" : "Participer"}
            onPress={handleJoinEvent}
            disabled={!canJoin}
            loading={isJoining}
            responseStatus={responseStatus}
            successMessage="Participation confirmée !"
            errorMessage="Erreur lors de la participation"
            containerStyle={styles.submitButton}
            colors={{
              base: !canJoin ? "grey" : "#3498db",
              pressed: "#2980b9",
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2a2a2a",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#ff4444",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    color: "#fff",
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  addressTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  addressText: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.9,
    lineHeight: 24,
  },
  participantsSection: {
    marginBottom: 30,
  },
  participantsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 10,
  },
  participantsList: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  defaultProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#2CD6F7",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  participantInfo: {
    marginLeft: 15,
    flex: 1,
  },
  participantName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  participantEmail: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  actionContainer: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },

  text: {
    color: "white",
    fontFamily: "Jost_600SemiBold",
    fontSize: 24,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default EventDetail;
