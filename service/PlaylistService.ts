import {PlaylistDTO} from "@/DTO/PlaylistDTO";

const play1: PlaylistDTO = {
    id: 1,
    likes: 10,
    musics: [],
    name: "Top Hit 2025",
    tags: [],
    background: require('@/assets/images/music-exemple.png'),
}

const play2: PlaylistDTO = {
    id: 2,
    likes: 15,
    musics: [],
    name: "Mix Jazz",
    tags: [],
    background: require('@/assets/images/music-exemple.png'),
}

const PlaylistService = {
    getPlaylists: (): PlaylistDTO[] => {
        return [
            play1, play2
        ];
    },
};

export default PlaylistService;
