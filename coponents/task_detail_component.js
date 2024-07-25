import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNoteSticky, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  blackColor,
  pinkColor,
  taskBg,
  primaryColor,
  secondaryColor,
  primaryColorLight,
  bgColor,
} from "../const/Const";

export default TaskDetailComponent = (props) => {
  const taskModel = props.route.params.item;
  const colorModel = props.route.params.tempColorModel;

  const lightColor = colorModel.light;
  const simpleColor = colorModel.simple;
  const darkColor = colorModel.dark;

  return (
    <View style={styles.mainView}>
      <View style={[styles.bigTaskCard, { backgroundColor: simpleColor }]}>
        <View style={[styles.lineDesign, { backgroundColor: lightColor }]} />
        <View style={[styles.lineDesign2, { backgroundColor: lightColor }]} />
        <View
          style={[styles.circleDesignOnlyBorder, { borderColor: lightColor }]}
        />

        <View style={[styles.circleDesign, { backgroundColor: lightColor }]} />

        <Text style={[styles.nameBg, { color: lightColor }]} numberOfLines={1}>
          {taskModel.taskName}
        </Text>
        <Text style={styles.taskName}>{taskModel.taskName}</Text>
      </View>

      {/* Details */}
      {/* title date descripoto categor */}

      <View style={styles.detailView}>
        <View style={styles.single}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.data}>{taskModel.date}</Text>
        </View>
        <View style={styles.single}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.data}>{taskModel.category}</Text>
        </View>
        <View style={styles.single}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.data}>{taskModel.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: bgColor,
    flex: 1,
  },
  bigTaskCard: {
    overflow: "hidden",
    height: 150,
    margin: 20,
    borderRadius: 20,
    backgroundColor: primaryColor,
    justifyContent: "space-around",
    position: "relative",
  },
  circleDesign: {
    backgroundColor: primaryColorLight,
    height: 100,
    width: 100,
    position: "absolute",
    top: -20,
    right: -40,
    borderRadius: 70,
  },
  nameBg: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 10,
    fontSize: 60,
    width: "100%",
    overflow: "hidden",
    top: 40,
    fontWeight: "800",
    opacity: 0.4,
    transform: [{ rotate: "15deg" }],
  },
  circleDesignOnlyBorder: {
    borderColor: primaryColorLight,
    borderWidth: 2,
    backgroundColor: "transparent",
    height: 120,
    width: 120,
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
  taskName: {
    zIndex: 12,
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 0.8,
    alignSelf: "center",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  detailView: {

    flex: 1,
    padding: 20,
  },
  single: {
marginBottom:30,
  },
  label: {
    fontSize: 16,
    color: blackColor,
    marginBottom: 5,
  },
  data: {
    fontSize: 20,
  },
});
