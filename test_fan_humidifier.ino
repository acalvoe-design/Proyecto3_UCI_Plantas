/*
 * ESP32 Fan & Humidifier Test
 * Tests the fan and humidifier with button control
 * Button cycles through states: OFF -> Fan ON -> Humidifier ON -> Both ON -> OFF
 */

// Pin Definitions (matching plantcontroller.ino)
#define HUMIDIFIER_PIN 23     // Digital output for humidifier relay (D23)
#define MOTOR_PIN 18          // PWM capable - fan control (D18)
#define LED_PIN 15            // PWM capable - status indicator
#define BUTTON_PIN 5          // Push button pin

// State variables
enum State {
  STATE_OFF,
  STATE_FAN_ON,
  STATE_HUMIDIFIER_ON,
  STATE_BOTH_ON
};

State currentState = STATE_OFF;
unsigned long lastButtonPress = 0;
const unsigned long debounceDelay = 200;  // Debounce time in ms

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Initialize pins
  pinMode(HUMIDIFIER_PIN, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Set all actuators to LOW
  digitalWrite(HUMIDIFIER_PIN, LOW);
  digitalWrite(MOTOR_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
  
  Serial.println("\n=== ESP32 Fan & Humidifier Test ===");
  Serial.println("Pin Configuration:");
  Serial.println("  Humidifier: Pin 23 (D23)");
  Serial.println("  Fan (Motor): Pin 18 (D18)");
  Serial.println("  LED: Pin 15");
  Serial.println("  Button: Pin 5");
  Serial.println("\nPress button to cycle through states:");
  Serial.println("  State 0: OFF");
  Serial.println("  State 1: Fan ON");
  Serial.println("  State 2: Humidifier ON");
  Serial.println("  State 3: Both ON");
  Serial.println("=====================================\n");
  
  printCurrentState();
}

void loop() {
  // Check if button is pressed
  if (digitalRead(BUTTON_PIN) == LOW) {
    // Debounce
    if (millis() - lastButtonPress > debounceDelay) {
      lastButtonPress = millis();
      
      // Cycle to next state
      currentState = (State)((currentState + 1) % 4);
      updateActuators();
      printCurrentState();
      
      // Visual feedback with LED
      blinkLED(2);
    }
  }
}

void updateActuators() {
  // Turn off everything first
  digitalWrite(HUMIDIFIER_PIN, LOW);
  digitalWrite(MOTOR_PIN, LOW);
  digitalWrite(LED_PIN, LOW);
  
  // Set devices based on state
  switch (currentState) {
    case STATE_OFF:
      digitalWrite(LED_PIN, LOW);
      break;
      
    case STATE_FAN_ON:
      digitalWrite(MOTOR_PIN, HIGH);
      digitalWrite(LED_PIN, HIGH);
      break;
      
    case STATE_HUMIDIFIER_ON:
      digitalWrite(HUMIDIFIER_PIN, HIGH);
      digitalWrite(LED_PIN, HIGH);
      break;
      
    case STATE_BOTH_ON:
      digitalWrite(MOTOR_PIN, HIGH);
      digitalWrite(HUMIDIFIER_PIN, HIGH);
      digitalWrite(LED_PIN, HIGH);
      break;
  }
}

void printCurrentState() {
  Serial.print("State changed to: ");
  switch (currentState) {
    case STATE_OFF:
      Serial.println("0 - OFF (All devices off)");
      Serial.println("  Humidifier: OFF");
      Serial.println("  Fan: OFF");
      break;
      
    case STATE_FAN_ON:
      Serial.println("1 - FAN ON");
      Serial.println("  Humidifier: OFF");
      Serial.println("  Fan: ON");
      break;
      
    case STATE_HUMIDIFIER_ON:
      Serial.println("2 - HUMIDIFIER ON");
      Serial.println("  Humidifier: ON");
      Serial.println("  Fan: OFF");
      break;
      
    case STATE_BOTH_ON:
      Serial.println("3 - BOTH ON");
      Serial.println("  Humidifier: ON");
      Serial.println("  Fan: ON");
      break;
  }
  Serial.println("---");
}

void blinkLED(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
    delay(100);
  }
}
