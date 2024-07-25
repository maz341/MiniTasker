import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { blackColor, bgColor, taskBg, categoryKey } from "../const/Const";
import CustButton from "../widgets/Button";
import MyStorageManager from "../Helper/Storage_Helper";
import Utilities from "../Helper/Utils";

export default AddCategoryComponent = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.topNav}>
        <Text style={styles.bigTitle}>New Category</Text>
        <View style={styles.profileIcon}>
          <FontAwesomeIcon color={blackColor} icon={faUser} />
        </View>
      </View>

      {/* My Form */}
      <MyForm navigation={navigation} />
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
    backgroundColor: bgColor,
    padding: 15,
    borderRadius: 15,
  },
  bigTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },

  //Form
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
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});

const MyForm = (props) => {
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const storageManager = new MyStorageManager(categoryKey);

  const handleSubmit = () => {
    if (!category) {
      setErrorMessage("All fields are required.");
    } else {
      setErrorMessage(null);
      saveData();
    }
  };

  // Save New Item to local storage
  async function saveData() {
    console.log("Form submitted:", category);

    const item = category;
    try {
      storageManager.loadArray().then((e) => {
        if (e == null || e.length < 1) {
          const myArr = [];
          myArr.push(item);
          storageManager.saveArray(myArr);
        } else {
          const data = JSON.stringify(e);
          const myArr = JSON.parse(data);
          const isExist = Utilities.isItemExistInListString(item, myArr);
          if (isExist) {
            showToastMethod("Already favourite!");
            return;
          } else {
            myArr.push(item);
            storageManager.saveArray(myArr);
          }
        }
        props.navigation.goBack();
      });
    } catch (error) {
      console.error("Error saving item list:", error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={(text) => setCategory(text)}
        placeholder="Enter Category Name"
      />

      {/* Error Message */}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {/* Create Task Button */}
      <CustButton onPress={handleSubmit} title="Create Category" />
    </View>
  );
};
