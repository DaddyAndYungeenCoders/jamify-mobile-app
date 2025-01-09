/*
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import ClassicButton from "@/components/ClassicButton";
import InputAndLabel, { inputType } from "@/components/InputAndLabel";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function CreateEvent() {
  const [music, setMusic] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const save = () => {
    Alert.alert(
      "Enregistré",
      `Date sélectionnée : ${date.toLocaleDateString()}`,
    );
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.banner}>
          <ThemedText style={styles.titles}>Create an Event</ThemedText>
        </View>
        <View style={styles.body}>
          <InputAndLabel title={"Nom de l'évènement"} type={inputType.TEXT} />
          <InputAndLabel
            title={"Description de l'évènement"}
            type={inputType.TEXT}
          />
          <InputAndLabel title={"Adresse"} type={inputType.TEXT} />

          <View>
            <ThemedText style={styles.label}>Date de début</ThemedText>
            <ClassicButton
              title={date.toLocaleDateString()}
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onChangeDate}
            />
          )}

          <InputAndLabel
            title={"Nombre de participant maximum"}
            type={inputType.NUMBER}
            placeHolder={"Entrez un nombre..."}
          />
        </View>
        <ClassicButton
          title={"Enregister"}
          onPress={save}
          style={styles.button}
          logo={"save"}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    position: "relative",
    bottom: 20,
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
  },
  banner: {
    position: "absolute",
    top: 40,
    width: "100%",
    backgroundColor: "#888888",
    paddingVertical: 10,
    alignItems: "center",
    opacity: 0.7,
  },
  titles: {
    fontSize: 24,
    fontFamily: "Jost",
    color: "#fff",
  },
  body: {
    marginTop: 100,
    width: "90%",
    paddingHorizontal: 20,
    marginLeft: 15,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    // marginBottom: 5,
    color: "#fff",
  },
  dateButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
*/
