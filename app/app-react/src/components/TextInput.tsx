import { useAppTheme } from "@/src/hooks/useTheme";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import type { MD3Theme, TextInputProps } from "react-native-paper";
import { AppTheme } from "../app/theme";

interface Props extends TextInputProps {
  errorMessage?: string;
}

export default function TextInputComponent(props: Props) {
  const { errorMessage, ...rest } = props;
  const theme = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        mode="flat"
        style={styles.input}
        activeUnderlineColor={theme.colors.colorFocusOutlined}
        autoCapitalize="none"
        cursorColor={theme.colors.textDarkFaint}
        selectionColor={theme.colors.textSelection}
        textColor={theme.colors.textDarkFaint}
      />
    </View>
  );
}

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    input: {
      backgroundColor: "white",
      borderRadius: 5,
      fontSize: 16,
    },
  });
