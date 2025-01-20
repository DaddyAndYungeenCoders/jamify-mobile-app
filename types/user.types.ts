import { Jam } from "@/types/jam.types";
import { Event } from "@/types/event.types";
import { Playlist } from "@/types/playlist.types";
import { Badge } from "./badges.types";

export interface User {
  id: number;
  name: string;
  playlists: Playlist[];
  events: Event[];
  jams: Jam[];
  badges: Badge[];
  email: string;
  country: string;
  provider: string;
  imgUrl: string;
  userProviderId: string;
  roles: string[];
}
