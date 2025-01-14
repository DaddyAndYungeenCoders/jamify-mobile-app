import React, { useCallback, memo } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlaylistElement from "@/components/home/PlaylistElement";
import { ThemedText } from "@/components/ThemedText";
import { Playlist } from "@/types/playlist.types";

interface PlaylistsProps {
  playlists: Playlist[];
  isLoading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onPlaylistPress?: (playlist: Playlist) => void;
}

const MemoizedPlaylistElement = memo(
  ({
    playlist,
    onPress,
  }: {
    playlist: Playlist;
    onPress: (playlist: Playlist) => void;
  }) => (
    <PlaylistElement
      name={playlist.name}
      image={playlist.image}
      onPress={() => onPress(playlist)}
    />
  ),
);

const Playlists: React.FC<PlaylistsProps> = ({
  playlists,
  isLoading = false,
  error = null,
  onPlaylistPress,
}) => {
  const navigation = useNavigation();

  const handlePlaylistPress = useCallback(
    (playlist: Playlist) => {
      if (onPlaylistPress) {
        onPlaylistPress(playlist);
      } else {
        //      navigation.navigate('PlaylistDetail' as never, { playlistId: playlist.id } as never);
      }
    },
    [navigation, onPlaylistPress],
  );

  const renderItem = useCallback(
    ({ item: playlist }: { item: Playlist }) => (
      <MemoizedPlaylistElement
        playlist={playlist}
        onPress={handlePlaylistPress}
      />
    ),
    [handlePlaylistPress],
  );

  const keyExtractor = useCallback(
    (item: Playlist, key: number) =>
      key.toString() + item.id.toString() + item.name,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Playlists</ThemedText>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !playlists?.length) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Playlists</ThemedText>
        <ThemedText style={styles.error}>
          {error ? error.message : "Aucune playlist"}
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Playlists</ThemedText>
      <FlatList
        horizontal
        data={playlists}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    textDecorationLine: "underline",
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: "Jost_600SemiBold",
  },
  flatList: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  error: {
    marginLeft: 100,
  },
});

export default memo(Playlists);
