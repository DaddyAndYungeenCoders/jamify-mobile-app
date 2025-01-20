import { useEffect } from "react";
import io from "socket.io-client";
import { useConversationStore } from "@/store/ConversationStore";
import { WS_API_URL } from "@/constants/Utils";

export const useWebSocketConnection = () => {
    const addMessage = useConversationStore(state => state.addMessage);

    useEffect(() => {
        const socket = io(`http://${WS_API_URL}`, {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
            // FIXME: Replace with actual user ID
            socket.emit('register', '123');
        });

        socket.on('NEW_MESSAGE', (data) => {
            addMessage(data.conversationId, data.message);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket.io connection error:', error);
        });

        // Cleanup à la déconnexion
        return () => {
            socket.disconnect();
        };
    }, []);
};