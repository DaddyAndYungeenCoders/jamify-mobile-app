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
        backgroundColor: "#9b9b9b",
        borderRadius: 8,
        marginBottom: 10,
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
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 10,
        alignSelf: "center",
    },
});

export default JamerDisplay;
