import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import PlaylistElement from "@/components/home/PlaylistElement";
import {ThemedText} from "@/components/ThemedText";

const Playlists = ({playlists, style}) => {
    return (
        <View style={[styles.content, style]}>
            <ThemedText style={styles.text}>Playlists</ThemedText>

            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
                {playlists ? (
                    playlists.map((playlist, index) => (

                        <PlaylistElement
                            key={index}
                            name={playlist.name}
                            image={playlist.background}
                        />
                    ))

                ) : (
                    <ThemedText style={styles.error}>Aucune playlist</ThemedText>
                )}
                {/*<PlaylistElement name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<PlaylistElement name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<PlaylistElement name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<PlaylistElement name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<PlaylistElement name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        alignItems: "flex-start",
        // marginTop: 100,
    },
    text: {
        fontWeight: "600",
        fontSize: 18,
        textDecorationLine: "underline",
        marginBottom: 10,
        marginLeft: 10,
        fontFamily: "Jost",
    },
    scrollContainer: {
        paddingHorizontal: 10,
    },
    error: {
        marginLeft: 100,
    }
});

export default Playlists;
