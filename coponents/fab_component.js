import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { pinkColor, primaryColor } from "../const/Const";

const FAB = (props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    position: "absolute",
    bottom: 70,
    right: 40,
    backgroundColor: pinkColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
