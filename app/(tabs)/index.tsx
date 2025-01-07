import {Alert, ScrollView, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "@/constants/Colors";
import ProfilHeader from "@/components/header/Profil-Header";
import Playlists from "@/components/home/Playlists";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";
import {useEffect, useState} from "react";
import EventService from "@/service/EventService";
import PlaylistService from "@/service/PlaylistService";
import JamService from "@/service/JamService";

export default function HomeScreen() {
    const handlePress = () => {
        Alert.alert('Bouton Pressé', 'Vous avez cliqué sur le bouton!');
    };

    const [playlists, setPlaylists] = useState([]);
    const [events, setEvents] = useState([]);
    const [jams, setJams] = useState([]);

    useEffect(() => {
        const levent = EventService.getEvents();
        setEvents(levent);

        const lplaylist = PlaylistService.getPlaylists();
        setPlaylists(lplaylist);

        const ljams = JamService.getJams();
        setJams(ljams);
    }, [])


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
