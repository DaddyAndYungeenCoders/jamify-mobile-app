import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {User} from "@/types/user.types";

const JamerDisplay = ({
                          user
                      }: User) => {

    return (
        <View style={styles.body}>
            <Image source={{uri: user.imgUrl}} style={styles.images}/>
            <ThemedText style={styles.title}>{user.name}</ThemedText>
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
