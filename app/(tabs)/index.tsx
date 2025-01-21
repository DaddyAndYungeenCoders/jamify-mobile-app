// screens/HomeScreen.tsx
import { ScrollView, StyleSheet } from "react-native";
import Events from "@/components/home/Events";
import { useCallback, useState } from "react";

export default function HomeScreen() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
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
