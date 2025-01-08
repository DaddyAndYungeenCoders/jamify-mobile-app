import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const PlaylistElement = ({ name, onPress, image, style }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View style={styles.background} />

            <View style={styles.content}>
                <Image source={image} style={styles.image} />
                <ThemedText style={styles.text}>{name}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 121,
        height: 137,
        marginLeft: 20,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#6e6c6c",
        borderRadius: 10,
        opacity: 0.3,
    },
    content: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        resizeMode: "contain",
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    text: {
        color: "#fff", // Couleur du texte
        fontSize: 14,
        textAlign: "center",
    },
});

export default PlaylistElement;
