import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { useMemo } from "react";
import { useRouter } from "expo-router";

// Définition des types
interface Conversation {
  id: string;
  name: string;
  message: string;
  avatar: string;
}

interface ConversationItemProps {
  item: Conversation;
  onPress: (conversation: Conversation) => void;
}

interface Styles {
  container: ViewStyle;
  listContainer: ViewStyle;
  profilHeader: ImageStyle;
  back: ViewStyle;
  conversationItem: ViewStyle;
  avatar: ImageStyle;
  textContainer: ViewStyle;
  name: TextStyle;
  message: TextStyle;
}

// Données mockées
const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Laure",
    message:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Hypolite",
    message:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry..., Lorem ipsum is simply dummy text of the printing and typesetting industry..., Lorem ipsum is simply dummy text of the printing and typesetting industry..., Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "3",
    name: "Aurelien",
    message:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const ConversationItem: React.FC<ConversationItemProps> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.conversationItem}
    onPress={() => onPress(item)}
    activeOpacity={0.7}
  >
    <Image
      source={{ uri: item.avatar }}
      style={styles.avatar}
      fadeDuration={300}
    />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message} numberOfLines={2}>
        {item.message}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function Conversation(): JSX.Element {
  const router = useRouter();

  const handleConversationPress = (conversation: Conversation): void => {
    router.push({
      pathname: "/(details)/conversation-detail",
      params: { conversation: JSON.stringify(conversation) },
    });
  };

  const renderItem: ListRenderItem<Conversation> = useMemo(
    () =>
      ({ item }) => (
        <ConversationItem item={item} onPress={handleConversationPress} />
      ),
    [handleConversationPress],
  );

  const keyExtractor = useMemo(() => (item: Conversation) => item.id, []);

  const ItemSeparator = (): JSX.Element => (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 2,
          borderRadius: 5,
          opacity: 0.6,
          width: "90%",
          backgroundColor: "white",
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList<Conversation>
        data={CONVERSATIONS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={5}
      />
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  listContainer: {},
  profilHeader: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 10,
  },
  back: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(110, 108, 108, 0.7)",
    borderRadius: 10,
    marginTop: 30,
    margin: 10,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#ddd",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
  },
});
