import React from "react";
import {View, Text, StyleSheet, ViewStyle, TextStyle, Image} from "react-native";
import {User} from "@/types/user.types";
import {ThemedText} from "@/components/ThemedText";

interface UserProps {
    users: User[];
}

function getFirstAndMiddleLetter(str: string): string {
    if (str.length === 0) return "";

    const firstLetter = str[0];
    const middleIndex = Math.floor(str.length / 2);
    const middleLetter = str[middleIndex];

    return firstLetter + middleLetter;
}

const Participants: React.FC<UserProps> = ({
                                         users,
                                     }) => {

    return (
        <View style={styles.participantsList}>
            {users.map((participant, index) => (
                <View key={index} style={styles.participantItem}>
                    <View style={styles.avatar}>
                        {participant.imgUrl ? (
                            <Image
                                source={{ uri: participant.imgUrl }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Text style={styles.text}>
                                {getFirstAndMiddleLetter(
                                    participant?.name || "",
                                ).toUpperCase()}
                            </Text>
                        )}
                    </View>
                    <View style={styles.participantInfo}>
                        <ThemedText style={styles.participantName}>
                            {participant.name}
                        </ThemedText>
                        <ThemedText style={styles.participantEmail}>
                            {participant.email}
                        </ThemedText>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 40,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    participantsList: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        padding: 15,
    },
    participantItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    participantInfo: {
        marginLeft: 15,
        flex: 1,
    },
    participantName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    participantEmail: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.8,
    },
    text: {
        color: "white",
        fontFamily: "Jost_600SemiBold",
        fontSize: 24,
    },
});

export default Participants;
