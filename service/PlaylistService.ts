import { Playlist } from "@/types/playlist.types";

const play1: Playlist = {
  id: 1,
  likes: 10,
  musics: [],
  name: "Top Hit 2025",
  tags: [],
  image: require("@/assets/images/music-exemple.png"),
};

const play2: Playlist = {
  id: 2,
  likes: 15,
  musics: [],
  name: "Mix Jazz",
  tags: [],
  image: require("@/assets/images/music-exemple.png"),
};

const PlaylistService = {
  getPlaylists: (): Playlist[] => {
    return [play1, play2, play1, play2, play1, play2, play1, play2];
  },
};

export default PlaylistService;
