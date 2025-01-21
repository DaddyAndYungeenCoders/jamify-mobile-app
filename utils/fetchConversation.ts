import {CHAT_API_URL} from "@/constants/Utils";
import {ChatMessageToSend, IConversationDetails} from "@/types/message.types";
import {useAuthenticationStore} from "@/store/authentication.store";

export const fetchConversationsForCurrentUser = async (): Promise<IConversationDetails[]> => {
    const {token} = useAuthenticationStore.getState();
    // FIXME: Replace with actual user ID
    const userId = "123";
    const response = await fetch(`${CHAT_API_URL}/messages/get/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //FIXME
            // 'Authorization': `Bearer ${token}`
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJqYW1pZnktdWFhLWtleS1pZCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJEYW1pZW4gTWFpbGhlYmlhdSIsImlzcyI6Imh0dHBzOi8vamFtaWZ5LmRhZGR5b3Jub3QueHl6L2phbWlmeS11YWEiLCJlbWFpbCI6ImRhbWllbm1haWxoZWJpYXVAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImNvdW50cnkiOiJGUiIsInByb3ZpZGVyIjoic3BvdGlmeSIsImlkIjoiMTEyMjI5MTQzMCIsImlhdCI6MTczNzQwOTgzNCwiZXhwIjoxNzM3NDk2MjM0fQ.QBpBMpnjTh1S87Q0ZoxtuIFNnQlc4A4Cwb6A5-o3-EQkmovNrq97Lx4SW9u4gA7LU6DqVkdhvdK8kA7RsSQP9TQrPuP9Au9VESxjobZOfHuLmk2gmjWb9QgsnX7YQSmQSvZbJ_Sz_DYaApPoCGeck-ayx_67r2wJ_WVdbIOIVeZFHF_AYkVknChYguNk3zPem5PspItHXwJ0xnJSGK7uWrnDftylGtNCUDN9xC_YOaxTh4fAkeC3KdwDCKt9hBBmGJIQSzibRgvd2PQ0Xt1Nfl2unV7J5Ddmf_dC7leiOqeXJ9Ti_P4H0z-xRd4d_awtMx47Ph5AAgod-htxjuEMJQ`
        },
    });


    if (!response.ok) {
        throw new Error(`Failed to fetch conversations (${response.status}) because of ${response.statusText}`);
    }

    return await response.json();
};

export const sendMessageToApi = async (message: ChatMessageToSend): Promise<void> => {
    console.log("sendMessage: " + message);
    const response = await fetch(`${CHAT_API_URL}/messages/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //FIXME
            // 'Authorization': `Bearer ${token}`
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJqYW1pZnktdWFhLWtleS1pZCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJEYW1pZW4gTWFpbGhlYmlhdSIsImlzcyI6Imh0dHBzOi8vamFtaWZ5LmRhZGR5b3Jub3QueHl6L2phbWlmeS11YWEiLCJlbWFpbCI6ImRhbWllbm1haWxoZWJpYXVAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImNvdW50cnkiOiJGUiIsInByb3ZpZGVyIjoic3BvdGlmeSIsImlkIjoiMTEyMjI5MTQzMCIsImlhdCI6MTczNzQwOTgzNCwiZXhwIjoxNzM3NDk2MjM0fQ.QBpBMpnjTh1S87Q0ZoxtuIFNnQlc4A4Cwb6A5-o3-EQkmovNrq97Lx4SW9u4gA7LU6DqVkdhvdK8kA7RsSQP9TQrPuP9Au9VESxjobZOfHuLmk2gmjWb9QgsnX7YQSmQSvZbJ_Sz_DYaApPoCGeck-ayx_67r2wJ_WVdbIOIVeZFHF_AYkVknChYguNk3zPem5PspItHXwJ0xnJSGK7uWrnDftylGtNCUDN9xC_YOaxTh4fAkeC3KdwDCKt9hBBmGJIQSzibRgvd2PQ0Xt1Nfl2unV7J5Ddmf_dC7leiOqeXJ9Ti_P4H0z-xRd4d_awtMx47Ph5AAgod-htxjuEMJQ`
        },
        body: JSON.stringify(message)
    })

    if (!response.ok) {
        console.error("There was an error sending the message : " + response.statusText);
    }
}