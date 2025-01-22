// screens/HomeScreen.tsx
import {ScrollView, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";
import Playlists from "@/components/home/Playlists";

export default function HomeScreen() {
  const [refreshKey, setRefreshKey] = useState("event" + 0);
  const [jamRefreshKey, setJamRefreshKey] = useState("jam" + 0);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    setJamRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <ScrollView
      style={styles.front}
      contentContainerStyle={{
        // flex: 1,
        // rowGap: 30,
      }}
    >
      <Events key={refreshKey} onRefresh={handleRefresh} />
      <Jams key={jamRefreshKey} onRefresh={handleRefresh}/>
      <Playlists/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  profilHeader: {},
  front: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // gap: 30,
  },
});
