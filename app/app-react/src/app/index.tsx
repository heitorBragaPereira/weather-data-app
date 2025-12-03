import { StatusBar, StyleSheet, View } from "react-native";
import Home from "../pages/home/Home";

export default function Index() {
  return (
    <View style={styles.header}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "100%",
    backgroundColor: "#22211f",
  },
});
