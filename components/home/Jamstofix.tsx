import React, { useEffect, useCallback, useRef, memo } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import JamElement from "@/components/home/JamElement";
import { useJams } from "@/hooks/useJams";
import ClassicButton from "@/components/ClassicButton";
import { Jam } from "@/types/jam.types";

interface JamsProps {
    onRefresh?: () => void;
}

const MemoizedJamElement = memo(({ jam }: { jam: Jam }) => <JamElement jam={jam} />);

const CircularLoader = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
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

const JamsTofix: React.FC<JamsProps> = ({ onRefresh }) => {
    const router = useRouter();
    const { jams, isLoading, error, refetch } = useJams();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        console.log("Jams data:", jams);
    }, [jams]);


    const handleNewJam = useCallback(() => {
        router.push("/(details)/new-jam");
    }, [router]);

    const renderJam = useCallback(
        ({ item }: { item: Jam }) => <MemoizedJamElement jam={item} />,
        []
    );

    // const keyExtractor = useCallback((item: Jam) => item.id.toString(), []);
    const keyExtractor = useCallback((item: Jam, index: number) => `${item.id}-${index}`, []);


    const renderHeader = () => (
        <View style={styles.header}>
            <ThemedText style={styles.text}>Écoutez un JAM</ThemedText>
            <ClassicButton style={styles.newJamButton} title="Nouveau Jam" onPress={handleNewJam} />
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.loaderWrapper}>
                {renderHeader()}
                <CircularLoader />
            </View>
        );
    }

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

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {renderHeader()}
            <FlatList
                data={jams}
                renderItem={renderJam}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContainer}
                refreshing={isLoading}
                onRefresh={onRefresh || refetch}
            />
        </Animated.View>
    );
};

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
    text: {
        fontSize: 18,
        color: "white",
        fontFamily: "Jost_600SemiBold",
        textDecorationLine: "underline",
    },
    newJamButton: {
        alignSelf: "flex-end",
    },
    listContainer: {
        paddingBottom: 16,
    },
    loaderWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c1c1c",
    },
    loaderContainer: {
        flex: 1,
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

export default memo(Jams);
