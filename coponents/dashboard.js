import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faBars,
  faUser,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import {
  bgColor,
  blackColor,
  secondaryColorDark,
  primaryColorDark,
  taskBg,
  taskKey,
  categoryKey,
} from "../const/Const";
import BigTaskCardComponent from "./task_component";
import BigCategoryCardComponent from "./category_component";
import MyStorageManager from "../Helper/Storage_Helper";
import Utilities from "../Helper/Utils";
import { useFocusEffect } from "@react-navigation/native";

export default DashboardComponent = ({ navigation }) => {
  useEffect(() => {
    populateDataInDatabase();
  }, [1]);

  useFocusEffect(
    React.useCallback(() => {
      populateDataInDatabase();
    }, [])
  );

  const [userName, setUserName] = useState("Maaz Kamal");

  const [searchQuery, setSearchQuery] = useState("");

  // Storage Manager For Tasks
  const storageManager = new MyStorageManager(taskKey);

  // Storage Manager for Categories
  const storageManagerCategory = new MyStorageManager(categoryKey);

  const [taskList, setTaskList] = useState([]);
  const [searchTaskList, setSearchTaskList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Get Hard coded task list from utils
  const myList = Utilities.getTaskHardCodedList();

  // Get Hard coded Category list from utils
  const tempCategoryList = Utilities.getCategoryHardCodedList();

  // Get Hard coded Color list from utils
  const myColorList = Utilities.getColorList();

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

    //  If Category List In Database is empty than populate it with hardcoded Category List
    storageManagerCategory.loadArray().then((categoriesFromDB) => {
      if (categoriesFromDB.length < 1) {
        const myArr = tempCategoryList;
        storageManagerCategory.saveArray(myArr);
      }
      setCategoryList(categoriesFromDB);
    });
  }

  function mySearchMethod(query) {
    // Check if searched text is not blank
    if (query) {
      const newData = taskList.filter(function (item) {
        const itemData = item.taskName
          ? item.taskName.toUpperCase()
          : "".toUpperCase();
        const textData = query.toUpperCase();
        const isItemExist = itemData.indexOf(textData) > -1;
        return isItemExist;
      });
      setSearchTaskList(newData);
      setSearchQuery(query);
    } else {
      setSearchTaskList(taskList);
      setSearchQuery(query);
    }
  }

  function gotoNextScreen(screenName, item, tempColorModel) {
    navigation.navigate(screenName, {
      item: item,
      tempColorModel: tempColorModel,
    });
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topNav}>
        <FontAwesomeIcon color="#000" icon={faBars} />
        <View style={styles.profileIcon}>
          <FontAwesomeIcon color={blackColor} icon={faUser} />
        </View>
      </View>

      <Text style={styles.bigTitle}>Hello, {userName}</Text>
      <Text style={styles.smallerTitle}>Have a nice day</Text>

      <View style={styles.favNInputField}>
        <View style={styles.inputFieldView}>
          <TextInput
            style={styles.inputField}
            placeholder="Search..."
            keyboardShouldPersistTaps
            onChangeText={(e) => mySearchMethod(e)}
            // onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <FontAwesomeIcon color={blackColor} icon={faSearch} />
        </View>
        <View style={styles.filterMain}>
          <Pressable onPress={() => alert("Under Development")}>
            <FontAwesomeIcon
              color={primaryColorDark}
              size={18}
              icon={faSliders}
            />
          </Pressable>
        </View>
      </View>

      {/* Category List */}
      <View style={styles.scategoryList}>
        <View style={styles.headingsWithButtons}>
          <Text style={styles.heading}>Tasks</Text>
          <Pressable onPress={() => gotoNextScreen("All Task")}>
            <Text style={styles.textButton}>View Tasks</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <FlatList
            data={
              searchTaskList.length < 1 && !searchQuery
                ? taskList
                : searchTaskList
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingHorizontal: 30,
            }}
            ListEmptyComponent={() => RenderEmptyContainer("No Task Found!")}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item, index }) => {
              const tempColorModel = myColorList[index % myColorList.length];

              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    gotoNextScreen("Task Detail", item, tempColorModel)
                  }
                >
                  <BigCategoryCardComponent
                    taskModel={item}
                    colorList={tempColorModel}
                  />
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      {/* Task List */}
      <View style={styles.sTaskList}>
        <View style={styles.headingsWithButtons}>
          <Text style={styles.heading}>Categories</Text>
          <Pressable onPress={() => gotoNextScreen("All Category")}>
            <Text style={styles.textButton}>View Categories</Text>
          </Pressable>
        </View>

        <FlatList
          data={categoryList}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() =>
            RenderEmptyContainer((text = "No Category Found!"))
          }
          style={{ paddingHorizontal: 30 }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => console.log("YES CATEGORY DETAIL")}
              >
                <BigTaskCardComponent category={item} />
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "white",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  profileIcon: {
    backgroundColor: bgColor,
    padding: 15,
    borderRadius: 15,
  },
  bigTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  smallerTitle: {
    fontSize: 14,
    paddingHorizontal: 30,
    marginTop: 5,
  },
  favNInputField: {
    paddingHorizontal: 30,

    flexDirection: "row",
    marginTop: 20,
  },
  inputFieldView: {
    backgroundColor: bgColor,
    padding: 20,
    borderRadius: 18,
    flexDirection: "row",
    flex: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    height: 55,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  inputField: {
    flex: 1,
  },
  filterMain: {
    backgroundColor: bgColor,
    flex: 1,
    padding: 20,
    height: 55,
    marginLeft: 5,
    alignItems: "center",
    borderRadius: 18,
    elevation: 5,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  heading: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  headingsWithButtons: {
    paddingHorizontal: 30,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textButton: {
    color: secondaryColorDark,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  sTaskList: {
    marginTop: 10,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: taskBg,
    borderRadius: 5,
    padding: 15,
    marginTop: 5,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  emptyMainContainer: {
    height: 100,
    justifyContent: "center",
    flex: 1,
  },
  emptyTextDisplay: {
    alignSelf: "center",
    fontWeight: "600",
  },
});

const RenderEmptyContainer = (text) => {
  return (
    <View style={styles.emptyMainContainer}>
      <View style={styles.emptyTextDisplayView}>
        <Text style={styles.emptyTextDisplay}>{text}</Text>
      </View>
    </View>
  );
};
