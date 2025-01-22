import { User } from "./user.types";

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

export interface IConversationDetails {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  lastMessageAt: number;
}
