import { ProfilHeaderProps } from "@/types/profile-header.types";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const ProfilHeader: React.FC<ProfilHeaderProps> = ({
  name,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ProfilHeader;
