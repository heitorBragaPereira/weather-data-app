import { useAppTheme } from "@/src/hooks/useTheme";
import { Text, View } from "react-native";
import Wifi from "../../assets/home/wifi.svg";
import Header from "../home/components/Header";
import FormNetwork from "./components/formNetwork/FormNetwork";
import { createStyles } from "./styles";

export default function Home() {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.svgContainer}>
          <View style={styles.svg}>
            <Wifi width={60} height={60} />
          </View>
          <Text style={styles.title}>Cadastre sua rede Wi-Fi</Text>
          <FormNetwork />
        </View>
      </View>
    </View>
  );
}
