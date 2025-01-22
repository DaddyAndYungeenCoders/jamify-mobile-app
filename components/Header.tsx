import {useAuthenticationStore} from "@/store/authentication.store";
import {FlatList, Image, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {useUserStore} from "@/store/user.store";
import {useNotificationStore} from "@/store/notification.store";
import {useState} from "react";
import ClassicButton from "@/components/ClassicButton";

const HeaderProfil = () => {
    const {removeJWTToken} = useAuthenticationStore();
    const {getUser} = useUserStore();
    const {notifications} = useNotificationStore();
    const clearNotification = useNotificationStore().clearNotifications;
    const [isModalVisible, setModalVisible] = useState(false);

    function getFirstAndMiddleLetter(str: string): string {
        if (str.length === 0) return "";

        const firstLetter = str[0];
        const middleIndex = Math.floor(str.length / 2);
        const middleLetter = str[middleIndex];

        return firstLetter + middleLetter;
    }

    const user = getUser();
    const unreadCount = notifications?.length || 0;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const clearNotif = () => {
        clearNotification();
        toggleModal();
    }

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Pressable
                    onPress={() => {
                        removeJWTToken();
                        console.log("disconnect");
                    }}
                >
                    <AntDesign name="export2" size={28} color="white"/>
                </Pressable>
            </View>
            <View style={styles.avatarContainer}>
                <Pressable onPress={toggleModal}>
                    <View style={styles.avatar}>
                        {user?.imgUrl ? (
                            <Image source={{uri: user.imgUrl}} style={styles.profileImage}/>
                        ) : (
                            <Text style={styles.text}>
                                {getFirstAndMiddleLetter(user?.name || "").toUpperCase()}
                            </Text>
                        )}
                    </View>
                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </Pressable>
            </View>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Notifications</Text>
                        <FlatList
                            data={notifications}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationTitle}>{item.title}</Text>
                                    <Text style={styles.notificationContent}>{item.content}</Text>
                                </View>
                            )}
                        />
                        <View style={styles.closeButton}>
                            <ClassicButton title={"Clear"} onPress={clearNotif}/>
                            <ClassicButton title={"Close"} onPress={toggleModal}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default HeaderProfil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        height: 50,
        maxHeight: 50,
        marginHorizontal: "5%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    button: {
        height: 40,
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontFamily: "Jost_600SemiBold",
        fontSize: 20,
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    notificationItem: {
        marginBottom: 10,
        backgroundColor: "#595959",
        borderRadius: 10,
        padding: 5,
    },
    notificationTitle: {
        fontWeight: "bold",
        color: "white",
    },
    notificationContent: {
        color: "white",
    },
    closeButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    errorText: {
        color: "red",
    },
});
