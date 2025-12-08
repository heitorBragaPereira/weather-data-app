import { useAppTheme } from "@/src/hooks/useTheme";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import type { MD3Theme, TextInputProps } from "react-native-paper";

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
        activeOutlineColor={theme.colors.colorOutline}
        outlineColor={theme.colors.primary}
        autoCapitalize="none"
      />
    </View>
  );
}

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    label: {
      fontSize: 16,
      color: "#202020",
    },
    input: {
      backgroundColor: theme.colors.secondary,
      color: "#272727",
      borderRadius: 5,

      fontSize: 16,
    },
  });
