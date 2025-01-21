import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View,} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import JamService from "@/service/jam-service";
import {RouteProp, useRoute} from "@react-navigation/native";
import {ThemedView} from "@/components/ThemedView";
import {Jam} from "@/types/jam.types";
import JamDisplay from "@/components/JamDisplay";

const [refreshToken, setRefreshToken] = useState(0);

type JamDetailRouteProp = RouteProp<{
    JamDetail: { token: string, jamId: number };
}, "JamDetail">;

const JamDetail: React.FC = () => {
    const route = useRoute<JamDetailRouteProp>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    // const [jam, setJam] = useState<Jam>();

    const jamId = route.params.jamId;
    const token = route.params.token


    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         setJam(await JamService.getJamById(token, jamId));
        //     } catch (error) {
        //         console.error("Erreur lors du chargement des données:", error);
        //     }
        // };
        // fetchData().then(() => {
        // });
            setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <ThemedText style={styles.loadingText}>
                    Chargement de la page...
                </ThemedText>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>
                    {error?.message || "Une erreur est survenue"}
                </ThemedText>
            </View>
        );
    }

    return (
        <ScrollView>
            <ThemedView style={styles.banner}>
                <ThemedText style={styles.titles}>Now Playing</ThemedText>
            </ThemedView>
            <View style={styles.body}>
                <JamDisplay jamId={jamId} token={token} />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        color: "red",
    },
    contentContainer: {
        padding: 20,
    },
    banner: {
        position: "absolute", // Permet de placer le bandeau
        top: 40, // Espacement depuis le haut (ajustez selon vos besoins)
        width: "100%", // S'étend sur toute la largeur de l'écran
        backgroundColor: "#888888", // Couleur gris clair
        paddingVertical: 10, // Espacement vertical autour du texte
        alignItems: "center", // Centre le texte horizontalement
        opacity: 0.7,
    },
    titles: {
        fontSize: 24, // Taille du texte
        fontFamily: "Jost",
        color: "#fff", // Couleur du texte noir
    },
    body: {
        top: 100
    }
});

export default JamDetail;
