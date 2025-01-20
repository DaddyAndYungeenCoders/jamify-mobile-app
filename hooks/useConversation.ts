import {useEffect} from "react";
import {useConversationStore} from "@/store/ConversationStore";

export const useConversation = (roomId: string) => {
    const {conversations, fetchConversation, sendMessage} = useConversationStore();
    const conversation = conversations.get(roomId);

    useEffect(() => {
        if (!conversation) {
            fetchConversation(roomId);
        }
    }, [roomId]);

    return {
        conversation,
        isLoading: !conversation,
        sendMessage: async (content: string, senderId: string) => {
            await sendMessage(roomId, content, senderId);
        }
    };
};