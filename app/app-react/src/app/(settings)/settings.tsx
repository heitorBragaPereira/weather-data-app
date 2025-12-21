import React, { StyleSheet, View } from "react-native";
import SettingsComponent from "../../features/settings/index";

export default function Settings() {
  return (
    <View style={styles.container}>
      <SettingsComponent />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    gap: 10,
  },
});
