import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { PlaylistElementProps } from "@/types/playlist-element.types";

const PlaylistElement: React.FC<PlaylistElementProps> = ({
  name,
  onPress,
  image,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Image source={image} style={styles.image} />
        <ThemedText style={styles.text}>{name}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 150,
    marginLeft: 20,
    backgroundColor: "rgba(110, 108, 108, 0.3)",
    borderRadius: 10,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});

export default PlaylistElement;
