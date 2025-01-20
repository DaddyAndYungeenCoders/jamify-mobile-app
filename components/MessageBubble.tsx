import { Message } from "@/types/message.types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  return (
    <View
      style={[
        styles.messageBubble,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.content}</Text>
      <Text style={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  ownMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3e3e3e",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    alignSelf: "flex-end",
    marginTop: 4,
  },
});
