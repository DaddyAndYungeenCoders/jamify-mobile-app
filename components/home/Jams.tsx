import React, { useEffect, useCallback, useRef, memo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import JamElement from "@/components/home/JamElement";
import { useJams } from "@/hooks/useJams";
import ClassicButton from "@/components/ClassicButton";
import { Jam } from "@/types/jam.types";

interface JamsProps {
  onRefresh?: () => void;
}

const MemoizedJamElement = memo(({ jam }: { jam: Jam }) => (
  <JamElement jam={jam} />
));

/**
 * Petit loader circulaire animé, similaire à votre CircularLoader
 * mais en version "répétition infinie" avec Animated.
 */
const CircularLoader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );
    animation.start();

    return () => animation.stop(); // Cleanup
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const Jams: React.FC<JamsProps> = ({ onRefresh }) => {
  const router = useRouter();
  const { jams, isLoading, error, refetch } = useJams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation d'apparition (fade-in) du conteneur
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNewJam = useCallback(() => {
    router.push("/(details)/create-jam");
  }, [router]);

  // Rendu d’un jam
  const renderJam = useCallback(
    ({ item }: { item: Jam }) => <MemoizedJamElement jam={item} />,
    [],
  );

  // Clé unique par jam
  const keyExtractor = useCallback(
    (item: Jam, index: number) => `jam-${item.id}-${index}`,
    [],
  );

  // En-tête (titre + bouton)
  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText style={styles.text}>Écoutez un JAM</ThemedText>
      <ClassicButton
        style={styles.newJamButton}
        title="Nouveau Jam"
        onPress={handleNewJam}
      />
    </View>
  );

  // Affichage du loading
  if (isLoading) {
    return (
      <View style={styles.loaderWrapper}>
        {renderHeader()}
        <CircularLoader />
      </View>
    );
  }

  // Gestion d'erreur ou de liste vide
  if (error || !jams?.length) {
    return (
      <View style={styles.errorWrapper}>
        {renderHeader()}
        <ThemedText style={styles.errorText}>
          {error ? error.message : "Aucun JAM disponible"}
        </ThemedText>
      </View>
    );
  }

  // Liste des jams en vertical
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {renderHeader()}
      <FlatList
        data={jams}
        renderItem={renderJam}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        horizontal={true}
        // Le pull-to-refresh natif du FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh || refetch}
            tintColor="white"
          />
        }
        // Par défaut, FlatList est vertical
      />
    </Animated.View>
  );
};

export default memo(Jams);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  listContainer: {
    // Style interne de la liste
    paddingBottom: 16,
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: "Jost_600SemiBold",
    textDecorationLine: "underline",
  },
  newJamButton: {
    alignSelf: "flex-end",
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
    borderTopColor: "transparent",
  },
  errorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#ff4d4d",
    textAlign: "center",
  },
});
