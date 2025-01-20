import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { Event } from "@/types/event.types";

type EventDetailRouteProp = RouteProp<
  {
    EventDetail: { eventId: string };
  },
  "EventDetail"
>;

const EventDetail: React.FC = () => {
  const route = useRoute<EventDetailRouteProp>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        // Ici, vous devrez implémenter la logique pour récupérer les détails de l'événement
        // en utilisant route.params.eventId
        // Par exemple :
        // const response = await api.getEventDetails(route.params.eventId);
        // setEvent(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Une erreur est survenue"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [route.params.eventId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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

  return (
    <ScrollView style={styles.container}>
      {event.image && (
        <Image
          source={{ uri: event.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>{event.name}</ThemedText>
        <ThemedText style={styles.date}>
          {new Date(event.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </ThemedText>
        <ThemedText style={styles.location}>{event.location}</ThemedText>
        <ThemedText style={styles.description}>{event.description}</ThemedText>

        {/* Vous pouvez ajouter d'autres sections ici selon vos besoins */}
        {event.price && (
          <View style={styles.priceContainer}>
            <ThemedText style={styles.priceLabel}>Prix :</ThemedText>
            <ThemedText style={styles.priceValue}>{event.price} €</ThemedText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Jost_600SemiBold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 8,
    color: "#666",
  },
  location: {
    fontSize: 16,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  priceValue: {
    fontSize: 18,
    fontFamily: "Jost_600SemiBold",
  },
});

export default EventDetail;
