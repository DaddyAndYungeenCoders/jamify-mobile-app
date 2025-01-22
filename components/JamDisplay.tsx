import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import JamerDisplay from "@/components/JamerDisplay";
import ClassicButton from "@/components/ClassicButton";
import {JamerDisplayProps} from "@/types/jamer-display.types";
import {Jam} from "@/types/jam.types";
import ParticipantDisplay from "@/components/ParticipantDisplay";
import {User} from "@/types/user.types";
import {jamService} from "@/services/jam.service";
import {userService} from "@/services/user.service";


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
                        <ThemedText>Status : {jam.status}</ThemedText>
                        <ThemedText>Thèmes : {jam.themes.join(", ")}</ThemedText>
                        {/*<ThemedText>{jam.messages}</ThemedText>*/}
                        <ThemedText>{jam.scheduledDate}</ThemedText>
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
    participants: {

    }

});

export default JamDisplay;
