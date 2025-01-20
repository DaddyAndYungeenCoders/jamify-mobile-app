import { Jam, JamStatus } from "@/types/jam.types";
import { User } from "@/types/user.types";

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
  name: "Titi",
  playlists: [],
};

const user2: User = {
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
  name: "Toto",
  playlists: [],
};

const jam1: Jam = {
  background: require("@/assets/images/music-exemple.png"),
  comments: [],
  description: "Bla bla",
  host: user1,
  id: 0,
  likes: 0,
  name: "jam1",
  participants: [user1],
  status: JamStatus.RUNNING,
  themes: [],
};

const jam2: Jam = {
  background: require("@/assets/images/music-exemple.png"),
  comments: [],
  description: "Bla bla",
  host: user2,
  id: 0,
  likes: 0,
  name: "jam2",
  participants: [user2],
  status: JamStatus.PAUSED,
  themes: [],
};

const JamService = {
  getJams: (): Jam[] => {
    return [jam1, jam2, jam1, jam1];
  },
};

export default JamService;
