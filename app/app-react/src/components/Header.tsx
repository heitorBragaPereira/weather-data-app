import { Bolt } from "lucide-react-native";
import React, { Image, StyleSheet, View } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header() {
  return (
    <View style={styles.box}>
      <Appbar.BackAction onPress={() => {}} />
      <Image source={require("@/src/assets/logo.png")} style={styles.logo} />
      <MaterialIcons name="settings" size={24} color="black" />
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginVertical: 10,
  },
});
