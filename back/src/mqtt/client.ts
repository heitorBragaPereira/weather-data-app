import mqtt from "mqtt";
import { db } from "../db/db.js";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("✅ Conectado ao broker MQTT");
  client.subscribe("sensors/#");
});

client.on("message", (topic, message) => {
  const value = message.toString();
  console.log(`📩 ${topic}: ${value}`);
  db.run("INSERT INTO readings (topic, value) VALUES (?, ?)", [topic, value]);
});

export default client;
