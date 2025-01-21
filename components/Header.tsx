import { useAuthenticationStore } from "@/store/authentication.store";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserStore } from "@/store/user.store";

const HeaderProfil = () => {
  const { removeJWTToken } = useAuthenticationStore();
  const { getUser } = useUserStore();

  function getFirstAndMiddleLetter(str: string): string {
    if (str.length === 0) return "";

    const firstLetter = str[0];
    const middleIndex = Math.floor(str.length / 2);
    const middleLetter = str[middleIndex];

    return firstLetter + middleLetter;
  }

  const user = getUser();

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            removeJWTToken();
            console.log("disconnect");
          }}
        >
          <AntDesign name="export2" size={28} color="white" />
        </Pressable>
      </View>
      <View style={styles.avatar}>
        {user?.imgUrl ? (
          <Image source={{ uri: user.imgUrl }} style={styles.profileImage} />
        ) : (
          <Text style={styles.text}>
            {getFirstAndMiddleLetter(user?.name || "").toUpperCase()}
          </Text>
        )}
      </View>
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
});
