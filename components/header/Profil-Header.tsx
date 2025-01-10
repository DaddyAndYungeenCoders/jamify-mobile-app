import React from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";

const ProfilHeader = ({ name, image, style, onPress}) => {
    return (
        <TouchableOpacity style={[styles.container, style]}
        onPress={onPress}
        >
            <Image source={image} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default ProfilHeader;
