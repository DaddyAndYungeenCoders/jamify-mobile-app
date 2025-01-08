import React, {useEffect, useState} from "react";
import {Alert, Image, StyleSheet, View} from "react-native";
import {musicDisplayProps} from "@/types/music-display.types";
import {ThemedText} from "@/components/ThemedText";
import * as Progress from "react-native-progress";
import JamerDisplay from "@/components/JamerDisplay";
import ClassicButton from "@/components/ClassicButton";
import {JamerDisplayProps} from "@/types/jamer-display.types";
import {IconSymbol} from "@/components/ui/IconSymbol";
import Icon from "react-native-vector-icons/FontAwesome";

const MusicDisplay = ({
                          title,
                          image,
                          artist,
                          description,
                          duration, // Durée totale de la musique en secondes
                          lcurrentTime,
                      }: musicDisplayProps) => {

    const [currentTime, setCurrentTime] = useState(lcurrentTime ? lcurrentTime : 0); // Temps écoulé en secondes

    // Simuler la progression (pour tester)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime((prev) => (prev < duration ? prev + 1 : prev)); // Augmente le temps écoulé
        }, 1000);

        return () => clearInterval(interval); // Nettoyer l'intervalle
    }, [duration]);

    // Formater le temps en "mm:ss"
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const [jamer, setJamer] : JamerDisplayProps = useState(null)
    const [playing, setPlaying] : boolean = useState(false)

function creerUnJam() {
    Alert.alert("Jam créé");
    setJamer({
        name: "Marcel",
        image: require('@/assets/images/jamer-exemple.png'),
        listening: 15
    })
}

return (
        <View style={styles.body}>
            {/* Image de la musique */}
            <Image source={image} style={styles.images}/>

            {/* Bannière contenant le titre et la barre de progression */}
            <View style={styles.banner}>
                <ThemedText style={styles.title}>{title}</ThemedText>
                <ThemedText>{artist}</ThemedText>
                {/*<Image*/}
                {/*    style={styles.playButton}*/}
                {/*    source={playButtonImage.play}/>*/}
                {playing ? (
                    <ClassicButton title={""} onPress={() => {setPlaying(false)}} style={styles.playButton} logo={"pause"} logoSize={15}/>
                ):(
                    <ClassicButton title={""} onPress={() => {setPlaying(true)}} style={styles.playButton} logo={"play"}/>
                    // <IconSymbol name={"play"} color={"white"}/>
                    // <IconSymbol size={28} onPress={() => {setPlaying(true)}} name="playing.fill" />
                )}
                <View style={styles.progressSection}>
                    {/* Temps actuel et durée totale */}
                    <ThemedText style={styles.time}>{formatTime(currentTime)}</ThemedText>
                    <Progress.Bar
                        progress={currentTime / duration} // Progression basée sur le temps écoulé
                        width={null}
                        height={10}
                        color="#3498db"
                        unfilledColor="#d3d3d3"
                        borderWidth={0}
                        borderRadius={5}
                        style={styles.progressBar}
                    />
                    <ThemedText style={styles.time}>{formatTime(duration)}</ThemedText>
                </View>


            </View>
            <View style={styles.banner}>
                {jamer ? (
                        <JamerDisplay Name={jamer.name} image={jamer.image} listening={jamer.listening}/>

                    ) : (
                    <ClassicButton title={"Créer un JAM"} onPress={creerUnJam}
                    width={"100%"}
                    />
                )
                }
            </View>

            {/* Description */}
            <ThemedText style={styles.description}>{description}</ThemedText>
        </View>
    );
};

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

export default MusicDisplay;
