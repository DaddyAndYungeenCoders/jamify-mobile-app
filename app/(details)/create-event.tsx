import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import { eventService } from "@/services/event.service";
import { EventCreate } from "@/types/event.types";
import DateTimePicker, {AndroidNativeProps, DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import { useRefreshStore } from "@/store/refresh.store";

const CreateEventScreen = () => {
  const router = useRouter();
  const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);

  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      centerComponent: (
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
            Event
          </Text>
        </View>
      ),
    });
  }, []); // Dépendances vides car nous ne voulons l'exécuter qu'une fois
  const getMinimumDate = () => {
    const date = new Date();
    date.setHours(date.getHours() + 4);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const initialDate = getMinimumDate();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [formData, setFormData] = useState<EventCreate>({
    name: "",
    scheduledStart: initialDate.toISOString(),
    address: {
      street: "",
      city: "",
      country: "France",
      zipCode: "",
    },
  });


  const validateDate = (date: Date) => {
    const minimumDate = getMinimumDate();
    return date >= minimumDate;
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (!date) return;

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    // Vérifier si la date est valide (au moins 3h dans le futur)
    if (!validateDate(date)) {
      setResponseStatus(400);
      return;
    }

    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      scheduledStart: date.toISOString(),
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      console.log("Nom manquant");
      return false;
    }
    if (
      !formData.scheduledStart ||
      !validateDate(new Date(formData.scheduledStart))
    ) {
      console.log("Date invalide (doit être au moins 3h dans le futur)");
      return false;
    }
    if (!formData.address.street.trim()) {
      console.log("Rue manquante");
      return false;
    }
    if (!formData.address.city.trim()) {
      console.log("Ville manquante");
      return false;
    }
    if (!formData.address.country.trim()) {
      console.log("Pays manquant");
      return false;
    }
    if (!formData.address.zipCode.trim()) {
      console.log("Code postal manquant");
      return false;
    }
    if (
      !formData.address.zipCode.trim() ||
      formData.address.zipCode.length !== 5
    ) {
      console.log("Code postal invalide (doit contenir exactement 5 chiffres)");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Données envoyées:", JSON.stringify(formData, null, 2));
      setResponseStatus(400);
      return;
    }

    try {
      setIsLoading(true);
      console.log("Envoi des données:", JSON.stringify(formData, null, 2));

      await eventService.createEvent(formData);
      setResponseStatus(200);

      triggerRefresh(); // Déclencher le rafraîchissement
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Erreur complète:", error);
      setResponseStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const openAndroidDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      // mode: "datetime",
      onChange: handleDateChange,
      minimumDate: getMinimumDate(),
    });
  };

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <ThemedText style={styles.title}>Créer un événement</ThemedText>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Nom de l'événement</ThemedText>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
                placeholder="Nom de l'événement"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Date et heure</ThemedText>
              {Platform.OS === "android" ? (
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={openAndroidDatePicker}
                >
                  <ThemedText style={styles.datePickerText}>
                    {selectedDate.toLocaleString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </ThemedText>
                </TouchableOpacity>
              ) : (
                showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="datetime"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={getMinimumDate()}
                  />
                )
              )}

              {/*<TouchableOpacity*/}
              {/*  style={styles.datePickerButton}*/}
              {/*  onPress={() => setShowDatePicker(true)}*/}
              {/*>*/}
              {/*  <ThemedText style={styles.datePickerText}>*/}
              {/*    {formData.scheduledStart*/}
              {/*      ? formatDateTime(selectedDate)*/}
              {/*      : "Sélectionner une date"}*/}
              {/*  </ThemedText>*/}
              {/*</TouchableOpacity>*/}

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="datetime"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={getMinimumDate()}
                  style={styles.datePicker}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Adresse</ThemedText>
              <TextInput
                style={styles.input}
                value={formData.address.street}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, street: text },
                  }))
                }
                placeholder="Rue"
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                value={formData.address.zipCode}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  if (numericText.length <= 5) {
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, zipCode: numericText },
                    }));
                  }
                }}
                maxLength={5}
                placeholder="Code postal"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={formData.address.city}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: text },
                  }))
                }
                placeholder="Ville"
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                value={formData.address.country}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, country: text },
                  }))
                }
                placeholder="Pays"
                placeholderTextColor="#666"
                defaultValue="France"
              />
            </View>

            <Button
              label="Créer l'événement"
              onPress={handleSubmit}
              disabled={!validateForm()}
              loading={isLoading}
              responseStatus={responseStatus}
              successMessage="Événement créé !"
              errorMessage="Attention"
              containerStyle={styles.submitButton}
              colors={{
                base: !validateForm() ? "grey" : "#3498db",
                pressed: "#2980b9",
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  container: {
    flex: 1,
    //    backgroundColor: "#1a1a1a",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#fff",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#fff",
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  datePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: "#2a2a2a",
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreateEventScreen;
