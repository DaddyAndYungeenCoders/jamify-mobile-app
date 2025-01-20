import { ScrollView, StyleSheet, Alert, View } from "react-native"; // Ajout de Alert
import Events from "@/components/home/Events";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.front}
      contentContainerStyle={{
        flex: 1,
        rowGap: 30,
      }}
    >
      <Events onRefresh={() => {}} />
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
