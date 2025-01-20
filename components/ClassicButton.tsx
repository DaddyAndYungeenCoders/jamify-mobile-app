import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import {ClassicButtonProps} from "@/types/classic-button.types";
import Fontisto from '@expo/vector-icons/Fontisto';

const ClassicButton = ({
                           title,
                           onPress,
                           backgroundColor = '#94BBE9',
                           textColor = '#FFFFFF',
                           logo,
                           width = 'auto',
                           height = 50,
                           fontSize = 16, // Taille du texte
                           logoSize = 20, // Taille du logo
                           style,
                       }: ClassicButtonProps) => {
    if (backgroundColor != "none") {
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    style,
                ]}
                onPress={onPress}
            >
                <View style={styles.content}>
                    {logo ? (
                        <></>
                        // <Fontisto name={logo} size={24} color="white" style={styles.logo}/>
                    ): (<View/>)}
                    <Text style={[styles.text, {color: textColor, fontSize}]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    style,
                ]}
                onPress={onPress}
            >
                {/* <View style={styles.content}>
                    {logo && logoPosition === 'left' && (
                        <Image source={logo} style={[styles.logo, {width: logoSize, height: logoSize}]}/>
                    )}
                    <Text style={[styles.text, {color: textColor, fontSize}]}>{title}</Text>
                    {logo && logoPosition === 'right' && (
                        <Image source={logo} style={[styles.logo, {width: logoSize, height: logoSize}]}/>
                    )}
                </View> */}
            </TouchableOpacity>
        );
    }
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
