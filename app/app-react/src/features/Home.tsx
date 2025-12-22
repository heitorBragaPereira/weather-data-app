import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/app/theme";
import Logo from "@/src/assets/logo.svg";
import Cloud from "@/src/assets/cloud.svg";
import Humidity from "@/src/assets/humidity.svg";
import Pressao from "@/src/assets/pressao.svg";
import { IconButton } from "react-native-paper";
import { Bolt } from "lucide-react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo width={150} height={45} />
        <IconButton
          icon={() => <Bolt color={theme.colors.iconLight} />}
          size={20}
          onPress={() => router.push("/settings")}
        />
      </View>

      <View style={styles.boxDateTime}>
        <Text style={styles.titleTime}>16:45</Text>
        <Text style={styles.subtitleTime}>Domingo, 21 de Dezembro de 2025</Text>
      </View>

      <View style={styles.cardTemperature}>
        <Text style={styles.titleCardTemperature}>Temperatura ambiente</Text>
        <View style={styles.contentCardTempetrature}>
          <Text style={styles.valueTemperature}>27°C</Text>
          <Cloud width={60} height={60} />
        </View>
      </View>

      <View style={styles.boxCards}>
        <View style={styles.miniCard}>
          <View style={[styles.boxIcone, { backgroundColor: "#d9e9ff" }]}>
            <Humidity width={30} height={30} />
          </View>
          <Text style={styles.textMiniCard}>Umidade ambiente</Text>
          <Text style={[styles.valueMiniCard, { color: "#1860f9" }]}>62%</Text>
          <View style={styles.humidityChartInside}>
            <View style={styles.humidityChartOutside}></View>
          </View>
        </View>
        <View style={styles.miniCard}>
          <View style={[styles.boxIcone, { backgroundColor: "#f4e8ff" }]}>
            <Pressao width={30} height={30} />
          </View>
          <Text style={styles.textMiniCard}>Pressão atmosférica</Text>
          <Text style={[styles.valueMiniCard, { color: "#9e2af3" }]}>960</Text>
          <Text style={{ color: theme.colors.textDarkFaint }}>hPa</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>Última atualização: 16:45</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 15,
  },
  header: {
    width: "100%",
    height: 95,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // backgroundColor: "#853d3d",
    // paddingHorizontal: 15,
  },
  boxDateTime: {
    marginTop: 16,
  },
  titleTime: {
    fontSize: 40,
    fontWeight: "regular",
    textAlign: "center",
  },
  subtitleTime: {
    textAlign: "center",
    color: theme.colors.textDarkFaint,
  },
  cardTemperature: {
    width: "100%",
    height: 160,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
  },
  titleCardTemperature: {
    fontSize: 16,
    color: theme.colors.textLight,
  },
  valueTemperature: {
    fontSize: 46,
    color: theme.colors.textLight,
  },
  contentCardTempetrature: {
    display: "flex",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  boxCards: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },
  miniCard: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    height: 165,
    backgroundColor: theme.colors.light,
    borderRadius: 20,
    padding: 20,
  },
  boxIcone: {
    width: 45,
    height: 45,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textMiniCard: {
    color: theme.colors.textDarkFaint,
    marginTop: 5,
  },
  valueMiniCard: {
    fontSize: 32,
  },
  humidityChartInside: {
    position: "relative",
    width: "100%",
    height: 10,
    backgroundColor: "#ddeafc",
    borderRadius: 10,
  },
  humidityChartOutside: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "62%",
    height: 10,
    backgroundColor: "#1860f9",
    borderRadius: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
  },
  textFooter: {
    textAlign: "center",
    color: theme.colors.textDarkFaint,
  },
});
