import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import { eventService } from "@/services/event.service";
import { EventCreate } from "@/types/event.types";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateEventScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [formData, setFormData] = useState<EventCreate>({
    name: "",
    scheduledStart: "",
    address: {
      street: "",
      city: "",
      country: "",
      zipCode: "",
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  /*
  const handleDateChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    setSelectedDate(currentDate);
    const dateArray = [
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      0,
    ];

    setFormData((prev) => ({
      ...prev,
      scheduledStart: dateArray as any,
    }));
  };
  */
  const handleDateChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate;

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    setSelectedDate(currentDate);

    // Convertir la date en format ISO string
    setFormData((prev) => ({
      ...prev,
      scheduledStart: currentDate.toISOString(),
    }));
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

  const validateForm = () => {
    return (
      formData.name &&
      formData.scheduledStart &&
      formData.address.street &&
      formData.address.city &&
      formData.address.country &&
      formData.address.zipCode
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setResponseStatus(400);
      return;
    }

    try {
      setIsLoading(true);
      await eventService.createEvent(formData);
      setResponseStatus(200);

      setTimeout(() => {
        router.back();
      }, 2500);
    } catch (error) {
      setResponseStatus(500);
    } finally {
      setIsLoading(false);
    }
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
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <ThemedText style={styles.datePickerText}>
                  {formData.scheduledStart
                    ? formatDateTime(selectedDate)
                    : "Sélectionner une date"}
                </ThemedText>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
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
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, zipCode: text },
                  }))
                }
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
              loading={isLoading}
              responseStatus={responseStatus}
              successMessage="Événement créé !"
              errorMessage="Erreur lors de la création"
              containerStyle={styles.submitButton}
              colors={{ base: "#3498db", pressed: "#2980b9" }}
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
    backgroundColor: "#1a1a1a",
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
    width: "100%",
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreateEventScreen;
