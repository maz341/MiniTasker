import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useState } from "react";
import FAB from "./fab_component";
import MyStorageManager from "../Helper/Storage_Helper";
import { categoryKey } from "../const/Const";
import Utilities from "../Helper/Utils";
import { useFocusEffect } from "@react-navigation/native";

export default AllCategoryComponent = ({ navigation }) => {
  useEffect(() => {
    getAllData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllData();
    }, [])
  );
  const storageManager = new MyStorageManager(categoryKey);


  const [categoryList, setCategoryList] = useState([]);

  const myCategoryList = Utilities.getCategoryHardCodedList();

  function getAllData() {
    storageManager.loadArray().then((e) => {
      if (e.length < 1) {
        const myArr = myCategoryList;
        storageManager.saveArray(myArr);
      }
      setCategoryList(e);
    });
  }

  function gotoNextScreen(screenName, item, tempColorModel) {
    navigation.navigate(screenName, {
      item: item,
      tempColorModel: tempColorModel,
    });
  }

  function removeCategory(categoryName) {
    const updatedCategoryList = categoryList.filter(
      (item) => item !== categoryName
    );
    setCategoryList(`categoryId ${categoryName}`);
    setCategoryList(updatedCategoryList);
    storageManager.saveArray(updatedCategoryList);
  }

  return (
    <View style={styles.parentView}>
      <View style={styles.mainView}>
        <FlatList
          data={categoryList}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item, index }) => {
            const specialKey = item + index;
            return (
              <BigTaskCardComponent
                key={specialKey}
                category={item}
                removeCategory={removeCategory}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <FAB onPress={() => gotoNextScreen("Add Category")} title="ADD" />
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
});
