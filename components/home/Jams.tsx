import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import JamElement from "@/components/home/JamElement";
import { Jam } from "@/types/jam.types";

interface JamProps {
  jams: Jam[];
}
const Jams: React.FC<JamProps> = ({ jams }) => {
  return (
    <View style={styles.content}>
      <ThemedText style={styles.text}>Ecoutez un JAM</ThemedText>

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {jams ? (
          jams.map((jam, index) => (
            <JamElement style={styles.jamElement} key={index} jam={jam} />
          ))
        ) : (
          <ThemedText style={styles.error}>Aucun Jam</ThemedText>
        )}
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
    marginLeft: 15,
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
  },
});

export default Jams;
