import { Alert } from "react-native";
import { Event, EventStatus } from "@/types/event.types";
import { User } from "@/types/user.types";

const event1: Event = {
  id: 1,
  name: "Concert Rock",
  status: EventStatus.UPCOMING,
  background: require("@/assets/images/music-exemple.png"),
  description: "Magnifique concert de Rock",
  scheduledDate: new Date("2025-01-10T19:00:00"),
  participants: [],
  themes: ["Musique", "Rock", "Live"],
  address: "4 rue des lila 69003 LYON",
};

const user1: User = {
  country: "",
  email: "",
  imgUrl: "",
  provider: "",
  roles: [],
  userProviderId: "",
  badges: [],
  events: [],
  id: "0",
  jams: [],
  name: "",
  playlists: [],
};

const event2: Event = {
  id: 1,
  name: "Concert JAZZ",
  status: EventStatus.ONGOING,
  background: require("@/assets/images/music-exemple.png"),
  description: "Manifique Jazz",
  scheduledDate: new Date("2025-01-20T19:00:00"),
  participants: [user1],
  themes: ["Musique", "Jazz", "Live"],
  address: "78 chemin de la truite 69004 Lyon",
};
const EventService = {
  participate: (nom: string) => {
    Alert.alert("Bienvenu dans l'évènement " + nom);
  },

  getEvents: (): Event[] => {
    return [event1, event2];
  },
};

export default EventService;
