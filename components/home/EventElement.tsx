import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  Modal,
  Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ClassicButton from "@/components/ClassicButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { EventTypes } from "@/types/event.types";
import Fontisto from "@expo/vector-icons/Fontisto";

const EventElement = ({ event }: EventTypes) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openDetail = () => {
    setModalVisible(true);
  };

  const closeDetail = () => {
    setModalVisible(false);
  };

  return (
    <View>
      {/* Composant de l'événement */}
      <TouchableOpacity style={[styles.container]} onPress={openDetail}>
        <Image source={event.background} style={styles.image} />
        <View style={styles.overlay}>
          <ThemedText style={styles.date}>
            {event.scheduledDate.toLocaleDateString()}
          </ThemedText>
          <View style={styles.participateBack} />
          <ClassicButton
            title={"Participer"}
            onPress={event.onPress}
            style={styles.participateButton}
            backgroundColor={"none"}
          />
          <View style={styles.bottomContainer}>
            <ThemedText style={styles.name}>{event.name}</ThemedText>
            <View style={styles.participantsContainer}>
              <MaterialIcons
                name="people-outline"
                size={15}
                color="white"
                style={styles.icon}
              />
              <ThemedText style={styles.participantsText}>
                {event.participants.length}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={styles.description}>
            {event.description}
          </ThemedText>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDetail}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={event.background} style={styles.modalImage} />
            <ThemedText style={styles.modalTitle}>{event.name}</ThemedText>
            <ThemedText style={styles.modalDate}>
              Date : {event.scheduledDate.toLocaleDateString()}
            </ThemedText>
            <ThemedText style={styles.modalDescription}>
              {event.description}
            </ThemedText>
            <View style={styles.addressBox}>
              <Fontisto
                name="map-marker-alt"
                size={20}
                color="white"
                style={styles.icon}
              />
              <ThemedText>{event.address}</ThemedText>
            </View>
            <ClassicButton
              title="Fermer"
              onPress={closeDetail}
              style={styles.closeButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 207,
    marginLeft: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 10,
    justifyContent: "space-between",
  },
  date: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#fff",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
  participateButton: {
    position: "absolute",
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 30,
    width: 100,
  },
  participateBack: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    height: 30,
    width: 100,
    opacity: 0.7,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    top: 100,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  participantsContainer: {
    top: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  participantsText: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#fff",
    fontSize: 12,
    padding: 5,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "90%",
    backgroundColor: "#858585",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    bottom: 20,
    position: "absolute",
  },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default EventElement;
