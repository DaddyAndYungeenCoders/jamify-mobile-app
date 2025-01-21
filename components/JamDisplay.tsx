import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import JamerDisplay from "@/components/JamerDisplay";
import ClassicButton from "@/components/ClassicButton";
import {JamerDisplayProps} from "@/types/jamer-display.types";
import {Jam} from "@/types/jam.types";
import ParticipantDisplay from "@/components/ParticipantDisplay";
import UserService from "@/service/user-service";
import {User} from "@/types/user.types";
import JamService from "@/service/jam-service";


const JamDisplay = ({
                        jamId, token
                    }: number, string) => {

        const [jamer, setJamer]: JamerDisplayProps = useState(null);
        const [playing, setPlaying]: boolean = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [jam, setJam] = useState<Jam>();
        let [me, setMe]: User = useState();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    setJam(await JamService.getJamById(token, jamId));
                    setMe(await UserService.whoAmi(token));

                } catch (error) {
                    console.error("Erreur lors du chargement des données:", error);
                }
            };

            fetchData().then(() => {
                setIsLoading(false)
            });
        }, [isLoading]);

        const join = async () => {
            JamService.join(token, jam);
            setIsLoading(true)
        };

        const close = async () => {
            JamService.stop(token, jam);
            setIsLoading(true)
        }

        const leave = async () => {
            JamService.leave(token, jam);
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
                        <ThemedText>{jam.status}</ThemedText>
                        <ThemedText>Thèmes : {jam.themes.join(", ")}</ThemedText>
                        {/*<ThemedText>{jam.messages}</ThemedText>*/}
                        <ThemedText>{jam.scheduledDate}</ThemedText>
                        <View style={styles.banner}>
                            <JamerDisplay name={jam.host.name} image={jam.host.imgUrl}
                                          listening={jam.participants.length}/>
                        </View>
                        {
                            jam.participants?.length > 0 ? (
                                jam.participants.map((participant, index) => (
                                    <ParticipantDisplay key={index} user={participant} />
                                ))
                            ) : (
                                <ThemedText>Aucun participant</ThemedText>
                            )
                        }
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    progressSection: {
        flexDirection: "row", // Aligne les enfants horizontalement
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },
    progressBar: {
        flex: 1, // Permet à la barre de prendre l'espace restant
        marginHorizontal: 10, // Espacement entre les temps et la barre
    },
    time: {
        fontSize: 14,
        color: "#fff",
    },
    description: {
        marginTop: 20,
        fontSize: 16,
        textAlign: "center",
        color: "#777",
    },
    playButton: {
        // marginTop: 10,
        // width: 20,
        // height: 20,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default JamDisplay;
