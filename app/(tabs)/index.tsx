// screens/HomeScreen.tsx
import {ScrollView, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import JamsBack from "@/components/home/JamsBack";
import JamsTofix from "@/components/home/JamToFIx";
import Jams from "@/components/home/Jams";
import Events from "@/components/home/Events";

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
        flex: 1,
        rowGap: 30,
      }}
    >
      <Events key={refreshKey} onRefresh={handleRefresh} />
      <Jams key={jamRefreshKey} onRefresh={handleRefresh}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
  },
  profilHeader: {},
  front: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});
