import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {ClassicButtonProps} from "@/types/classic-button.types";

const ClassicButton = ({
                           title,
                           onPress,
                           backgroundColor = '#94BBE9',
                           textColor = '#FFFFFF',
                           logo,
                           logoPosition = 'left', // 'left' ou 'right'
                           width = 'auto', // Largeur du bouton
                           height = 50, // Hauteur du bouton
                           fontSize = 16, // Taille du texte
                           logoSize = 20, // Taille du logo
                           style,
                       }: ClassicButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor, width, height },
                style,
            ]}
            onPress={onPress}
        >
            <View style={styles.content}>
                {logo && logoPosition === 'left' && (
                    <Image source={logo} style={[styles.logo, { width: logoSize, height: logoSize }]} />
                )}
                <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
                {logo && logoPosition === 'right' && (
                    <Image source={logo} style={[styles.logo, { width: logoSize, height: logoSize }]} />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
    },
    logo: {
        marginHorizontal: 8,
        resizeMode: 'contain',
    },
});

export default ClassicButton;
