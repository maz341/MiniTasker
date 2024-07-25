import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  blackColor,
  bgColor,
  taskBg,
  pinkColorLight,
  pinkColor,
  purpleColor,
  primaryColor,
  primaryColorDark,
  taskKey,
  pinkColorExtraLight,
  categoryKey,
} from "../const/Const";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustButton from "../widgets/Button";
import MyStorageManager from "../Helper/Storage_Helper";
import Utilities from "../Helper/Utils";
import uuid from "react-native-uuid";

export default AddTaskComponent = ({ navigation }) => {
  const storageManagerCategory = new MyStorageManager(categoryKey);

  const [categoriesList, setCategoryList] = useState([]);
  const tempCategoryList = Utilities.getCategoryHardCodedList();

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    // storageManagerCategory.removeEverythingFromDb();

    storageManagerCategory.loadArray().then((e) => {
      if (e.length < 1) {
        const myArr = tempCategoryList;
        storageManagerCategory.saveArray(myArr);
      }
      setCategoryList(e);
    });
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topNav}>
        <Text style={styles.bigTitle}>New Task</Text>
        <View style={styles.profileIcon}>
          <FontAwesomeIcon color={pinkColor} icon={faUser} />
        </View>
      </View>

      {/* My Form */}
      <MyForm categoryList={categoriesList} navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    flex: 1,
    padding: 30,
    paddingTop: 10,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileIcon: {
    backgroundColor: pinkColorExtraLight,
    padding: 15,
    borderRadius: 15,
  },
  bigTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },

  //Form
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: blackColor,
  },
  input: {
    borderWidth: 1,
    borderColor: taskBg,
    borderRadius: 5,
    padding: 15,
    marginTop: 5,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: taskBg,
    borderRadius: 5,
    padding: 15,
    paddingTop: 15,
    marginTop: 5,
  },
  datePicker: {
    marginTop: 10,
    alignSelf: "left",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  categoryMain: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 5,
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: bgColor,
    marginHorizontal: 3,
    marginVertical: 5,
    borderRadius: 20,
  },
  selectedCategoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: pinkColorExtraLight,
    marginHorizontal: 3,
    marginVertical: 5,
    borderRadius: 20,
  },
  selectedCategoryText: {
    fontWeight: "400",
    color: pinkColor,
  },
  categoryText: {
    fontWeight: "400",
    color: purpleColor,
  },
});

const MyForm = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Initializing Local Storage
  const storageManager = new MyStorageManager(taskKey);

  const handleSubmit = () => {
    if (!title || !date || !description || !selectedCategory) {
      setErrorMessage("All fields are required.");
    } else {
      setErrorMessage(null);
      saveData();
    }
  };

  // Save New Item to local storage
  async function saveData() {
    const id = uuid.v4();
    console.log("Form submitted:", {
      id: id,
      taskName: title,
      date: formatDate(date),
      description: description,
      category: selectedCategory,
    });

    const item = {
      id: id,
      taskName: title,
      date: formatDate(date),
      description: description,
      category: selectedCategory,
    };

    try {
      storageManager.loadArray().then((e) => {
        if (e == null || e.length < 1) {
          const myArr = [];
          myArr.push(item);
          storageManager.saveArray(myArr);
        } else {
          const data = JSON.stringify(e);
          const myArr = JSON.parse(data);
          myArr.push(item);
          storageManager.saveArray(myArr);
        }
        console.log("SAVED");
props.navigation.goBack();
      });
    } catch (error) {
      console.error("Error saving item list:", error);
    }
  }

  function formatDate(inputDateStr) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const inputDate = new Date(inputDateStr);
    return inputDate.toLocaleDateString(undefined, options);
  }

  const onChange = (event, selectedDate) => {
    // on cancel set date value to previous date
    if (event?.type === "dismissed") {
      setDate(date);
      return;
    }
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Date:</Text>
      <DateTimePicker
        style={styles.datePicker}
        accentColor={primaryColor}
        textColor={primaryColorDark}
        value={date}
        positiveButton={{ label: "OK", textColor: "green" }}
        onChange={onChange}
        // onChange={(newDate) => setDate(newDate)}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.inputMultiline}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter description"
        multiline={true}
        numberOfLines={4}
      />

      {/*  */}
      <Text style={styles.label}>Categories:</Text>
      <View style={styles.categoryMain}>
        {props.categoryList.map((category, index) => {
          const isSelected = category == selectedCategory;
          const categoryItemStyle = isSelected
            ? styles.selectedCategoryItem
            : styles.categoryItem;
          const categoryTextStyle = isSelected
            ? styles.selectedCategoryText
            : styles.categoryText;
          return (
            <Pressable
              key={category + index}
              onPress={() => setSelectedCategory(category)}
            >
              <View style={categoryItemStyle}>
                <Text style={categoryTextStyle}>{category}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Error Message */}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {/* Create Task Button */}
      <CustButton onPress={handleSubmit} title="Create New Task" />
    </View>
  );
};
