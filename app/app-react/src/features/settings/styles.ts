import { AppTheme } from "@/src/app/theme";
import { StyleSheet } from "react-native";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: { height: "100%", display: "flex" },
    body: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.colors.secondary,
      // borderTopRightRadius: 35,
      // borderTopLeftRadius: 35,
      padding: 20,
    },
    svgContainer: { width: "100%", display: "flex", alignItems: "center" },
    svg: {
      width: 80,
      height: 60,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      width: "100%",
      display: "flex",
      gap: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 300,
      color: theme.colors.textDark,
      marginVertical: 15,
    },
  });
