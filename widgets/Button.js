import { Pressable, Text, StyleSheet, View } from "react-native";
import { primaryColor } from "../const/Const";

export default function CustButton(props) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.buttonMain}>
        <View style={styles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonMain: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
