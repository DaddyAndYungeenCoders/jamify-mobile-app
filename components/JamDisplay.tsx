import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import JamerDisplay from "@/components/JamerDisplay";
import ClassicButton from "@/components/ClassicButton";
import {JamerDisplayProps} from "@/types/jamer-display.types";
import {Jam, JamStatus} from "@/types/jam.types";
import ParticipantDisplay from "@/components/ParticipantDisplay";
import {User} from "@/types/user.types";
import {jamService} from "@/services/jam.service";
import {userService} from "@/services/user.service";
import Badge from "@/components/Badge";


const JamDisplay = ({
                        jamId
                    }: number) => {

        const [jamer, setJamer]: JamerDisplayProps = useState(null);
        const [playing, setPlaying]: boolean = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [jam, setJam] = useState<Jam>();
        let [me, setMe]: User = useState();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    setJam(await jamService.getById(jamId));
                    setMe(await userService.getCurrentUser());

                } catch (error) {
                    console.error("Erreur lors du chargement des données:", error);
                }
            };

            fetchData().then(() => {
                setIsLoading(false)
            });
        }, [isLoading]);

        const join = async () => {
            if ("id" in jam) {
                await jamService.join(jam.id);
            }
            setIsLoading(true)
        };

        const close = async () => {
            if ("id" in jam) {
                await jamService.stop(jam.id);
            }
            setIsLoading(true)
        }

        const leave = async () => {
            if ("id" in jam) {
                await jamService.leave(jam.id);
            }
            setIsLoading(true)
        }
        // console.log(token);
        // console.log(JSON.stringify(jam.participants))


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

        return (
            <View style={styles.body}>

                {jam ? (
                    <View>

                        <ThemedText style={styles.title}>{jam.name}</ThemedText>
                        <View style={styles.details}>
                            <View style={styles.jamDetails}>
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
                            <View style={styles.themesContainer}>
                                {jam.themes?.length > 0 ? (
                                    jam.themes.map((theme, index) => (
                                        <Badge
                                            key={index}
                                            text={theme}
                                            backgroundColor="rgba(128, 0, 128, 1)"
                                            borderColor="rgba(128, 16, 14, 0.5)"
                                            style={styles.themeBadge}
                                        />
                                    ))
                                ) : (
                                    <ThemedText>Aucun Thème</ThemedText>
                                )}
                            </View>
                        </View>

                        {/*<ThemedText>{jam.messages}</ThemedText>*/}
                        {/*<ThemedText>{jam.scheduledDate}</ThemedText>*/}
                        <View style={styles.banner}>
                            <JamerDisplay name={jam.host.name} image={jam.host.imgUrl}
                                          listening={jam.participants.length}/>
                        </View>
                        <View style={styles.actionButton}>
                            {
                                me?.name === jam.host.name ? (
                                    <ClassicButton title={"Fermer le JAM"} onPress={close}/>
                                ) : jam.participants.some((participant) => participant.name === me?.name) ? (
                                    <ClassicButton title={"Quitter le JAM"} onPress={leave}/>
                                ) : (
                                    <ClassicButton title={"Rejoindre le JAM"} onPress={join}/>
                                )
                            }
                        </View>
                        <View style={styles.participants}>

                            {
                                jam.participants?.length > 0 ? (
                                    jam.participants.map((participant, index) => (
                                        <ParticipantDisplay key={index} user={participant}/>
                                    ))
                                ) : (
                                    <ThemedText>Aucun participant</ThemedText>
                                )
                            }
                        </View>
                    </View>

                ) : (
                    <ThemedText>Pas de Jam</ThemedText>
                )}

            </View>
        );
    }
;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    images: {
        width: 247,
        height: 247,
        borderRadius: 8,
        marginBottom: 20,
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
    banner: {
        marginTop: 20,
        backgroundColor: "#3f3d3d",
        width: "100%",
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    actionButton: {
        margin: 15,
    },
    participants: {},
    details: {
        flexDirection: "row",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    jamDetails: {
        flex: 2, // Prend plus d'espace à gauche
        justifyContent: "flex-start",
    },
    themesContainer: {
        alignSelf: "flex-end",
        flexDirection: "row",
        maxWidth: "60%",
        flexWrap: "wrap",
    },
    themeBadge: {
        margin: 5,
    },

});

export default JamDisplay;
