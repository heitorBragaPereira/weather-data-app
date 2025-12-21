import { StatusBar, StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { theme } from "./theme";
import Settings from "../features/settings";

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.header}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent
        />
        <Settings />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "100%",
    backgroundColor: theme.colors.secondary,
  },
});
