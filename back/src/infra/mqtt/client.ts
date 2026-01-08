import mqtt from "mqtt";
import { Reading } from "../../core/entities/Reading.js";
import { ReadingService } from "../../core/services/ReadingService.js";
import { MySQLReadingRepository } from "../db/ReadingRepository.js";
import { wsServer } from "../http/server.js";

const repo = new MySQLReadingRepository();
const readingService = new ReadingService(repo);

const client = mqtt.connect("mqtt://127.0.0.1:1883");

client.on("connect", () => {
  console.log("MQTT conectado");
  client.subscribe("weather/#");
});

client.on("message", async (_, message) => {
  try {
    const payload = JSON.parse(message.toString());

    if (!payload.device) {
      console.warn("Payload sem device:", payload);
      return;
    }

    const reading = new Reading(
      payload.device,
      payload.temperature,
      payload.humidity,
      payload.pressure
    );

    await readingService.saveReading(reading);

    wsServer.broadcast({
      type: "reading",
      device: payload.device,
      temperature: payload.temperature,
      humidity: payload.humidity,
      pressure: payload.pressure,
      ts: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Erro ao processar MQTT:", err);
  }
});
