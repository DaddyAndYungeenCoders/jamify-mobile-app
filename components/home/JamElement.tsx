import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

const JamElement = ({ jam, style }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={jam.onPress}>
            <View style={styles.background} />

            <View style={styles.content}>
                <Image source={jam.background} style={styles.image} />
                <View style={styles.info}>
                    <ThemedText style={styles.text}>{jam.name}</ThemedText>
                    <View style={styles.detail}>
                        <ThemedText style={styles.text}>par {jam.host.name}</ThemedText>
                        <ThemedText style={[styles.text, styles.heure]}>{jam.status}</ThemedText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 55,
        marginLeft: 20,
    },
    info: {
        flexDirection: "column",
        flex: 1,
    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#6e6c6c",
        borderRadius: 10,
        opacity: 0.3,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        resizeMode: "contain",
        width: 50,
        height: 50,
        borderRadius: 10,
        marginLeft: 1,
    },
    text: {
        color: "#fff",
        fontSize: 14,
        marginLeft: 10,
    },
    heure: {
        flex: 1,
        textAlign: "right",
        marginRight : 10,
    },
});

export default JamElement;
