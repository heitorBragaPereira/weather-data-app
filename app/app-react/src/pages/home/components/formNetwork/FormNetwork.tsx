import { StyleSheet, View } from "react-native";
import TextInput from "@/src/components/TextInput";
import Button from "@/src/components/Button";
import { Save } from "lucide-react-native";
import { useAppTheme } from "@/src/hooks/useTheme";
import { useForm, Controller } from "react-hook-form";
import { formNetwork, FormNetwork } from "./formNetworkSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// interface Form {
//   onSubmit: () => void;
// }

export default function FormNetworkComponent() {
  const theme = useAppTheme();
  const { control, handleSubmit } = useForm<FormNetwork>({
    resolver: zodResolver(formNetwork),
  });

  const onSubmit = () => {
    console.log("Implementar ");
  };
  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="network"
        render={({ field, fieldState }) => (
          <TextInput
            label="Nome da rede"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextInput
            label="Senha"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            secureTextEntry
          />
        )}
      />
      <Button
        icon={() => <Save size={20} color={theme.colors.primary} />}
        buttonColor={theme.colors.secondary}
        onPress={handleSubmit(onSubmit)}
      >
        Cadastrar
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    width: "100%",
    display: "flex",
    gap: 10,
  },
});
