import { MD3LightTheme as DefaultTheme, MD3Theme } from "react-native-paper";

export type AppCustomColors = {
  colorOutline: string;
  textDark: string;
  textLight: string;
  textSelection: string;
  colorFocusOutlined: string;
  textDarkFaint: string;
  iconLight: string;
  light: string;
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
    primary: "#ff6d08",
    secondary: "#f3f3f3ff",
    light: "#FFFF",

    // Inputs
    colorOutline: "#a7a7a7ff",
    colorFocusOutlined: "#2c2c2cff",

    // texts
    textDark: "#242424ff",
    textDarkFaint: "#797979ff",
    textLight: "#FFFF",
    textSelection: "#2c2c2c3a",

    // Icons
    iconLight: "#3a3a3aff",
  },
};
