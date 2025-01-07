import {Alert} from "react-native";
import {EventDTO, EventStatus} from "@/DTO/EventDTO";
import {UserDTO} from "@/DTO/UserDTO";

const event1: EventDTO = {
    id: 1,
    name: "Concert Rock",
    status: EventStatus.UPCOMING,
    background: require('@/assets/images/music-exemple.png'),
    description: "Magnifique concert de Rock",
    scheduledDate: new Date("2025-01-10T19:00:00"),
    participants: [],
    themes: ["Musique", "Rock", "Live"],
};

const user1: UserDTO = {
    badges: [], events: [], id: 0, jams: [], name: "", playlists: []
}

const event2: EventDTO = {
    id: 1,
    name: "Concert JAZZ",
    status: EventStatus.ONGOING,
    background: require('@/assets/images/music-exemple.png'),
    description: "Manifique Jazz",
    scheduledDate: new Date("2025-01-20T19:00:00"),
    participants: [user1],
    themes: ["Musique", "Jazz", "Live"],
};
const EventService = {

    participate: (nom) => {
        Alert.alert("Bienvenu dans l'évènement " + nom);
    },


    getEvents: (): EventDTO[] => {
        return [
            event1,
            event2
        ];
    },
};

export default EventService;
