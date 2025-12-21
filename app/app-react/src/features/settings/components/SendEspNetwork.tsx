import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { useRegisterDataNetwork } from "@/src/hooks/useRegisterDataNetwork";
import { useAppTheme } from "@/src/hooks/useTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { formNetwork, FormNetwork } from "../schemas/sendEspNetwork";

// interface Form {
//   onSubmit: () => void;
// }

export default function SendEspNetwork() {
  const theme = useAppTheme();
  const { registerDataNetwork } = useRegisterDataNetwork();
  const { control, handleSubmit } = useForm<FormNetwork>({
    resolver: zodResolver(formNetwork),
    defaultValues: {
      ssid: "",
      password: "",
    },
  });

  const onSubmit = (el: any) => {
    console.log("Implementar ", el);
    registerDataNetwork(el);
  };

  const onError = (errors: any) => {
    console.log(errors);
  };
  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="ssid"
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
        icon={() => (
          <MaterialCommunityIcons
            name="content-save"
            size={20}
            color={theme.colors.secondary}
          />
        )}
        style={styles.btn}
        buttonColor={theme.colors.primary}
        onPress={handleSubmit(onSubmit, onError)}
        textColor={theme.colors.secondary}
        labelStyle={{
          textTransform: "uppercase",
        }}
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
  btn: {
    width: "100%",
  },
});
