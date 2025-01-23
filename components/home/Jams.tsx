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

/** ----- Petit loader circulaire animé ----- */
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
    return () => animation.stop();
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

/** ----- Mémo pour éviter de rerendre le JamElement ----- */
const MemoizedJamElement = memo(({ jam }: { jam: Jam }) => (
  <JamElement jam={jam} />
));

/** ----- Chunk util : coupe le tableau de jams en paquets de 3 ----- */
function chunkArray<T>(data: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size));
  }
  return result;
}

/** ----- Composant Jams ----- */
interface JamsProps {
  onRefresh?: () => void;
}

const Jams: React.FC<JamsProps> = ({ onRefresh }) => {
  const router = useRouter();
  const { jams, isLoading, error, refetch } = useJams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'apparition (fade-in)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNewJam = useCallback(() => {
    router.push("/(details)/create-jam");
  }, [router]);

  /** ---------- ÉTAPE 1 : chunker le tableau de jams par colonnes de 3 ---------- */
  const columnsData = jams ? chunkArray(jams, 3) : [];

  /** ----- Rendu d'une "colonne" (paquet de 3 Jams max) ----- */
  const renderColumn = useCallback(({ item }: { item: Jam[] }) => {
    // item est un tableau de 1 à 3 jams
    return (
      <View style={styles.columnContainer}>
        {item.map((jam) => (
          <View key={jam.id} style={styles.jamWrapper}>
            <MemoizedJamElement jam={jam} />
          </View>
        ))}
      </View>
    );
  }, []);

  const keyExtractor = useCallback(
    (item: Jam[], index: number) => `column-${index}`, // chaque colonne
    [],
  );

  /** ----- En-tête : Titre + Bouton Nouveau Jam ----- */
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

  /** ----- Loading ----- */
  if (isLoading) {
    return (
      <View style={styles.loaderWrapper}>
        {renderHeader()}
        <CircularLoader />
      </View>
    );
  }

  /** ----- Erreur ou Liste vide ----- */
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

  /**
   * ----- Liste horizontale -----
   * Ici, "columnsData" est un tableau de "colonnes"
   * => Chaque colonne est rendue verticalement (max 3 Jams)
   */
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {renderHeader()}

      <FlatList
        data={columnsData}
        renderItem={renderColumn}
        keyExtractor={keyExtractor}
        // Défilement horizontal
        horizontal
        showsHorizontalScrollIndicator={false}
        // Pull-to-refresh en horizontal => Attention :
        // Ce n'est pas officiellement pris en charge sur iOS.
        // Sur Android, ça peut passer. Sur iOS, c'est souvent inactif.
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh || refetch}
            tintColor="white"
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </Animated.View>
  );
};

export default memo(Jams);

/** ----- Styles ----- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  /** En-tête */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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

  /** Contenu de la FlatList (espacement supplémentaire si besoin) */
  listContent: {
    paddingRight: 16, // marge à droite pour la liste
  },

  /** Conteneur pour chaque "colonne" */
  columnContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    // Largeur fixe ou adaptative possible :
    // On peut mettre une largeur fixe pour chaque colonne,
    // ou laisser "width: 'auto'" si JamElement se dimensionne tout seul
    width: 250, // par exemple, 250px de large par colonne
    marginRight: 16,
  },
  /** Wrapper autour de chaque JamElement */
  jamWrapper: {
    marginBottom: 16,
    // Contrôlez la hauteur de chaque bloc si nécessaire
  },

  /** Loader */
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
  /** Erreur */
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
