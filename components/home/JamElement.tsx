import React from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Jam, JamStatus} from "@/types/jam.types";
import {useRouter} from "expo-router";
import Badge from "@/components/Badge";

const JamElement = ({ jam }) => {
    const router = useRouter();
    const showDetail = async (jam: Jam) => {
        // console.log("[JamElement]" + JSON.stringify(jam.status))
        router.push({
            pathname: "/(details)/jam-detail",
            params: {jamId: jam.id},
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
                        {/*<ThemedText style={[styles.text, styles.heure]}>{jam.status}</ThemedText>*/}
                        {jam.status === JamStatus.SCHEDULED ? (
                            <Badge
                                text="Planifié"
                                backgroundColor="rgba(34, 139, 34, 1)" // Vert foncé (succès, planifié)
                                borderColor="rgba(34, 139, 34, 0.5)"
                            />
                        ) : jam.status === JamStatus.CANCELED ? (
                            <Badge
                                text="Annulé"
                                backgroundColor="rgba(255, 69, 58, 1)" // Rouge vif (erreur, annulé)
                                borderColor="rgba(255, 69, 58, 0.5)"
                            />
                        ) : jam.status === JamStatus.RUNNING ? (
                            <Badge
                                text="En cours"
                                backgroundColor="rgba(30, 144, 255, 1)" // Bleu vif (activité en cours)
                                borderColor="rgba(30, 144, 255, 0.5)"
                            />
                        ) : jam.status === JamStatus.PAUSED ? (
                            <Badge
                                text="En pause"
                                backgroundColor="rgba(255, 165, 0, 1)" // Orange (pause)
                                borderColor="rgba(255, 165, 0, 0.5)"
                            />
                        ) : jam.status === JamStatus.STOPPED ? (
                            <Badge
                                text="Arrêté"
                                backgroundColor="rgba(128, 128, 128, 1)" // Gris (inactif)
                                borderColor="rgba(128, 128, 128, 0.5)"
                            />
                        ) : (
                            <Badge
                                text="Erreur"
                                backgroundColor="rgba(128, 0, 128, 1)" // Violet (erreur ou inconnu)
                                borderColor="rgba(128, 0, 128, 0.5)"
                            />
                        )}
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
        marginBottom: 10,
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
