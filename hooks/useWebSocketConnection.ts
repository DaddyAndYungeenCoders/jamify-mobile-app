import {useEffect} from "react";
import io from "socket.io-client";
import {useConversationStore} from "@/store/ConversationStore";
import {WS_API_URL} from "@/constants/Utils";
import {ChatMessage} from "@/types/message.types";

export const useWebSocketConnection = () => {
    const addMessage = useConversationStore(state => state.addMessage);
    const usersId = ["123", "456", "789"];

    useEffect(() => {
        //FIXME : just for testing, remove for loop after
        for (const userId of usersId) {
            const socket = io(`http://${WS_API_URL}`, {
                transports: ['websocket'],
            });

            socket.on('connect', () => {
                console.log('Connected to Socket.io server');
                // FIXME: Replace with actual user ID
                socket.emit('register', userId);
            });

            socket.on('new-message', (data: ChatMessage) => {
                console.log('New message:', data);
                addMessage(data.roomId, data);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from Socket.io server');
            });

            socket.on('connect_error', (error) => {
                console.error('Socket.io connection error:', error);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from Socket.io server');
                return () => {
                    socket.disconnect();
                };
            });

        }
    }, []);
};