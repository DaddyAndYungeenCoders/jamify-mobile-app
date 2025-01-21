import { ChatMessage, IConversationDetails } from "@/types/message.types";
import { create } from "zustand";
import { CHAT_API_URL } from "@/constants/Utils";
import { useAuthenticationStore } from "@/store/authentication.store";
import {fetchConversationsForCurrentUser} from "@/utils/fetchConversation";

interface ConversationStore {
    conversations: Map<string, IConversationDetails>;
    currentConversationId: string | null;
    initialized: boolean;
    // Actions
    addMessage: (roomId: string, message: ChatMessage) => void;
    setCurrentConversation: (conversationId: string) => void;
    updateConversation: (conversation: IConversationDetails) => void;
    // Async actions
    fetchConversationForRoom: (roomId: string) => Promise<void>;
    sendMessage: (roomId: string, content: string, senderId: string) => Promise<void>;
    initializeConversations: () => Promise<void>;
    refreshConversations: () => Promise<void>;
}


export const useConversationStore = create<ConversationStore>((set, get) => ({
    conversations: new Map(),
    currentConversationId: null,
    initialized: false,

    addMessage: (roomId, message) => {
        set(state => {
            const conversations = new Map(state.conversations);
            const conversation = conversations.get(roomId);

            if (conversation) {
                conversations.set(roomId, {
                    ...conversation,
                    messages: [...conversation.messages, message],
                });
            }

            return { conversations };
        });
    },

    setCurrentConversation: (roomId) => {
        set({ currentConversationId: roomId });
    },

    updateConversation: (conversation) => {
        set(state => {
            const conversations = new Map(state.conversations);
            conversations.set(conversation.id, conversation);
            return { conversations };
        });
    },

    fetchConversationForRoom: async (roomId) => {
        console.log("fetchMessageForRoom");
        try {
            const response = await fetch(`${CHAT_API_URL}/messages/conversation/room/${roomId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // FIXME: This should be the actual token
                    // 'Authorization': `Bearer ${token}`
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJqYW1pZnktdWFhLWtleS1pZCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJEYW1pZW4gTWFpbGhlYmlhdSIsImlzcyI6Imh0dHBzOi8vamFtaWZ5LmRhZGR5b3Jub3QueHl6L2phbWlmeS11YWEiLCJlbWFpbCI6ImRhbWllbm1haWxoZWJpYXVAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImNvdW50cnkiOiJGUiIsInByb3ZpZGVyIjoic3BvdGlmeSIsImlkIjoiMTEyMjI5MTQzMCIsImlhdCI6MTczNzQwOTgzNCwiZXhwIjoxNzM3NDk2MjM0fQ.QBpBMpnjTh1S87Q0ZoxtuIFNnQlc4A4Cwb6A5-o3-EQkmovNrq97Lx4SW9u4gA7LU6DqVkdhvdK8kA7RsSQP9TQrPuP9Au9VESxjobZOfHuLmk2gmjWb9QgsnX7YQSmQSvZbJ_Sz_DYaApPoCGeck-ayx_67r2wJ_WVdbIOIVeZFHF_AYkVknChYguNk3zPem5PspItHXwJ0xnJSGK7uWrnDftylGtNCUDN9xC_YOaxTh4fAkeC3KdwDCKt9hBBmGJIQSzibRgvd2PQ0Xt1Nfl2unV7J5Ddmf_dC7leiOqeXJ9Ti_P4H0z-xRd4d_awtMx47Ph5AAgod-htxjuEMJQ`
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch messages for room : ${roomId} (response : ${response.status}) because of ${response.statusText}`);
            }
            const conversation = await response.json();
            console.log("Nb of ChatMessage fetched: " + conversation.length);

            set(state => {
                const conversations = new Map(state.conversations);
                conversations.set(roomId, conversation);
                return { conversations };
            });
        } catch (error) {
            console.error('Failed to fetch ChatMessage for room:', error);
        }
    },

    sendMessage: async (roomId, content, senderId) => {
        try {
            const response = await fetch(`${CHAT_API_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomId: roomId, content, senderId }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            throw error;
        }
    },

    initializeConversations: async () => {
        if (get().initialized) return;

        try {
            const conversations = await fetchConversationsForCurrentUser();

            set(state => {
                const conversationsMap = new Map(state.conversations);
                conversations.forEach((conversation: IConversationDetails) => {
                    conversationsMap.set(conversation.id, conversation);
                });
                return { conversations: conversationsMap, initialized: true };
            });
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        }
    },

    refreshConversations: async () => {
        console.log("refreshConversations");
        try {
            const conversations = await fetchConversationsForCurrentUser();

            set(state => {
                const conversationsMap = new Map(state.conversations);
                conversations.forEach((conversation: IConversationDetails) => {
                    conversationsMap.set(conversation.id, conversation);
                });
                return { conversations: conversationsMap };
            });
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        }
    },
}));

useConversationStore.getState().initializeConversations();