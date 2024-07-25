import {
  primaryColor,
  secondaryColor,
  secondaryColorDark,
  secondaryColorLight,
  primaryColorDark,
  primaryColorLight,
  purpleColor,
  purpleColorDark,
  purpleColorLight,
  pinkColor,
  pinkColorDark,
  pinkColorLight,
} from "../const/Const";

class Utilities {
  static isItemExistInList(itemToCheck, list) {
    const isObjectExists = list.some((singleItem) => {
      return singleItem.id === itemToCheck.id;
    });
    return isObjectExists;
  }
  static isItemExistInListString(itemToCheck, list) {
    const isObjectExists = list.some((singleItem) => {
      return singleItem === itemToCheck;
    });
    return isObjectExists;
  }
  static getColorList() {
    return [
      {
        simple: primaryColor,
        dark: primaryColorDark,
        light: primaryColorLight,
      },
      {
        simple: secondaryColor,
        dark: secondaryColorDark,
        light: secondaryColorLight,
      },
      {
        simple: pinkColor,
        dark: pinkColorDark,
        light: pinkColorLight,
      },
      {
        simple: purpleColor,
        dark: purpleColorDark,
        light: purpleColorLight,
      },
    ];
  }
  static getCategoryHardCodedList() {
    return [
      "Personal Work",
      "Grocerry",
      "Utility",
      "Entertainment",
    ];
  }
  static getTaskHardCodedList() {
    return [
      {
        id: 1,
        category: "Personal Work",
        taskName: "Walk The Dog!",
        date: "January 2023",
        descriptiFon:
          "Fluffy has to go out for a walk so that he can be free like a bird, even thought he is a dog.",
      },
      {
        id: 2,
        category: "Grocerry",
        taskName: "Feed The Fishes and Birds",
        date: "September 2020",
        description:
          "Feed the birds and fishes otherwise their natural habitat will make them eat each other. DONT FORGET TO FEED EM!",
      },
      {
        id: 3,
        category: "Utility",
        taskName: "Vaccum Dining Hall",
        date: "January 2023",
        description:
          "Have to vaccum the dining hall otherwise my wife will beat me up and won't give me anything to eat!",
      },
      {
        id: 4,
        category: "Entertainment",
        taskName: "To my Cantek Assignment",
        date: "September 2020",
        description:
          "I have to complete my cantek assignment other wise i wont pass the exam",
      },
    ];
  }
}

export default Utilities;
