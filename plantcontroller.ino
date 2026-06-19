#include <DHT.h>
#include <Adafruit_VEML7700.h>
#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>

// ESP32 Pin Definitions
#define DHTPIN 4          // DHT22 data pin
#define DHTTYPE DHT22
#define SOIL_HUMIDITY_PIN 32  // Analog pin (ADC1_4)
#define HUMIDIFIER_PIN 13     // Digital output
#define MOTOR_PIN 14          // PWM capable
#define LED_PIN 15            // PWM capable

// WiFi Credentials
const char* ssid = "A55 de Isa";           // Change this to your WiFi SSID
const char* password = "Orquidia1783";    // Change this to your WiFi password

// Server Configuration
const char* serverURL = "http://172.16.98.224:5000/sensor_data";  // Change to your Python app IP/URL

DHT dht(DHTPIN, DHTTYPE);
Adafruit_VEML7700 veml = Adafruit_VEML7700();

float dhtHumidity = 0;
float temperature = 0;
int soilHumidity = 0;
float lux = 0;
int soilMin = 0, soilMax = 800;
float TEMP_HIGH = 28.0;
float LUX_LOW = 200.0;
int SOIL_DRY_ADC = 300;
int chipState = 3;

unsigned long lastSendTime = 0;
const unsigned long sendInterval = 5000;  // Send data every 5 seconds

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n\nInicializando sensores...");
  
  dht.begin();
  
  // Initialize I2C
  Wire.begin();
  
  if (!veml.begin()) {
    Serial.println("VEML7700 sensor not found!");
    while (1) delay(100);
  }
  
  veml.setGain(VEML7700_GAIN_1);
  veml.setIntegrationTime(VEML7700_IT_100MS);
  
  pinMode(HUMIDIFIER_PIN, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  
  digitalWrite(HUMIDIFIER_PIN, LOW);
  digitalWrite(MOTOR_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
  
  Serial.println("Todos los sensores inicializados!");
  
  // WiFi Setup
  connectToWiFi();
  
  Serial.println("Iniciando lecturas...\n");
}

void connectToWiFi() {
  Serial.print("\nConectando a WiFi: ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nNo se pudo conectar a WiFi. Continuando sin conexión...");
  }
}

void sendDataToPython() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi no conectado. Intentando reconectar...");
    connectToWiFi();
    return;
  }
  
  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");
  
  // Create JSON payload
  String jsonData = "{";
  jsonData += "\"soil_adc\":" + String(soilHumidity) + ",";
  jsonData += "\"soil_percent\":" + String(map(soilHumidity, soilMin, soilMax, 0, 100)) + ",";
  jsonData += "\"dht_humidity\":" + String(dhtHumidity) + ",";
  jsonData += "\"temperature\":" + String(temperature) + ",";
  jsonData += "\"lux\":" + String(lux) + ",";
  jsonData += "\"humidifier_state\":" + String(chipState) + ",";
  jsonData += "\"motor_on\":" + String(digitalRead(MOTOR_PIN)) + ",";
  jsonData += "\"led_on\":" + String(digitalRead(LED_PIN)) + ",";
  jsonData += "\"timestamp\":" + String(millis());
  jsonData += "}";
  
  Serial.print("Enviando datos: ");
  Serial.println(jsonData);
  
  int httpResponseCode = http.POST(jsonData);
  
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response: ");
    Serial.println(httpResponseCode);
    
    String response = http.getString();
    if (response.length() > 0) {
      Serial.print("Respuesta del servidor: ");
      Serial.println(response);
    }
  } else {
    Serial.print("Error en HTTP. Código: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}

void loop() {
  // Read sensors
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();
  
  // Update global variables for sending
  if (!isnan(hum)) dhtHumidity = hum;
  if (!isnan(temp)) temperature = temp;
  
  soilHumidity = analogRead(SOIL_HUMIDITY_PIN);
  int soilPercent = map(soilHumidity, soilMin, soilMax, 0, 100);
  soilPercent = constrain(soilPercent, 0, 100);
  
  lux = veml.readLux();
  
  // Control logic
  int targetState = 3;
  if (soilHumidity < 400) {
    targetState = 2;
  }
  
  if (targetState != chipState) {
    int pulsesNeeded = (targetState - chipState + 3) % 3;
    if (pulsesNeeded == 0) pulsesNeeded = 3;
    
    for (int i = 0; i < pulsesNeeded; i++) {
      delay(100);
      digitalWrite(HUMIDIFIER_PIN, HIGH);
      delay(500);
      digitalWrite(HUMIDIFIER_PIN, LOW);
    }
    chipState = targetState;
  }
  
  if (temp > TEMP_HIGH) {
    digitalWrite(MOTOR_PIN, HIGH);
  } else {
    digitalWrite(MOTOR_PIN, LOW);
  }
  
  if (lux < LUX_LOW) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  
  // Print to Serial
  Serial.print("ADC: ");
  Serial.print(soilHumidity);
  Serial.print(" | Soil%: ");
  Serial.print(soilPercent);
  Serial.print(" | DHT Hum: ");
  Serial.print(dhtHumidity);
  Serial.print("% | Temp: ");
  Serial.print(temperature);
  Serial.print("C | Lux: ");
  Serial.print(lux);
  Serial.print(" | Humid State: ");
  Serial.print(chipState);
  Serial.print(" | Motor: ");
  Serial.print(digitalRead(MOTOR_PIN) ? "ON" : "OFF");
  Serial.print(" | LED: ");
  Serial.println(digitalRead(LED_PIN) ? "ON" : "OFF");
  
  // Send data to Python app periodically
  if (millis() - lastSendTime >= sendInterval) {
    sendDataToPython();
    lastSendTime = millis();
  }
  
  delay(2000);
}
