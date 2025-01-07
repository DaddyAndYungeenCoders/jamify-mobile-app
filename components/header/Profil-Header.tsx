import React from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";

const ProfilHeader = ({ Name, image, style, onPress}) => {
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
        alignItems: "center", // Centré horizontalement
        justifyContent: "center", // Centré verticalement
    },
    image: {
        width: 50, // Taille de l'image (ajustez selon vos besoins)
        height: 50, // Hauteur égale à la largeur pour un cercle parfait
        borderRadius: 25, // Moitié de la largeur/hauteur pour rendre l'image ronde
    },
});

export default ProfilHeader;
