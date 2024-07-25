import React from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNoteSticky, faTrash } from "@fortawesome/free-solid-svg-icons";
import { blackColor, pinkColor, taskBg } from "../const/Const";

export default BigTaskCardComponent = (props) => {
  const category = props.category;

  const handleRemoveClick = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            props.removeCategory(category);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.smallTaskCard}>
      <View style={styles.btmFColumn}>
        <FontAwesomeIcon icon={faNoteSticky} size={20} color={pinkColor} />
      </View>
      <View style={styles.btmSColumn}>
        <Text style={styles.smallTaskName}>{category}</Text>
      </View>
      <View style={styles.btmTColumn}>
        <Pressable onPress={handleRemoveClick}>
          <FontAwesomeIcon icon={faTrash} size={15} color={blackColor} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallTaskCard: {
    height: 100,
    width: "100%",
    backgroundColor: taskBg,
    marginBottom: 15,
    borderRadius: 25,
    padding: 20,
    flexDirection: "row",
  },
  btmFColumn: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 60,
    marginRight: 15,
  },
  btmSColumn: { flex: 3, justifyContent: "center" },
  smallTaskName: {
    fontWeight: "600",
    fontSize: 16,
  },
  btmTColumn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
