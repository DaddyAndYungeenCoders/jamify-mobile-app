import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RouteProp, useRoute } from "@react-navigation/native";
import JamerDisplay from "@/components/JamerDisplay";
import { Jam, JamStatus } from "@/types/jam.types";
import { User } from "@/types/user.types";
import { jamService } from "@/services/jam.service";
import { userService } from "@/services/user.service";
import Badge from "@/components/Badge";
import Participants from "@/components/Participants";
import Button from "@/components/Button";
import { useNavigation } from "expo-router";
import CircularLoader from "@/components/CircularLoading";

type JamDetailRouteProp = RouteProp<
  {
    JamDetail: { token: string; jamId: number };
  },
  "JamDetail"
>;

const JamDetail: React.FC = () => {
  const route = useRoute<JamDetailRouteProp>();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [jam, setJam] = useState<Jam | undefined>();
  const [me, setMe] = useState<User | undefined>();
  const [playing, setPlaying] = useState<boolean>(false);

  const jamId = route.params.jamId;
  const token = route.params.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const jamData = await jamService.getById(jamId);
        const userData = await userService.getCurrentUser();
        setJam(jamData);
        setMe(userData);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Une erreur est survenue"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jamId]);

  useEffect(() => {
    navigation.setOptions({
      centerComponent: (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Jam Detail</Text>
        </View>
      ),
    });
  }, [navigation]);

  const handlePlay = async () => {
    try {
      setPlaying(true);
      const success = await jamService.playAsHost();
      if (!success) {
        setError(new Error("Impossible de démarrer la lecture"));
        setPlaying(false);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Erreur lors de la lecture"),
      );
      setPlaying(false);
    }
  };

  const handleStop = async () => {
    setPlaying(false);
    // Ici vous pourriez ajouter une fonction pour arrêter la lecture si nécessaire
  };

  const join = async () => {
    if (jam?.id) {
      setIsLoading(true);
      try {
        await jamService.join(jam.id);
        // Rafraîchir les données après avoir rejoint
        const updatedJam = await jamService.getById(jamId);
        setJam(updatedJam);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("Erreur lors de la jointure du JAM"),
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const close = async () => {
    if (jam?.id) {
      setIsLoading(true);
      try {
        await jamService.stop(jam.id);
        const updatedJam = await jamService.getById(jamId);
        setJam(updatedJam);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("Erreur lors de la fermeture du JAM"),
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const leave = async () => {
    if (jam?.id) {
      setIsLoading(true);
      try {
        await jamService.leave(jam.id);
        const updatedJam = await jamService.getById(jamId);
        setJam(updatedJam);
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("Erreur lors du départ du JAM"),
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CircularLoader />
        <ThemedText style={styles.loadingText}>
          Chargement de la page...
        </ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error.message}</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.body}>
        {jam ? (
          <View>
            <ThemedText style={styles.title}>{jam.name}</ThemedText>
            <View style={styles.details}>
              <View style={styles.jamDetails}>
                <Badge
                  text={
                    jam.status === JamStatus.SCHEDULED
                      ? "Planifié"
                      : jam.status === JamStatus.CANCELED
                        ? "Annulé"
                        : jam.status === JamStatus.RUNNING
                          ? "En cours"
                          : jam.status === JamStatus.PAUSED
                            ? "En pause"
                            : jam.status === JamStatus.STOPPED
                              ? "Arrêté"
                              : "Erreur"
                  }
                  backgroundColor={
                    jam.status === JamStatus.SCHEDULED
                      ? "rgba(34, 139, 34, 1)"
                      : jam.status === JamStatus.CANCELED
                        ? "rgba(255, 69, 58, 1)"
                        : jam.status === JamStatus.RUNNING
                          ? "rgba(30, 144, 255, 1)"
                          : jam.status === JamStatus.PAUSED
                            ? "rgba(255, 165, 0, 1)"
                            : jam.status === JamStatus.STOPPED
                              ? "rgba(128, 128, 128, 1)"
                              : "rgba(128, 0, 128, 1)"
                  }
                  borderColor={
                    jam.status === JamStatus.SCHEDULED
                      ? "rgba(34, 139, 34, 0.5)"
                      : jam.status === JamStatus.CANCELED
                        ? "rgba(255, 69, 58, 0.5)"
                        : jam.status === JamStatus.RUNNING
                          ? "rgba(30, 144, 255, 0.5)"
                          : jam.status === JamStatus.PAUSED
                            ? "rgba(255, 165, 0, 0.5)"
                            : jam.status === JamStatus.STOPPED
                              ? "rgba(128, 128, 128, 0.5)"
                              : "rgba(128, 0, 128, 0.5)"
                  }
                />
              </View>
              <View style={styles.themesContainer}>
                {jam.themes?.length > 0 ? (
                  jam.themes.map((theme, index) => (
                    <Badge
                      key={index}
                      text={theme}
                      backgroundColor="rgba(128, 0, 128, 1)"
                      borderColor="rgba(128, 16, 14, 0.5)"
                      style={styles.themeBadge}
                    />
                  ))
                ) : (
                  <ThemedText>Aucun Thème</ThemedText>
                )}
              </View>
            </View>

            <View style={styles.banner}>
              <JamerDisplay
                name={jam.host.name}
                image={jam.host.imgUrl}
                listening={jam.participants.length}
              />
            </View>
            <View style={styles.actionButton}>
              {me?.name === jam.host.name && (
                <Button
                  onPress={playing ? handleStop : handlePlay}
                  loading={playing}
                  label={playing ? "Stop" : "Play"}
                  /*
                leftIcon={
                  playing
                    ? require("../../assets/images/music-logos/pause.png")
                    : require("../../assets/images/music-logos/play.png")
                }
                */
                  colors={{
                    base: "#1DB954",
                    pressed: "#1ed760",
                  }}
                  size="medium"
                />
              )}
              {me?.name === jam.host.name ? (
                <Button
                  onPress={close}
                  label="Fermer le JAM"
                  /*
                  leftIcon={require("../../assets/images/icons/close.png")}

                */
                  colors={{
                    base: "#FF4B4B",
                    pressed: "#FF6B6B",
                  }}
                  size="medium"
                />
              ) : jam.participants.some(
                  (participant) => participant.name === me?.name,
                ) ? (
                <Button
                  onPress={leave}
                  label="Quitter le JAM"
                  /*
                  leftIcon={require("../../assets/images/icons/exit.png")}

                */
                  colors={{
                    base: "#FF9500",
                    pressed: "#FFB040",
                  }}
                  size="medium"
                />
              ) : (
                <Button
                  onPress={join}
                  label="Rejoindre le JAM"
                  /*
                  leftIcon={require("../../assets/images/icons/join.png")}

                */
                  colors={{
                    base: "#007AFF",
                    pressed: "#409CFF",
                  }}
                  size="medium"
                />
              )}
            </View>
            <View style={styles.participants}>
              <Participants users={jam.participants} />
            </View>
          </View>
        ) : (
          <ThemedText>Pas de Jam</ThemedText>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Jost_600SemiBold",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
  banner: {
    marginTop: 20,
    backgroundColor: "#3f3d3d",
    width: "100%",
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  actionButton: {
    margin: 15,
    gap: 10,
  },
  participants: {},
  details: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  jamDetails: {
    flex: 2,
    justifyContent: "flex-start",
  },
  themesContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    maxWidth: "60%",
    flexWrap: "wrap",
  },
  themeBadge: {
    margin: 5,
  },
});

export default JamDetail;
