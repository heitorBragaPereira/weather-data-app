#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <PubSubClient.h>

#define MQTT_TOPIC "weather/esp32_01/data"

Preferences prefs;
WebServer server(80);
WiFiClient espClient;
PubSubClient mqttClient(espClient);
Adafruit_BME280 bme;

// -------------------------------------------------------------
// Variáveis globais
// -------------------------------------------------------------
String mqttHost;
int mqttPort;
unsigned long lastPublish = 0;
const unsigned long publishInterval = 5000; // 5s

// -------------------------------------------------------------
// WiFi
// -------------------------------------------------------------
bool connectToSavedWiFi() {
  prefs.begin("wifi", true);
  String ssid = prefs.getString("ssid", "");
  String pass = prefs.getString("pass", "");
  prefs.end();

  if (ssid.isEmpty()) return false;

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 8000) {
    delay(200);
  }

  return WiFi.status() == WL_CONNECTED;
}

// -------------------------------------------------------------
// MQTT
// -------------------------------------------------------------
void connectMQTT() {
  if (mqttClient.connected()) return;

  while (!mqttClient.connected()) {
    String clientId = "ESP32-" + String(random(0xffff), HEX);
    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("MQTT conectado");
    } else {
      Serial.println("Falha MQTT, tentando novamente...");
      delay(2000);
    }
  }
}

// -------------------------------------------------------------
// HTTP CONFIG
// -------------------------------------------------------------
void handleConfig() {
  StaticJsonDocument<256> doc;
  deserializeJson(doc, server.arg("plain"));

  prefs.begin("wifi", false);
  prefs.putString("ssid", doc["ssid"].as<const char*>());
  prefs.putString("pass", doc["password"].as<const char*>());
  prefs.putString("mqtt_host", doc["mqtt_host"].as<const char*>());
  prefs.putInt("mqtt_port", doc["mqtt_port"]);
  prefs.end();

  server.send(200, "application/json", "{\"status\":\"saved\"}");
  delay(1000);
  ESP.restart();
}

void handleStatus() {
  StaticJsonDocument<128> doc;
  doc["connected"] = WiFi.status() == WL_CONNECTED;
  doc["ip"] = WiFi.localIP().toString();

  String out;
  serializeJson(doc, out);
  server.send(200, "application/json", out);
}

// -------------------------------------------------------------
// Setup
// -------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  if (!connectToSavedWiFi()) return;

  prefs.begin("wifi", true);
  mqttHost = prefs.getString("mqtt_host", "");
  mqttPort = prefs.getInt("mqtt_port", 1883);
  prefs.end();

  mqttClient.setServer(mqttHost.c_str(), mqttPort);

  if (!bme.begin(0x76)) {
    Serial.println("Erro ao iniciar BME280");
    while (1);
  }

  server.on("/config", HTTP_POST, handleConfig);
  server.on("/status", HTTP_GET, handleStatus);
  server.begin();

  Serial.println("Sistema pronto");
}

// -------------------------------------------------------------
// Loop
// -------------------------------------------------------------
void loop() {
  server.handleClient();

  if (WiFi.status() != WL_CONNECTED) return;

  connectMQTT();
  mqttClient.loop();

  if (millis() - lastPublish > publishInterval) {
    lastPublish = millis();

    StaticJsonDocument<256> doc;
    doc["device"] = "esp32_heitor";
    doc["temperature"] = bme.readTemperature();
    doc["humidity"] = bme.readHumidity();
    doc["pressure"] = bme.readPressure() / 100.0F;

    String payload;
    serializeJson(doc, payload);

    mqttClient.publish(MQTT_TOPIC, payload.c_str());
    Serial.println(payload);
  }
}
