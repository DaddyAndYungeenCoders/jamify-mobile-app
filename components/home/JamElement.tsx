import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Jam, JamStatus } from "@/types/jam.types";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import BadgedIcon from "../BadgedIcon";

const JamElement = ({ jam }) => {
  const router = useRouter();

  const showDetail = async (jam: Jam) => {
    router.push({
      pathname: "/(details)/jam-detail",
      params: { jamId: jam.id },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => showDetail(jam)}>
      <View style={styles.background} />
      <View style={styles.content}>
        <Image source={{ uri: jam.host.imgUrl }} style={styles.image} />
        <View style={styles.info}>
          <ThemedText style={styles.text}>{jam.name}</ThemedText>
          <View style={styles.detail}>
            <View style={styles.userInfo}>
              <FontAwesome5 name="user" size={14} color="white" />
              <ThemedText style={styles.text}>
                {jam.host.name.split(" ")[0].charAt(0).toUpperCase() +
                  jam.host.name.split(" ")[0].slice(1)}
              </ThemedText>
            </View>
            {getStatusBadge(jam.status)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStatusBadge = (status) => {
  const configs = {
    [JamStatus.SCHEDULED]: {
      text: "Planifié",
      iconName: "calendar",
      backgroundColor: "rgba(34, 139, 34, 1)",
      borderColor: "rgba(24, 99, 24, 1)", // Plus foncé
    },
    [JamStatus.RUNNING]: {
      text: "En cours",
      iconName: "play-circle",
      backgroundColor: "rgba(30, 144, 255, 1)",
      borderColor: "rgba(20, 96, 170, 1)", // Plus foncé
    },
    [JamStatus.PAUSED]: {
      text: "En pause",
      iconName: "pause-circle",
      backgroundColor: "rgba(255, 165, 0, 1)",
      borderColor: "rgba(200, 128, 0, 1)", // Plus foncé
    },
    [JamStatus.STOPPED]: {
      text: "Arrêté",
      iconName: "stop-circle",
      backgroundColor: "rgba(128, 128, 128, 1)",
      borderColor: "rgba(96, 96, 96, 1)", // Plus foncé
    },
    [JamStatus.CANCELED]: {
      text: "Annulé",
      iconName: "times-circle",
      backgroundColor: "rgba(255, 69, 58, 1)",
      borderColor: "rgba(170, 46, 39, 1)", // Plus foncé
    },
  };

  const config = configs[status] || {
    text: "Erreur",
    iconName: "exclamation-circle",
    backgroundColor: "rgba(128, 0, 128, 1)",
    borderColor: "rgba(96, 0, 96, 1)", // Plus foncé
  };

  return <BadgedIcon {...config} style={styles.badge} />;
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 55,
    marginLeft: 20,
    marginBottom: 10,
  },
  info: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 1,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  badge: {
    marginLeft: 8,
  },
});

export default JamElement;
