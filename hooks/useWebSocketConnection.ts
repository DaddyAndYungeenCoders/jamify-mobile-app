import { useEffect } from "react";
import io from "socket.io-client";
import { useConversationStore } from "@/store/conversation.store";
import { WS_API_URL } from "@/constants/Utils";
import { ChatMessage } from "@/types/message.types";
import { useUserStore } from "@/store/user.store";

export const useWebSocketConnection = () => {
  const addMessage = useConversationStore((state) => state.addMessage);
  const handleConversations = useConversationStore(
    (state) => state.handleConversations,
  );
  // const usersId = ["123", "456", "789"];
  const { loading, getUser } = useUserStore();
  const user = getUser();
  const currentUserId = user?.userProviderId;
  // usersId.push(currentUserId);

  useEffect(() => {
    if (loading) {
      console.log("LOADING EN COUR");
      return;
    }
    //FIXME : just for testing, remove for loop after
    // for (const userId of usersId) {
    const socket = io(`${WS_API_URL}`, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(
        "Connected to Socket.io server with user id: " + user?.userProviderId,
      );
      socket.emit("register", currentUserId ? currentUserId : "");
    });

    socket.on("new-message", (data: ChatMessage) => {
      console.log("New message:", data);
      addMessage(data.roomId, data);
      handleConversations();
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.io connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
      return () => {
        socket.disconnect();
      };
    });

    // }
  }, [loading]);
};

