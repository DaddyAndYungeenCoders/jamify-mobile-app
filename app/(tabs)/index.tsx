import {Alert, ScrollView, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "@/constants/Colors";
import ProfilHeader from "@/components/header/Profil-Header";
import Playlists from "@/components/home/Playlists";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";

export default function HomeScreen() {
    const handlePress = () => {
        Alert.alert('Bouton Pressé', 'Vous avez cliqué sur le bouton!');
    };
    const playlists = [
        {name:"CHILL & ROCK", image: require('@/assets/images/music-exemple.png') },
        {name:"Techno", image: require('@/assets/images/music-exemple.png') },
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png')},
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png')},
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png')},
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png')},
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png')},
    ]
    const jams = [
        {name:"CHILL & ROCK", image: require('@/assets/images/music-exemple.png'), autheur: "Bob", heure: "19h00", onPress: handlePress },
        {name:"Techno", image: require('@/assets/images/music-exemple.png'), autheur: "Alice", heure: "En cours", onPress: handlePress },
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png'), autheur: "Max", heure: "20h00", onPress: handlePress },
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png'), autheur: "Max", heure: "20h00", onPress: handlePress },
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png'), autheur: "Max", heure: "20h00", onPress: handlePress },
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png'), autheur: "Max", heure: "20h00", onPress: handlePress },
        {name:"Chicago rap", image: require('@/assets/images/music-exemple.png'), autheur: "Max", heure: "20h00", onPress: handlePress },
    ]

    const events = [
        {name:"Fête de la musique", image: require('@/assets/images/music-exemple.png'), date:"15/03/2025", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry...",participants: 15, onPress: handlePress },
        {name:"Concert Jazz", image: require('@/assets/images/music-exemple.png'), date:"20/03/2025", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry...",participants: 18, onPress: handlePress },
    ]


    return (
        <LinearGradient colors={Colors.light.background} style={styles.container}>
            <ScrollView>
                <ProfilHeader Name={"TOTO"} image={require('@/assets/images/jamer-exemple.png')}
                              style={styles.profilHeader} onPress={handlePress}/>
                <Playlists style={styles.playlist} playlists={playlists}></Playlists>
                <Jams jams={jams}></Jams>
                <Events events={events}></Events>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start", // Commence en haut
    },
    profilHeader: {
        position: "absolute", // Position absolue
        top: 40, // Distance depuis le haut de l'écran (ajustez selon vos besoins)
        right: 20, // Distance depuis le bord droit
        zIndex: 10, // Assure que le composant est au-dessus des autres

    },
    playlist: {
        marginTop: 80,
        marginBottom: 20,
    }

});
