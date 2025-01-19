import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface HeaderProps {
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
}

interface Styles {
  container: ViewStyle;
  section: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  leftComponent,
  centerComponent,
  rightComponent,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.sectionLeft}>{leftComponent}</View>
      <View style={styles.section}>{centerComponent}</View>
      <View style={styles.sectionRight}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 40,
    width: "100%",
  },
  sectionLeft: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionRight: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default Header;
