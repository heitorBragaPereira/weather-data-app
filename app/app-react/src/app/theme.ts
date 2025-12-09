import { MD3LightTheme as DefaultTheme, MD3Theme } from "react-native-paper";

export type AppCustomColors = {
  textDarkPrimary: string;
  textDarkSecondary: string;
  colorOutline: string;
  textPrimary: string;
  textLight: string;
};
export interface AppTheme extends MD3Theme {
  myOwnProperty: boolean;
  colors: MD3Theme["colors"] & AppCustomColors;
}
export const theme: AppTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ff8d3cff",
    secondary: "#f8f8f8ff",
    textDarkPrimary: "#162e1aff",
    textDarkSecondary: "#797979ff",

    // INPUTS
    colorOutline: "#c05d07ff",

    // text
    textPrimary: "#0f8a38ff",
    textLight: "#FFFF",
  },
};
