import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import JamElement from "@/components/home/JamElement";
import {Jam, JamStatus} from "@/types/jam.types";
import {User} from "@/types/user.types";
import {LaunchDtoTypes} from "@/types/launch.dto.types";
import ClassicButton from "@/components/ClassicButton";
import {useRouter} from "expo-router";

interface JamProps {
    jams: Jam[];
}

const user2: User = {
    country: "",
    email: "",
    imgUrl: "",
    provider: "",
    roles: [],
    userProviderId: "",
    badges: [],
    events: [],
    id: 0,
    jams: [],
    name: "Toto",
    playlists: [],
};



const Jams: React.FC<JamProps> = ({jams, token}) => {
    const router = useRouter();
    const newJam = async () => {
        router.push({
            pathname: "/(details)/new-jam",
            params: {token: token},
        })
    };
    return (
        <View style={styles.content}>
            <View style={styles.header}>

                <ThemedText style={styles.text}>Ecoutez un JAM</ThemedText>
                <ClassicButton style={styles.newJam} title="NewJam" onPress={newJam}/>
            </View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.scrollContainer}
            >
                {jams ? (
                    jams.map((jam, index) => <JamElement key={index} jam={jam} token={token}/>)
                ) : (
                    <ThemedText style={styles.error}>Aucun Jam</ThemedText>
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: "white",
        textDecorationLine: "underline",
        fontFamily: "Jost_600SemiBold",
    },
    scrollContainer: {
        flexDirection: "column", // Organisation en ligne
        flexWrap: "wrap", // Les éléments passent à la ligne automatiquement
        maxHeight: 200,
        justifyContent: "space-between", // Espacement entre les colonnes
        alignContent: "space-between",
    },
    jamElement: {
        marginBottom: 10,
        height: 55,
    },
    newJam: {
        alignSelf: "flex-end",
    },
    error: {
        marginLeft: 150,
    },
});

export default Jams;
