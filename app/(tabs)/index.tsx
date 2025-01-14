import { ScrollView, StyleSheet, Alert } from "react-native"; // Ajout de Alert
import ProfilHeader from "@/components/header/Profil-Header";
import Playlists from "@/components/home/Playlists";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";
import { useEffect, useState } from "react";
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <ScrollView style={styles.front}>
        <ProfilHeader
          name={"TOTO"}
          image={require("@/assets/images/jamer-exemple.png")}
          style={styles.profilHeader}
          onPress={handlePress}
        />
        <Playlists playlists={playlists} />
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
  profilHeader: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#6e6c6c",
    borderRadius: 10,
    opacity: 0.7,
    marginTop: 30,
    margin: 10,
  },
  front: {
    flex: 1,
  },
});
