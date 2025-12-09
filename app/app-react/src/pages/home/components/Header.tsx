import { Bolt } from "lucide-react-native";
import React, { Image, StyleSheet, View } from "react-native";
import { Appbar, IconButton } from "react-native-paper";

export default function Header() {
  return (
    <View style={styles.box}>
      <Appbar.BackAction onPress={() => {}} />
      <Image source={require("@/src/assets/logo.png")} style={styles.logo} />
      <IconButton
        icon={(props) => <Bolt {...props} color="#1d1d1d" />}
        onPress={() => console.log("Pressed")}
      />
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
