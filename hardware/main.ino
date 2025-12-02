#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <ArduinoJson.h>

Preferences prefs;
WebServer server(80);

// -------------------------------------------------------------
// Tenta conectar com a rede salva no Preferences
// -------------------------------------------------------------
bool connectToSavedWiFi() {
  prefs.begin("wifi", true);
  String ssid = prefs.getString("ssid", "");
  String pass = prefs.getString("pass", "");
  prefs.end();

  if (ssid.length() == 0) {
    Serial.println("Nenhuma rede salva.");
    return false;
  }

  Serial.printf("Conectando a %s...\n", ssid.c_str());
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 8000) {
    delay(200);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConectado!");
    Serial.println(WiFi.localIP());
    return true;
  }

  Serial.println("\nFalha ao conectar.");
  return false;
}


// -------------------------------------------------------------
// Endpoint POST /config  (recebe SSID, senha e MQTT)
// -------------------------------------------------------------
void handleConfig() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"error\":\"expected JSON\"}");
    return;
  }

  StaticJsonDocument<256> doc;
  if (deserializeJson(doc, server.arg("plain"))) {
    server.send(400, "application/json", "{\"error\":\"invalid JSON\"}");
    return;
  }

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


// -------------------------------------------------------------
// Lista redes Wi-Fi disponíveis
// -------------------------------------------------------------
void handleWifiList() {
  Serial.println("Buscando WiFi...");
  int n = WiFi.scanNetworks();

  StaticJsonDocument<512> doc;
  JsonArray arr = doc.to<JsonArray>();

  for (int i = 0; i < n; i++) {
    JsonObject obj = arr.add<JsonObject>();
    obj["ssid"] = WiFi.SSID(i);
    obj["rssi"] = WiFi.RSSI(i);
  }

  String json;
  serializeJson(arr, json);
  server.send(200, "application/json", json);
}


// -------------------------------------------------------------
// Status da conexão
// -------------------------------------------------------------
void handleStatus() {
  StaticJsonDocument<128> doc;

  if (WiFi.status() == WL_CONNECTED) {
    doc["connected"] = true;
    doc["ip"] = WiFi.localIP().toString();
  } else {
    doc["connected"] = false;
  }

  String out;
  serializeJson(doc, out);
  server.send(200, "application/json", out);
}


// -------------------------------------------------------------
// Inicia Access Point + servidor HTTP
// -------------------------------------------------------------
void startAPMode() {
  Serial.println("Iniciando modo AP...");

  WiFi.disconnect(true);
  delay(300);

  WiFi.mode(WIFI_AP);
  bool ok = WiFi.softAP("Weather-Data", "pereira96");
  if (!ok) {
    Serial.println("Falha ao iniciar AP!");
    return;
  }

  delay(500);

  Serial.print("AP IP: ");
  Serial.println(WiFi.softAPIP());

  // Registrar rotas
  server.on("/wifi-list", HTTP_GET, handleWifiList);
  server.on("/status", HTTP_GET, handleStatus);
  server.on("/config", HTTP_POST, handleConfig);

  server.begin();
  Serial.println("Servidor HTTP iniciado em modo AP!");
}


// -------------------------------------------------------------
// Setup
// -------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  delay(1500);

  Serial.println("Inicializando...");

  // Se não conseguir conectar, inicia AP
  if (!connectToSavedWiFi()) {
    startAPMode();
  } else {
    // Conectou! Mesmo assim, pode querer permitir endpoints
    server.on("/wifi-list", HTTP_GET, handleWifiList);
    server.on("/status", HTTP_GET, handleStatus);
    server.on("/config", HTTP_POST, handleConfig);
    server.begin();
  }
}


// -------------------------------------------------------------
// Loop do servidor
// -------------------------------------------------------------
void loop() {
  server.handleClient();
  delay(2);
}
