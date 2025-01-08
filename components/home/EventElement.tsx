import React from "react";
import {TouchableOpacity, StyleSheet, View, Image, Text} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import ClassicButton from "@/components/ClassicButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const EventElement = ({name, onPress, image, style, date, description, participants}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {/* Image de l'événement */}
            <Image source={image} style={styles.image}/>

            {/* Conteneur d'informations superposé */}
            <View style={styles.overlay}>
                {/* Date en haut à gauche */}
                <ThemedText style={styles.date}>{date}</ThemedText>

                {/* Bouton "Participer" en haut à droite */}
                <View style={styles.participateBack}/>
                <ClassicButton title={"Participer"} onPress={onPress} style={styles.participateButton} backgroundColor={"none"}/>

                {/* Nom en bas */}
                <View style={styles.bottomContainer}>
                    <ThemedText style={styles.name}>{name}</ThemedText>

                    {/* Nombre de participants */}
                    <View style={styles.participantsContainer}>
                        <MaterialIcons name="people-outline" size={15} color="white" style={styles.participantIcon}/>
                        <ThemedText style={styles.participantsText}>{participants}</ThemedText>
                    </View>
                </View>

                {/* Description sous le nom */}
                <ThemedText style={styles.description}>{description}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 260,
        height: 207,
        marginLeft: 20,
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 10,
        justifyContent: "space-between", // Espace entre les sections haut et bas
    },
    date: {
        position: "absolute",
        top: 10,
        left: 10,
        color: "#fff",
        fontSize: 12,
        padding: 5,
        borderRadius: 5,
    },
    participateButton: {
        position: "absolute",
        right: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        height: 30,
        width: 100,
    },
    participateBack: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#3498db",  // Fond du bouton avec opacité
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        height: 30,
        width: 100,
        opacity: 0.7,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    name: {
        top: 100,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    participantsContainer: {
        top: 100,
        flexDirection: "row",
        alignItems: "center",
    },
    participantIcon: {
        width: 16,
        height: 16,
        marginRight: 5,
    },
    participantsText: {
        color: "#fff",
        fontSize: 14,
    },
    description: {
        color: "#fff",
        fontSize: 12,
        padding: 5,
        borderRadius: 5,
    },
});

export default EventElement;
