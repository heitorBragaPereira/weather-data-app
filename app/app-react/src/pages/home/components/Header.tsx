import { Bolt } from "lucide-react-native";
import React, { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

export default function Header() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>ClimaHub</Text>
      <IconButton
        icon={(props) => <Bolt {...props} color="#ffffff" />}
        size={20}
        style={styles.iconButton}
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
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#FFF",
  },
  iconButton: {
    backgroundColor: "#1d1c1a",
    borderRadius: 50,
  },
});
