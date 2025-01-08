import {StyleSheet, Image, Platform, View, ScrollView, Alert} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {IconSymbol} from '@/components/ui/IconSymbol';
import webView from "react-native-webview/src/WebView";
import {Colors} from "@/constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {opacity} from "react-native-reanimated/lib/typescript/Colors";
import MusicDisplay from "@/components/MusicDisplay";
import {useState} from "react";
import {musicDisplayProps} from "@/types/music-display.types";
import ClassicButton from "@/components/ClassicButton";
import InputAndLabel, {inputType} from "@/components/InputAndLabel";


export default function CreateEvent() {
    const [music, setMusic]: musicDisplayProps = useState(null);


    function save() {
        Alert.alert("Enregistré");

    }

    return (
        <LinearGradient colors={Colors.light.background} style={styles.container}>
            <ScrollView>
                <ThemedView style={styles.banner}>
                    <ThemedText style={styles.titles}>Create an Event</ThemedText>
                </ThemedView>
                <View style={styles.body}>
                    <InputAndLabel title={"Nom de l'évènement"} type={inputType.TEXT}/>
                    <InputAndLabel title={"Description de l'évènement"} type={inputType.TEXT}/>
                    <InputAndLabel title={"Adresse"} type={inputType.TEXT}/>
                    <InputAndLabel title={"Date de début"} type={inputType.TEXT} placeHolder={"??/??/????"}/>
                    <InputAndLabel title={"Nombre de participant maximum"} type={inputType.NUMBER}
                                   placeHolder={"Entrez un nombre..."}/>
                </View>
            </ScrollView>
            <ClassicButton title={"Enregister"} onPress={save} style={styles.button}/>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    button: {
        position: "relative",
        bottom: 20,
        alignSelf: "center",
        width: "80%",
    },
    banner: {
        position: "absolute",
        top: 40,
        width: "100%",
        backgroundColor: "#888888",
        paddingVertical: 10,
        alignItems: "center",
        opacity: 0.7,
    },
    titles: {
        fontSize: 24,
        fontFamily: "Jost",
        color: "#fff",
    },
    body: {
        marginTop: 100, // Ajustement pour éviter que le contenu soit caché par la bannière
        width: "100%",
        paddingHorizontal: 20,
    },
});

