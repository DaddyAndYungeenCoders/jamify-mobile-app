import {CHAT_API_URL} from "@/constants/Utils";
import {ChatMessageToSend, IConversationDetails} from "@/types/message.types";
import {useAuthenticationStore} from "@/store/authentication.store";
import {useUserStore} from "@/store/user.store";

export const fetchConversationsForCurrentUser = async (currentUserId: string): Promise<IConversationDetails[]> => {
    const {token} = useAuthenticationStore.getState();

    const response = await fetch(`${CHAT_API_URL}/messages/get/${currentUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch conversations (${response.status}) because of ${response.statusText}`);
    }

    return await response.json();
};

export const sendMessageToApi = async (message: ChatMessageToSend): Promise<void> => {
    console.log("sendMessage: " + message);
    const {token} = useAuthenticationStore.getState();
    const response = await fetch(`${CHAT_API_URL}/messages/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message)
    })

    if (!response.ok) {
        console.error("There was an error sending the message : " + response.statusText);
    }
}