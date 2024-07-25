import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Alert, Text } from "react-native";
import { pinkColorLight, taskKey } from "../const/Const";
import BigCategoryCardComponent from "./category_component";
import { FlatGrid } from "react-native-super-grid";
import FAB from "./fab_component";
import Utilities from "../Helper/Utils";
import MyStorageManager from "../Helper/Storage_Helper";
import { useFocusEffect } from "@react-navigation/native";

export default AllTaskComponent = ({ navigation }) => {
  // My Instance for Storage Manager
  const storageManager = new MyStorageManager(taskKey);

  const [taskList, setTaskList] = useState([]);

  const myList = Utilities.getTaskHardCodedList();
  const myColorList = Utilities.getColorList();

  useEffect(() => {
    populateDataInDatabase();
  }, [1]);

  useFocusEffect(
    React.useCallback(() => {
      populateDataInDatabase();
    }, [])
  );

  function populateDataInDatabase() {
    // storageManager.removeEverythingFromDb();
    // storageManagerCategory.removeEverythingFromDb();

    storageManager.loadArray().then((tasksFromDB) => {
      if (tasksFromDB.length < 1) {
        const myArr = myList;
        storageManager.saveArray(myArr);
      }
      setTaskList(tasksFromDB);
    });
  }

  function gotoNextScreen(screenName, item, tempColorModel) {
    navigation.navigate(screenName, {
      item: item,
      tempColorModel: tempColorModel,
    });
  }

  const handleItemLongPress = (taskId) => {
    // Prompt the user for confirmation
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedTaskList = taskList.filter(
              (item) => item.id !== taskId
            );
            setTaskList(updatedTaskList);

            storageManager.saveArray(updatedTaskList);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.categoryList}>
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>Long Press to Delete Task</Text>
      </View>
      <FlatGrid
        data={taskList}
        spacing={20}
        renderItem={({ item, index }) => {
          const tempColorModel = myColorList[index % myColorList.length];
          return (
            <Pressable
              key={item.id}
              onLongPress={() => handleItemLongPress(item.id)}
              onPress={() =>
                gotoNextScreen("Task Detail", item, tempColorModel)
              }
            >
              <BigCategoryCardComponent
                taskModel={item}
                colorList={myColorList[index % myColorList.length]}
              />
            </Pressable>
          );
        }}
      />
      <FAB onPress={() => gotoNextScreen("Add Task")} title="ADD" />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryList: {
    padding: 8,
    flex: 1,
  },
  instructions: {
    backgroundColor: pinkColorLight,
    marginHorizontal: 30,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  instructionsText: {
    fontSize: 16,
    fontWeight: "800",

    color: "white",
  },
});
