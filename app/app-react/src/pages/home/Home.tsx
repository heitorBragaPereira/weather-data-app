import React, { StyleSheet, Text, View } from "react-native";
import Header from "../home/components/Header";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});
