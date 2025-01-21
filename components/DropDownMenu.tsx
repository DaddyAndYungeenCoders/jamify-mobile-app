import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";

interface DropdownMenuProps {
  onCreatePress: () => void;
  onJoinPress: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const DropDownMenu: React.FC<DropdownMenuProps> = ({
  onCreatePress,
  onJoinPress,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;

  const showMenu = () => {
    setIsVisible(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.timing(blurAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const hideMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -400,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(blurAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        setIsVisible(false);
      }, 50);
    });
  };

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  return (
    <>
      <Pressable style={styles.plusButton} onPress={showMenu}>
        <Feather name="plus" size={24} color="white" />
      </Pressable>

      {isVisible && (
        <View style={[StyleSheet.absoluteFill, styles.menuOverlay]}>
          <AnimatedBlurView
            intensity={blurAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 20],
            })}
            style={StyleSheet.absoluteFill}
          >
            <Animated.View
              style={[
                styles.menuBackdrop,
                {
                  opacity: blurAnim,
                },
              ]}
            >
              <Pressable style={styles.pressableArea} onPress={hideMenu} />
            </Animated.View>
          </AnimatedBlurView>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <MenuItem
              icon="plus-circle"
              text="Créer un event"
              onPress={() => {
                hideMenu();
                setTimeout(onCreatePress, 250);
              }}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="users"
              text="Rejoindre un event"
              onPress={() => {
                hideMenu();
                setTimeout(onJoinPress, 250);
              }}
            />
          </Animated.View>
        </View>
      )}
    </>
  );
};

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Feather name={icon} size={20} color="white" />
    <ThemedText style={styles.menuText}>{text}</ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  plusButton: {
    padding: 8,
    zIndex: 4,
  },
  menuOverlay: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 2,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  pressableArea: {
    flex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.05,
    right: SCREEN_WIDTH * 0.1,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    zIndex: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: "white",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 4,
  },
});

export default DropDownMenu;
