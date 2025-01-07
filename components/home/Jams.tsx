import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import JamElement from "@/components/home/JamElement";

const Jams = ({jams, style}) => {
    return (
        <View style={[styles.content, style]}>
            <ThemedText style={styles.text}>Ecoutez un JAM</ThemedText>

            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
                {jams ? (
                    jams.map((jam, index) => (
                        <JamElement style={styles.jamElement}
                                    name={jam.name}
                                    key={index}
                                    image={jam.image}
                                    autheur={jam.autheur}
                                    heure={jam.heure}
                                    onPress={jam.onPress}
                        />

                    ))

                ) : (
                    <ThemedText style={styles.error}>Aucun Jam</ThemedText>
                )}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")} autheur={"toto"} heure={"19h00"}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")} autheur={"toto"} heure={"19h00"}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")} autheur={"toto"} heure={"19h00"}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")} autheur={"toto"} heure={"19h00"}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")} autheur={"toto"} heure={"19h00"}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
                {/*<JamElement  style={styles.jamElement} name={"test"} image={require("@/assets/images/music-exemple.png")}/>*/}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        alignItems: "flex-start",

    },
    text: {
        fontWeight: "600",
        fontSize: 18,
        textDecorationLine: "underline",
        marginBottom: 10,
        marginLeft: 10,
        fontFamily: "Jost",
    },
    scrollContainer: {
        flexDirection: "column", // Organisation en ligne
        flexWrap: "wrap", // Les éléments passent à la ligne automatiquement
        height: 200,
        justifyContent: "space-between", // Espacement entre les colonnes
        alignContent: "space-between",
    },
    jamElement: {
        marginBottom: 10, // Espacement vertical entre les éléments
        height: 55,
        // width: "30%", // Chaque élément prend environ un tiers de la largeur
    },
    error: {
        marginLeft: 150,
    }
});

export default Jams;
