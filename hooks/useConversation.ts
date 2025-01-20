import { ConversationDetails } from "@/types/message.types";
import { User } from "@/types/user.types";

export const useConversation = (conversationId: string) => {
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Vous",
      imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "vous@example.com",
      country: "France",
      provider: "google",
      userProviderId: "123",
      roles: ["user"],
      playlists: [],
      events: [],
      jams: [],
      badges: [],
    },
    {
      id: "2",
      name: "John Doe",
      imgUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "john@example.com",
      country: "USA",
      provider: "google",
      userProviderId: "456",
      roles: ["user"],
      playlists: [],
      events: [],
      jams: [],
      badges: [],
    },
  ];

  const mockData: ConversationDetails = {
    id: conversationId,
    participants: mockUsers,
    messages: [
      {
        id: "1",
        content: "Salut ! Comment vas-tu ?",
        timestamp: Date.now() - 3600000,
        senderId: "1",
        status: "read",
      },
      {
        id: "2",
        content: "Très bien et toi ?",
        timestamp: Date.now() - 3500000,
        senderId: "2",
        status: "read",
      },
      {
        id: "3",
        content: "Salut ! Comment vas-tu ?",
        timestamp: Date.now() - 3600000,
        senderId: "1",
        status: "read",
      },
      {
        id: "4",
        content: "Très bien et toi ?",
        timestamp: Date.now() - 3500000,
        senderId: "2",
        status: "read",
      },
      {
        id: "5",
        content: "Super ! Tu fais quoi aujourd'hui ?",
        timestamp: Date.now() - 3400000,
        senderId: "1",
        status: "read",
      },
      {
        id: "6",
        content:
          "Je travaille sur un projet React Native, c'est assez intéressant !",
        timestamp: Date.now() - 3300000,
        senderId: "2",
        status: "read",
      },
    ],
    lastMessageAt: Date.now(),
  };

  return {
    data: mockData,
    isLoading: false,
    error: null,
  };
};
