import { Stack, router } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",

        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          ) : null,

        headerRight: () => (
          <Pressable onPress={() => router.push("/settings")}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </Pressable>
        ),
      }}
    />
  );
}
