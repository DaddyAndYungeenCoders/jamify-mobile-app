import { ScrollView, StyleSheet, Alert } from "react-native"; // Ajout de Alert
import ProfilHeader from "@/components/header/Profil-Header";
import Playlists from "@/components/home/Playlists";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";
import { useCallback, useEffect, useState } from "react";
import EventService from "@/service/EventService";
import PlaylistService from "@/service/PlaylistService";
import JamService from "@/service/JamService";
import { Playlist } from "@/types/playlist.types";
import { Jam } from "@/types/jam.types";
import { Event } from "@/types/event.types";

export default function HomeScreen() {
  const handlePress = () => {
    Alert.alert("Bouton Pressé", "Vous avez cliqué sur le bouton!");
  };

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [jams, setJams] = useState<Jam[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, playlistsData, jamsData] = await Promise.all([
          EventService.getEvents(),
          PlaylistService.getPlaylists(),
          JamService.getJams(),
        ]);

        setEvents(eventsData);
        setPlaylists(playlistsData);
        setJams(jamsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRefresh = useCallback(async () => {
    try {
      setError(null);
      const newPlaylists = await PlaylistService.getPlaylists();
      setPlaylists(newPlaylists);
    } catch (err) {
      setError(err as Error);
    }
  }, []);

  const handlePlaylistPress = useCallback((playlist: Playlist) => {
    // Logique personnalisée pour la gestion des clics sur les playlists
    console.log("Playlist sélectionnée:", playlist.id);
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <ScrollView
        style={styles.front}
        contentContainerStyle={{
          rowGap: 30,
        }}
      >
        <ProfilHeader
          name={"TOTO"}
          image={require("@/assets/images/jamer-exemple.png")}
          onPress={() => {}}
        />
        <Playlists
          playlists={playlists}
          isLoading={isLoading}
          error={error}
          onRefresh={handleRefresh}
          onPlaylistPress={handlePlaylistPress}
        />
        <Jams jams={jams} />
        <Events events={events} />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  profilHeader: {},
  front: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});
