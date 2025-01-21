import { User } from "./user.types";

// export interface Message {
//   id: string;
//   content: string;
//   timestamp: number;
//   senderId: string;
//   status?: "sent" | "delivered" | "read";
// }
//
export interface ChatMessageToSend {
  content: string;
  senderId: string;
  roomId: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  roomId: string;
  metadata?: any;
}

export interface ConversationDetails {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  lastMessageAt: number;
}
