import React, {useEffect, useRef, useState} from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useConversation} from "@/hooks/useConversation";
import {MessageBubble} from "@/components/MessageBubble";
import {ChatMessage, ChatMessageToSend} from "@/types/message.types";
import {sendMessageToApi} from "@/utils/fetchConversation";

export default function ConversationDetails() {
    // const {conversation} = useLocalSearchParams();
    // const parsedConversation = JSON.parse(conversation as string);
    const navigation = useNavigation();
    const currentUserId = "123";
    const flatListRef = useRef<FlatList<ChatMessage>>(null);
    const [message, setMessage] = useState("");

    const {conversation: conversationData, isLoading} = useConversation(
        //TODO: real roomId
        "private-room_123_qsdqsd",
    );

    useEffect(() => {
        console.log("Conversation data in component:", conversationData);
        const otherParticipant = conversationData?.participants?.find(
            (p) => p.id !== currentUserId,
        );

        if (otherParticipant) {
            navigation.setOptions({
                centerComponent: (
                    <View style={styles.headerComponent}>
                        <Image
                            source={{uri: otherParticipant.imgUrl}}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>{otherParticipant.name}</Text>
                    </View>
                ),
            });
        }
    }, [conversationData]);

    const sendMessage = async () => {
        if (message.trim()) {
            const messageToSend: ChatMessageToSend = {
                content: message,
                senderId: currentUserId,
                roomId: conversationData?.id as string,
            }
            await sendMessageToApi(messageToSend);
            setMessage("");
            // Scroll to bottom après envoi
            flatListRef.current?.scrollToEnd();
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
        >
            <FlatList
                ref={flatListRef}
                data={conversationData?.messages}
                renderItem={({item}) => (
                    <MessageBubble
                        message={item}
                        isOwnMessage={item.senderId === currentUserId}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={15}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Votre message..."
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    multiline
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    style={styles.sendButton}
                    disabled={!message.trim()}
                >
                    <Ionicons
                        name="send"
                        size={24}
                        color={message.trim() ? "#0084ff" : "rgba(255,255,255,0.5)"}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    headerComponent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    name: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },
    messagesList: {
        paddingVertical: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.1)",
    },
    input: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        color: "white",
        maxHeight: 100,
    },
    sendButton: {
        padding: 8,
    },
});
