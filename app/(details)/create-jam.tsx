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
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import { eventService } from "@/services/event.service";
import { EventCreate } from "@/types/event.types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRefreshStore } from "@/store/refresh.store";
import {jamService} from "@/services/jam.service";
import {LaunchDtoTypes} from "@/types/launch.dto.types";

const CreateJamScreen = () => {
  const router = useRouter();
  const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);


  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);


  const [formData, setFormData] = useState<LaunchDtoTypes>({
    name: "", themes: []
  })

  const validateForm = () => {
    if (!formData.name.trim()) {
      console.log("Nom manquant");
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

      await jamService.launch(formData);
      setResponseStatus(200);

      triggerRefresh();
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
              <ThemedText style={styles.title}>Créer un Jam</ThemedText>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Nom du JAM</ThemedText>
                <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, name: text }))
                    }
                    placeholder="Nom du JAM"
                    placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Thèmes (séparés par un espace)</ThemedText>
                <TextInput
                    style={styles.input}
                    value={formData.themes.join(" ")}
                    onChangeText={(text) =>
                        setFormData((prev) => ({
                          ...prev,
                          themes: text.split(" ")
                        }))
                    }
                    placeholder="Thèmes (séparer par un espace)"
                    placeholderTextColor="#666"
                />
              </View>

              <Button
                  label="Créer le JAM"
                  onPress={handleSubmit}
                  disabled={!validateForm()}
                  loading={isLoading}
                  responseStatus={responseStatus}
                  successMessage="JAM créé !"
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
  },
  submitButton: {
    marginTop: 20,
  },
});

export default CreateJamScreen;
