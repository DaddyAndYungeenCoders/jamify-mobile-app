import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import PlaylistElement from "@/components/home/PlaylistElement";
import {ThemedText} from "@/components/ThemedText";
import EventElement from "@/components/home/EventElement";

const Events = ({events, style}) => {
    return (
        <View style={[styles.content, style]}>
            <ThemedText style={styles.text}>Events</ThemedText>

            <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
                {events ? (
                    events.map((event, index) => (

                        <EventElement
                            event={event}
                            key={index}
                        />
                    ))

                ) : (
                    <ThemedText style={styles.error}>Aucun Event</ThemedText>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    text: {
        fontWeight: "600",
        fontSize: 18,
        textDecorationLine: "underline",
        marginBottom: 10,
        marginLeft: 15,
        fontFamily: "Jost",
    },
    scrollContainer: {
        paddingHorizontal: 10,
    },
    error: {
        marginLeft: 100,
    }
});

export default Events;
