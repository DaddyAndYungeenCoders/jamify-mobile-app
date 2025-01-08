import {PlaylistTypes} from "@/types/PlaylistTypes";

const play1: PlaylistTypes = {
    id: 1,
    likes: 10,
    musics: [],
    name: "Top Hit 2025",
    tags: [],
    background: require('@/assets/images/music-exemple.png'),
}

const play2: PlaylistTypes = {
    id: 2,
    likes: 15,
    musics: [],
    name: "Mix Jazz",
    tags: [],
    background: require('@/assets/images/music-exemple.png'),
}

const PlaylistService = {
    getPlaylists: (): PlaylistTypes[] => {
        return [
            play1, play2
        ];
    },
};

export default PlaylistService;
