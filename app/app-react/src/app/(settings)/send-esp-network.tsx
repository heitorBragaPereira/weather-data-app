import React, { StyleSheet, View } from "react-native";
import SendEsp from "../../features/settings/components/SendEspNetwork";

export default function SendEspNetwork() {
  return (
    <View style={styles.container}>
      <SendEsp />
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
