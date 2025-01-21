import {useEffect} from "react";
import {useConversationStore} from "@/store/conversation.store";

export const useConversation = (roomId: string) => {
    const {conversations, fetchConversationForRoom, sendMessage, refreshConversations} = useConversationStore();
    const conversation = conversations.get(roomId);

    useEffect(() => {
        console.log("useConversation");
        fetchConversationForRoom(roomId).then(r => console.log("Messages fetched : " + r));
    }, [roomId]);

    return {
        conversation,
        isLoading: !conversation,
        sendMessage: async (content: string, senderId: string) => {
            await sendMessage(roomId, content, senderId);
        }
    };
};