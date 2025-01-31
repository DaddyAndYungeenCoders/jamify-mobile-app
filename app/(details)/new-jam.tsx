import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ClassicButton from "@/components/ClassicButton";
import InputAndLabel, { inputType } from "@/components/InputAndLabel";
import {LaunchDtoTypes} from "@/types/launch.dto.types";
import {RouteProp, useRoute} from "@react-navigation/native";
import {useRouter} from "expo-router";
import {jamService} from "@/services/jam.service";


type NewJamRouteProp = RouteProp<{
  NewJam: {token: string };
}, "NewJam">;

const NewJam: React.FC = () => {
  const route = useRoute<NewJamRouteProp>();
  const [newJam, setNewJam] = useState({ name: "", themes: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const token = route.params.token;
  const router = useRouter();

  const handleChange = (key: keyof typeof newJam, value: string) => {
    setNewJam((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const creerJAM = async () => {
    // Alert.alert("Nouveau JAM", `Nom : ${newJam.name}\nThèmes : ${newJam.themes}`);
    const newlaunch: LaunchDtoTypes = {
      name: newJam.name,
      themes: newJam.themes.split(" ")
    }
    const resp = await jamService.launch(token, newlaunch);
    if (resp){

      router.push({
        pathname: "/",
      })
    }

  };

  useEffect(() => {
    setIsLoading(false); // Supposons que cette page ne charge rien au début
  }, []);

  if (isLoading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <ThemedText style={styles.loadingText}>
            Chargement de la page...
          </ThemedText>
        </View>
    );
  }

  if (error) {
    return (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            {error?.message || "Une erreur est survenue"}
          </ThemedText>
        </View>
    );
  }

  return (
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <ThemedText style={styles.title}>Créer un JAM</ThemedText>
          <InputAndLabel
              title="Nom du JAM"
              type={inputType.TEXT}
              onChangeText={(value) => handleChange("name", value)}
          />
          <InputAndLabel
              title="Thèmes du JAM (séparer par des espaces)"
              type={inputType.TEXT}
              onChangeText={(value) => handleChange("themes", value)}
          />
        </View>
        <ClassicButton title="Créer" onPress={creerJAM} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Jost_600SemiBold",
    marginBottom: 10,
  },
});

export default NewJam;
