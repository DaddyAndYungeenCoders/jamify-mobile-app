import {StyleSheet, Image, Platform, View, ScrollView} from 'react-native';

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

export default function PlayingScreen() {
    return (
        <LinearGradient colors={Colors.light.background} style={styles.container}>
            <ScrollView>
            <ThemedView style={styles.banner}>
                <ThemedText style={styles.titles}>Now Playing</ThemedText>
            </ThemedView>
            <View style={styles.body}>
                <MusicDisplay title="Exemple"
                              image={require('@/assets/images/music-exemple.png')}
                              artist={"Mickael Jackson"}
                              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                              duration={30}
                              lcurrentTime={10}/>

            </View>

            </ScrollView>


        </LinearGradient>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start", // Commence en haut
        alignItems: "center", // Centré horizontalement
    },
    banner: {
        position: "absolute", // Permet de placer le bandeau
        top: 40, // Espacement depuis le haut (ajustez selon vos besoins)
        width: "100%", // S'étend sur toute la largeur de l'écran
        backgroundColor: "#888888", // Couleur gris clair
        paddingVertical: 10, // Espacement vertical autour du texte
        alignItems: "center", // Centre le texte horizontalement
        opacity: 0.7,
    },
    titles: {
        fontSize: 24, // Taille du texte
        fontFamily: "Jost",
        color: "#fff", // Couleur du texte noir
    },
    body: {
        top: 100
    }
});
