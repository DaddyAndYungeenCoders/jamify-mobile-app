import {JamTypes, JamStatus} from "@/types/JamTypes";
import {UserTypes} from "@/types/UserTypes";

const user1: UserTypes = {
    country: "", email: "", imgUrl: "", provider: "", roles: [], userProviderId: "",
    badges: [], events: [], id: 0, jams: [], name: "Titi", playlists: []
}


const user2: UserTypes = {
    country: "", email: "", imgUrl: "", provider: "", roles: [], userProviderId: "",
    badges: [], events: [], id: 0, jams: [], name: "Toto", playlists: []
}

const jam1: JamTypes = {
    background: require('@/assets/images/music-exemple.png'),
    comments: [],
    description: "Bla bla",
    host: user1,
    id: 0,
    likes: 0,
    name: "jam1",
    participants: [user1],
    status: JamStatus.RUNNING,
    themes: []
};

const jam2: JamTypes = {
    background: require('@/assets/images/music-exemple.png'),
    comments: [],
    description: "Bla bla",
    host: user2,
    id: 0,
    likes: 0,
    name: "jam2",
    participants: [user2],
    status: JamStatus.PAUSED,
    themes: []
};

const JamService = {
    getJams: () : JamTypes[] => {
        return [
            jam1, jam2,jam1, jam1
        ];
    },
};

export default JamService;
