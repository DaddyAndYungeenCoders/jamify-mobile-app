import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Conversation() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Text>Ok</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  profilHeader: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  playlist: {
    marginTop: 80,
    marginBottom: 20,
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#6e6c6c",
    borderRadius: 10,
    opacity: 0.7,
    marginTop: 30,
    margin: 10,
  },
  front: {
    flex: 1,
  },
});
