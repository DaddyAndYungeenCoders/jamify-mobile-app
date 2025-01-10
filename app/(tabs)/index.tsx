import { ScrollView, StyleSheet, Text, View } from "react-native";
import ProfilHeader from "@/components/header/Profil-Header";
import Playlists from "@/components/home/Playlists";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";
import { useEffect, useState } from "react";
import EventService from "@/service/EventService";
import PlaylistService from "@/service/PlaylistService";
import JamService from "@/service/JamService";

export default function HomeScreen() {
  const handlePress = () => {
    Alert.alert("Bouton Pressé", "Vous avez cliqué sur le bouton!");
  };

  const [playlists, setPlaylists] = useState([]);
  const [events, setEvents] = useState([]);
  const [jams, setJams] = useState([]);

  useEffect(() => {
    setEvents(EventService.getEvents());

    setPlaylists(PlaylistService.getPlaylists());

    setJams(JamService.getJams());
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
        <Playlists style={styles.playlist} playlists={playlists}></Playlists>
        <Jams jams={jams}></Jams>
        <Events events={events}></Events>
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
  playlist: {
    marginTop: 80,
    marginBottom: 20,
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
