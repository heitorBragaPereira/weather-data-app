import mqtt from "mqtt";
import { db } from "../db/db.js";

const client = mqtt.connect("mqtt://127.0.0.1:1883");

// guarda último valor em memória
let latestData = {
  temperature: null as number | null,
  humidity: null as number | null,
  pressure: null as number | null,
};

client.on("error", (err) => {
  console.log("Erro ao conectar:", err.message);
});

client.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  client.subscribe("sensors/#");
});

client.on("message", async (topic, message) => {
  const value = parseFloat(message.toString());

  if (topic === "sensors/temperature") latestData.temperature = value;
  if (topic === "sensors/humidity") latestData.humidity = value;
  if (topic === "sensors/pressure") latestData.pressure = value;

  if (latestData.temperature && latestData.humidity && latestData.pressure) {
    await db.query(
      `INSERT INTO readings (temperature, humidity, pressure)
       VALUES (?, ?, ?)`,
      [latestData.temperature, latestData.humidity, latestData.pressure]
    );
    latestData = { temperature: null, humidity: null, pressure: null };
  }
});

export default client;
