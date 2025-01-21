import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Jam} from "@/types/jam.types";
import {useRouter} from "expo-router";

const JamElement = ({ jam, token }) => {
    const router = useRouter();
    const showDetail = async (jam: Jam) => {
        // console.log("[JamElement]" + JSON.stringify(jam.status))
        router.push({
            pathname: "/(details)/jam-detail",
            params: {token, jamId: jam.id},
        })
    };
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => showDetail(jam)}>
            <View style={styles.background} />

            <View style={styles.content}>
                <Image source={{uri: jam.host.imgUrl}} style={styles.image} />
                <View style={styles.info}>
                    <ThemedText style={styles.text}>{jam.name}</ThemedText>
                    <View style={styles.detail}>
                        <ThemedText style={styles.text}>par {jam.host.name.split(' ')[0]}</ThemedText>
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
        marginLeft: 5,
    },
    heure: {
        flex: 1,
        textAlign: "right",
        marginRight : 5,
    },
});

export default JamElement;
