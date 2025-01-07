import {JamDTO, JamStatus} from "@/DTO/JamDTO";
import {UserDTO} from "@/DTO/UserDTO";

const user1: UserDTO = {
    badges: [], events: [], id: 0, jams: [], name: "Titi", playlists: []
}
const jam1: JamDTO = {
    background: require('@/assets/images/music-exemple.png'),
    comments: [],
    description: "Bla bla",
    host: user1,
    id: 0,
    likes: 0,
    name: "jam1",
    participants: [user1],
    status: JamStatus.UPCOMING,
    themes: []
};


const JamService = {
    getJams: () : JamDTO[] => {
        return [
            jam1, jam1,jam1, jam1
        ];
    },
};

export default JamService;
