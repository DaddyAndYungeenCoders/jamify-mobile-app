import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import * as Progress from "react-native-progress";
import {JamerDisplayProps} from "@/types/jamer-display.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const JamerDisplay = ({
                          name,
                          image,
                          listening,
                      }: JamerDisplayProps) => {

    return (
        <View style={styles.body}>
            <Image source={image} style={styles.images}/>
            <ThemedText style={styles.title}>{name}</ThemedText>
            <View style={styles.bottom}>
                <ThemedText style={styles.listening}>Listening : {listening}</ThemedText>
                <MaterialIcons name="people-outline" size={15} color="white" style={styles.people}/>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  bottom: {
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  people: {
    margin: 5,
    width: 15,
    height: 15,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  listening: {
    fontSize: 14,
    color: "#fff",
  },
});

export default JamerDisplay;
