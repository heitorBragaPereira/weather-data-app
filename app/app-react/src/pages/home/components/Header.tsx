import { Bolt } from "lucide-react-native";
import React, { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

export default function Header() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>ClimaHub</Text>
      <IconButton
        icon={(props) => <Bolt {...props} color="#1d1d1d" />}
        size={20}
        style={styles.iconButton}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    position: "relative",
    width: "100%",
    height: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#1d1d1d",
  },
  iconButton: {
    position: "absolute",
    bottom: 12,
    right: 10,
    borderRadius: 50,
  },
});
