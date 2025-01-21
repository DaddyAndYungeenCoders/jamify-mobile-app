import {ChatMessage, IConversationDetails} from "@/types/message.types";
import {create} from "zustand";
import {CHAT_API_URL} from "@/constants/Utils";
import {useAuthenticationStore} from "@/store/authentication.store";
import {fetchConversationsForCurrentUser} from "@/utils/fetchConversation";
import {useUserStore} from "@/store/user.store";

interface ConversationStore {
    conversations: Map<string, IConversationDetails>;
    currentConversationId: string | null;
    initialized: boolean;
    // Actions
    addMessage: (roomId: string, message: ChatMessage) => void;
    handleConversations: () => void;
    setCurrentConversation: (conversationId: string) => void;
    updateConversation: (conversation: IConversationDetails) => void;
    // Async actions
    fetchConversationForRoom: (roomId: string) => Promise<void>;
    sendMessage: (roomId: string, content: string, senderId: string) => Promise<void>;
    initializeConversations: (currentUserId: string) => Promise<void>;
    refreshConversations: (currentUserId: string) => Promise<void>;
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
                // Check if the message is already in the conversation
                const messageExists = conversation.messages.some(m => m.id === message.id);
                if (!messageExists) {
                    conversations.set(roomId, {
                        ...conversation,
                        messages: [...conversation.messages, message],
                    });
                }
            }

            return {conversations};
        });
    },

    handleConversations: () => {
        // refresh conversations
        const currentUserId = useUserStore.getState().user?.userProviderId as string;
        useConversationStore.getState().refreshConversations(currentUserId);
    },

    setCurrentConversation: (roomId) => {
        set({currentConversationId: roomId});
    },

    updateConversation: (conversation) => {
        set(state => {
            const conversations = new Map(state.conversations);
            conversations.set(conversation.id, conversation);
            return {conversations};
        });
    },

    fetchConversationForRoom: async (roomId) => {
        console.log("fetchMessageForRoom");
        const {token} = useAuthenticationStore.getState();
        try {
            const response = await fetch(`${CHAT_API_URL}/messages/conversation/room/${roomId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
                return {conversations};
            });
        } catch (error) {
            console.error('Failed to fetch ChatMessage for room:', error);
        }
    },

    sendMessage: async (roomId, content, senderId) => {
        try {
            const response = await fetch(`${CHAT_API_URL}/messages`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({roomId: roomId, content, senderId}),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            throw error;
        }
    },

    initializeConversations: async (currentUserId: string) => {
        if (get().initialized) return;

        try {
            const conversations = await fetchConversationsForCurrentUser(currentUserId);

            set(state => {
                const conversationsMap = new Map(state.conversations);
                conversations.forEach((conversation: IConversationDetails) => {
                    conversationsMap.set(conversation.id, conversation);
                });
                return {conversations: conversationsMap, initialized: true};
            });
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        }
    },

    refreshConversations: async (currentUserId: string) => {
        console.log("refreshConversations");
        try {
            const conversations = await fetchConversationsForCurrentUser(currentUserId);

            set(state => {
                const conversationsMap = new Map(state.conversations);
                conversations.forEach((conversation: IConversationDetails) => {
                    conversationsMap.set(conversation.id, conversation);
                });
                return {conversations: conversationsMap};
            });
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        }
    },
}));

// useConversationStore.getState().initializeConversations(useUserStore().getUser()?.userProviderId as string);