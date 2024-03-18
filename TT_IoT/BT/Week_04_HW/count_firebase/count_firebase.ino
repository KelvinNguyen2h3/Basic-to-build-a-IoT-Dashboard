#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "IoT"
#define WIFI_PASSWORD "FuckHHH222"

// Firebase credentials
#define DATABASE_URL "https://tt-iot-ute-default-rtdb.firebaseio.com"
#define API_KEY "AIzaSyBny3WmaIL7xjGZrfLKgz5i8mps4sMbsSU"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;
const int ledPin = 13;
void updateFirebaseLEDStatus(int status) {
  if (Firebase.RTDB.setInt(&fbdo, "/Arduino/Led", status)) {
    Serial.println("LED status updated on Firebase: " + String(status));
  } else {
    Serial.println("Failed to update LED status on Firebase");
  }
}

void setup(){
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(100);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; 
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    
    // Read the status from Firebase
    int status;
    if (Firebase.RTDB.getInt(&fbdo, "/Arduino/Led")) {
      status = fbdo.intData();
      Serial.println("Read LED status from Firebase: " + String(status));
      
      // Update the LED
      digitalWrite(ledPin, status);
    } else {
      Serial.println("Failed to read LED status from Firebase");
    }
    
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setInt(&fbdo, "/Arduino/count", count)) {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    } else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;
  }
}