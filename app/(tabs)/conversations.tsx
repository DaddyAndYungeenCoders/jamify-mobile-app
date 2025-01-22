import {
    FlatList,
    Image,
    ImageStyle,
    ListRenderItem,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import {useEffect, useMemo} from "react";
import {useRouter} from "expo-router";
import {IConversationDetails} from "@/types/message.types";
import {useConversationStore} from "@/store/conversation.store";
import {User} from "@/types/user.types";
import {useUserStore} from "@/store/user.store";

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

interface ConversationItemProps {
    item: IConversationDetails;
    onPress: (conversation: IConversationDetails) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
                                                               item,
                                                               onPress,
                                                           }) => {
    const lastMessage = item.messages.length > 0 ? item.messages[item.messages.length - 1].content : "No messages yet";
    const user = useUserStore((state) => state.user);
    const currentUserId = user?.userProviderId;

    const otherParticipant: User | undefined = item.participants.find(p => p.userProviderId !== currentUserId);
    console.log("Other participant in general:", otherParticipant?.name);

    return (
        <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <Image
                source={{uri: otherParticipant?.imgUrl || 'default-avatar-url'}}
                style={styles.avatar}
                fadeDuration={300}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{otherParticipant?.name || 'Unknown'}</Text>
                <Text style={styles.message} numberOfLines={2}>
                    {lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function Conversation(): JSX.Element {
    const router = useRouter();
    const {conversations, initializeConversations, initialized} = useConversationStore();
    const {getUser} = useUserStore();
    const user = getUser();

    useEffect(() => {
        console.log("conversations components : ", JSON.stringify(conversations));
        if (!initialized) {
            if (user) {
                initializeConversations(user.userProviderId);
            }
        }
    }, [initialized, initializeConversations]);

    const conversationsArray = useMemo(() =>
            Array.from(conversations.values()).sort((a, b) => b.lastMessageAt - a.lastMessageAt),
        [conversations]
    );

    const handleConversationPress = (conversation: IConversationDetails): void => {
        router.push({
            pathname: "/(details)/conversation-detail",
            params: {conversation: JSON.stringify(conversation)},
        });
    };

    const renderItem: ListRenderItem<IConversationDetails> = useMemo(
        () =>
            ({item}) => (
                <ConversationItem item={item} onPress={handleConversationPress}/>
            ),
        [handleConversationPress],
    );

    const keyExtractor = useMemo(() => (item: IConversationDetails) => item.id, []);

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
            <FlatList<IConversationDetails>
                data={conversationsArray}
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
