import { Children, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

interface Props extends ButtonProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

export default function ButtonComponent(props: Props) {
  const { children, size, ...res } = props;

  const sizes = {
    small: { height: 40, paddingVertical: 0 },
    medium: { height: 50, paddingVertical: 2 },
    large: { height: 56, paddingVertical: 4 },
  };
  return (
    <Button
      {...res}
      contentStyle={sizes[size ?? "medium"]}
      style={styles.button}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5,
  },
});
