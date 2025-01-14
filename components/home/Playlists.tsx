import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PlaylistElement from "@/components/home/PlaylistElement";
import { ThemedText } from "@/components/ThemedText";
import { Playlist } from "@/types/playlist.types";

interface PlaylistsProps {
  playlists: Playlist[];
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {
  return (
    <View style={styles.content}>
      <ThemedText style={styles.text}>Playlists</ThemedText>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {playlists ? (
          playlists.map((playlist: Playlist, index: number) => (
            <PlaylistElement
              key={index}
              name={playlist.name}
              image={playlist.image}
              onPress={() => {}}
            />
          ))
        ) : (
          <ThemedText style={styles.error}>Aucune playlist</ThemedText>
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
    fontFamily: "Jost_600SemiBold",
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  error: {
    marginLeft: 100,
  },
});

export default Playlists;
