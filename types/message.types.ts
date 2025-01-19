import { User } from "./user.types";

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  senderId: string;
  status?: "sent" | "delivered" | "read";
}

export interface ConversationDetails {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessageAt: number;
}
