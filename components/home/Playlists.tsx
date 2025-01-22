import React, {useCallback, memo} from "react";
import {View, StyleSheet, FlatList, ActivityIndicator} from "react-native";
import {useNavigation} from "@react-navigation/native";
import PlaylistElement from "@/components/home/PlaylistElement";
import {ThemedText} from "@/components/ThemedText";
import {Playlist} from "@/types/playlist.types";
import ClassicButton from "@/components/ClassicButton";
import {useRouter} from "expo-router";

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
    const router = useRouter();
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
        ({item: playlist}: { item: Playlist }) => (
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

    const handleNewPlaylist = useCallback(() => {
        router.push("/(details)/create-playlist");
    }, [router]);


    if (isLoading) {
        return (
            <View style={styles.container}>
                <ThemedText style={styles.title}>Playlists</ThemedText>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    if (error || !playlists?.length) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ThemedText style={styles.title}>Playlists</ThemedText>
                    <ClassicButton
                        style={styles.newPlaylistButton}
                        title="Générer une playlist"
                        onPress={handleNewPlaylist}
                    />
                </View>

                <ThemedText style={styles.error}>
                    {error ? error.message : "Aucune playlist"}
                </ThemedText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.title}>Playlists frf</ThemedText>
                <ClassicButton style={styles.newPlaylistButton} title="Générer une playlist"
                               onPress={handleNewPlaylist}/>
            </View>
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
        fontSize: 18,
        color: "white",
        textDecorationLine: "underline",
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
    newPlaylistButton: {
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 16,
    },
});


export default memo(Playlists);
