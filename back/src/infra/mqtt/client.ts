// import mqtt from "mqtt";
// import { db } from "../db/db.js";

// const client = mqtt.connect("mqtt://127.0.0.1:1883");

// // guarda último valor em memória
// let latestData = {
//   temperature: null as number | null,
//   humidity: null as number | null,
//   pressure: null as number | null,
// };

// client.on("error", (err) => {
//   console.log("Erro ao conectar:", err.message);
// });

// client.on("connect", () => {
//   console.log("Conectado ao broker MQTT");
//   client.subscribe("sensors/#");
// });

// client.on("message", async (topic, message) => {
//   const value = parseFloat(message.toString());

//   if (topic === "sensors/temperature") latestData.temperature = value;
//   if (topic === "sensors/humidity") latestData.humidity = value;
//   if (topic === "sensors/pressure") latestData.pressure = value;

//   if (latestData.temperature && latestData.humidity && latestData.pressure) {
//     await db.query(
//       `INSERT INTO readings (temperature, humidity, pressure)
//        VALUES (?, ?, ?)`,
//       [latestData.temperature, latestData.humidity, latestData.pressure]
//     );
//     latestData = { temperature: null, humidity: null, pressure: null };
//   }
// });

// export default client;

import mqtt from "mqtt";
import { Reading } from "../../core/entities/Reading.js";
import { ReadingService } from "../../core/services/ReadingService.js";
import { MySQLReadingRepository } from "../db/ReadingRepository.js";

interface Buffer {
  temperature: number | null;
  humidity: number | null;
  pressure: number | null;
}

const repo = new MySQLReadingRepository();
const readingService = new ReadingService(repo);

const client = mqtt.connect("mqtt://127.0.0.1:1883");

const buffer: Buffer = {
  temperature: null,
  humidity: null,
  pressure: null,
};

client.on("connect", () => {
  console.log("MQTT conectado");
  client.subscribe("sensors/#");
});

client.on("message", async (topic, message) => {
  const value = parseFloat(message?.toString());

  if (topic.endsWith("/temperature")) buffer.temperature = value;
  if (topic.endsWith("/humidity")) buffer.humidity = value;
  if (topic.endsWith("/pressure")) buffer.pressure = value;

  if (buffer.temperature && buffer.humidity && buffer.pressure) {
    const reading = new Reading(
      buffer.temperature,
      buffer.humidity,
      buffer.pressure
    );

    await readingService.saveReading(reading);

    buffer.temperature = buffer.humidity = buffer.pressure = null;
  }
});
