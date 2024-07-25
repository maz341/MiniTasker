import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  primaryColor,
  primaryColorDark,
  primaryColorLight,
} from "../const/Const";

export default BigCategoryCardComponent = (props) => {
  const taskModel = props.taskModel;

  const lightColor = props.colorList.light;
  const simpleColor = props.colorList.simple;
  const darkColor = props.colorList.dark;

  return (
    <View style={[styles.bigTaskCard, { backgroundColor: simpleColor }]}>
      <View style={[styles.lineDesign, { backgroundColor: lightColor }]} />
      <View style={[styles.lineDesign2, { backgroundColor: lightColor }]} />
      <View
        style={[styles.circleDesignOnlyBorder, { borderColor: lightColor }]}
      />
      <View style={[styles.circleDesign, { backgroundColor: lightColor }]} />

      <View style={styles.bigTaskCardFrow}>
        <View style={[styles.btcFrowInn, { backgroundColor: darkColor }]}>
          <FontAwesomeIcon icon={faUser} color="white" />
        </View>
        <Text style={styles.btcTaskName}>{taskModel.category}</Text>
      </View>
      <Text style={styles.btcTaskDescription}>{taskModel.taskName}</Text>
      <Text style={styles.btcTaskTime}>{taskModel.date}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  bigTaskCard: {
    overflow: "hidden",
    height: 200,
    width: 170,
    borderRadius: 25,
    backgroundColor: primaryColor,
    padding: 15,
    justifyContent: "space-around",
    position: "relative",
    marginRight: 15,
  },
  btcFrowInn: {
    height: 50,
    width: 50,
    backgroundColor: primaryColorDark,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bigTaskCardFrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  btcTaskName: {
    marginLeft: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  btcTaskDescription: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  btcTaskTime: {
    color: "white",
    fontWeight: "300",
  },
  circleDesign: {
    backgroundColor: primaryColorLight,
    height: 130,
    width: 130,
    position: "absolute",
    top: -20,
    right: -40,
    borderRadius: 70,
  },
  circleDesignOnlyBorder: {
    borderColor: primaryColorLight,
    borderWidth: 2,
    backgroundColor: "transparent",
    height: 150,
    width: 150,
    position: "absolute",
    top: -20,
    right: -40,
    borderRadius: 80,
  },
  lineDesign: {
    backgroundColor: primaryColorLight,
    height: 2,
    width: 55,
    position: "absolute",
    bottom: 48,
    left: 5,
  },
  lineDesign2: {
    backgroundColor: primaryColorLight,
    height: 2,
    width: 55,
    position: "absolute",
    bottom: 55,
    left: 5,
  },
});
