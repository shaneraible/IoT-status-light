#include <Arduino_JSON.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
#include "FastLED.h"
#define NUM_LEDS 49
#define LED_PIN 5
#define BUTTON_PIN D8

int buttonState = 0;
CRGB leds[NUM_LEDS];
String userStatus = "free";
String id = "bedroom";
String color = "#FFFFFF";
static bool isRinging = false;
bool lightOn = false;
String serverBase = "https://shaneraible.azurewebsites.net/api";
static unsigned long last_interrupt_time = 0;

static bool needsPut = false;
 
void ICACHE_RAM_ATTR ringDoorbell() {
  unsigned long interrupt_time = millis();                  

  if (interrupt_time - last_interrupt_time > 400) 
  {
    Serial.println("RINGING DOORBELL");
  }
  last_interrupt_time = interrupt_time;
  needsPut = true;
}

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  FastLED.addLeds<WS2811, LED_PIN, GRB>(leds, NUM_LEDS);
  
  delay(200);
  Serial.println(F("\n\r* * * ESP BOOT * * *"));
  Serial.println(F("WiFi begin!"));
  WiFi.mode(WIFI_STA);
  WiFi.begin("Gas Leak", "backleftburner");
  FastLED.setBrightness (255);
  int count = 0;
  while (WiFi.status() != WL_CONNECTED) {
    leds[(count++)%NUM_LEDS] = CRGB::Blue;
    FastLED.show();
    delay(500);
  }

  Serial.println(("\n\rWiFi connected!"));
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), ringDoorbell, CHANGE);
}

void updateLighting() {
  if(needsPut) return;
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  HTTPClient https;

  if (https.begin(*client, serverBase+"/light/"+id)) {  // HTTPS
    int httpCode = https.GET();

    if (httpCode > 0) {

      if(httpCode == 404){ postLight(); return; }
      
      Serial.printf("[HTTPS] GET... code: %d\n", httpCode);

      if (httpCode == HTTP_CODE_OK) {
        String strpayload = https.getString();
        JSONVar payload = JSON.parse(strpayload);
        Serial.println("String payload: "+strpayload);
        
        if (JSON.typeof(payload) == "undefined") {
          Serial.println("Parsing input failed!");
          return;
        }

        bool success = updateAttributes(payload);

        if(!success) Serial.println("FORMAT INVALID");
      }
    } else {
      Serial.printf("[HTTPS] GET... failed, error: %s\n\r", https.errorToString(httpCode).c_str());
    }

    https.end();
  } else {
    Serial.printf("[HTTPS] Unable to connect\n\r");
  }
}

bool updateAttributes(JSONVar payload){
  if (payload.hasOwnProperty("status")) {
    Serial.print("status = ");
    userStatus = (const char*) payload["status"];
    Serial.println( userStatus);
  }else return false;   //interesting syntax you got there -sherm

  if (payload.hasOwnProperty("color")) {
    Serial.print("color = ");
    color = (const char*)payload["color"];
    Serial.println(color);
  }else return false;

  if (payload.hasOwnProperty("isRinging")) {
    Serial.print("isRinging = ");
    isRinging = (bool)payload["isRinging"];
    Serial.println(isRinging);
  }else return false;

  
  if (payload.hasOwnProperty("on")) {
    Serial.print("on = ");
    lightOn = (bool)payload["on"];
    Serial.println(lightOn);
  }else return false;

  Serial.println(); 
  return true;
}

void postLight(){ //TODO
  JSONVar light;
  light["id"] = id;
  light["status"] = userStatus;
  light["color"] = color;
  light["isRinging"] = isRinging;
  light["on"] = lightOn;

  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  HTTPClient https;

  if (https.begin(*client, serverBase+"/light/")) {
    Serial.println("HTTPS POST");  
    https.addHeader("Content-Type", "application/json");
    String body = JSON.stringify(light);
    int httpCode = https.PUT(body);

    if (httpCode > 0) {

      if(httpCode >= 400){  postLight();Serial.println(https.getString()); return; }
      
      Serial.printf("[HTTPS] PUT... code: %d\n", httpCode);

      if (httpCode == HTTP_CODE_OK) {
        String strpayload = https.getString();
        Serial.println("String payload: "+strpayload);
      }
    } else {
      Serial.printf("[HTTPS] POST... failed, error: %s\n\r", https.errorToString(httpCode).c_str());
    }

    https.end();
  } else {
    Serial.printf("[HTTPS] Unable to connect\n\r");
  }
};

void putLight(){
  JSONVar light;
  light["id"] = id;
  light["status"] = userStatus;
  light["color"] = color;
  light["isringing"] = isRinging;
  light["on"] = lightOn;

  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  HTTPClient https;

  if (https.begin(*client, serverBase+"/light/"+id)) {
    Serial.println("HTTPS PUT");  
    https.addHeader("Content-Type", "application/json");
    String body = JSON.stringify(light);
    int httpCode = https.PUT(body);

    if (httpCode > 0) {

      if(httpCode >= 400){  postLight();Serial.println(https.getString()); return; }
      
      Serial.printf("[HTTPS] PUT... code: %d\n", httpCode);

      if (httpCode == HTTP_CODE_OK) {
        String strpayload = https.getString();
        Serial.println("String payload: "+strpayload);
      }
    } else {
      Serial.printf("[HTTPS] PUT... failed, error: %s\n\r", https.errorToString(httpCode).c_str());
    }

    https.end();
  } else {
    Serial.printf("[HTTPS] Unable to connect\n\r");
  }
  
}

void makeBusy(){  //TODO
  explodeLED(CRGB::Red);
  delay(1000);

}

void explodeLED(CRGB col){
  for(int i=NUM_LEDS/2, k=NUM_LEDS/2+(NUM_LEDS%2==0?1:0); i<NUM_LEDS || k>=0; i++, k--){
    if(i<NUM_LEDS)
      leds[i] = col;
    if(k>=0)
      leds[k] = col;
    FastLED.show();
    delay(12);
  }
}

void pulseLED(CRGB col){
  int kernel = 4;
  for(int i=NUM_LEDS/2, k=NUM_LEDS/2+(NUM_LEDS%2==0?1:0); i<NUM_LEDS || k>=0; i++, k--){
    FastLED.clear();
    for(int ik=0; ik<kernel; ik++){
      if(i-ik<NUM_LEDS && i-ik>NUM_LEDS/2)
        leds[i-ik] = col;
    }

    for(int ik=0; ik<kernel; ik++){
      if(k+ik>=0 && k+ik<NUM_LEDS/2+(NUM_LEDS%2==0?1:0))
        leds[k+ik] = col;
    }
    FastLED.show();
    delay((int)(40-(double)i/(NUM_LEDS/2)*35));
  }
}

void makeRing(){  //TODO
  isRinging = true;
  putLight();
  needsPut = false;
  delay(1000);
}

void addGlitter( fract8 chanceOfGlitter) 
{
  if( random8() < chanceOfGlitter) {
    leds[ random16(NUM_LEDS) ] += CRGB::White;
  }
}

void colorCycle(){  //TODO 
  int kernel = 40;
  for(int count = 0; count<1; count++){
    for(int i=0; i-kernel<NUM_LEDS; i++){
      FastLED.clear();
      for(int k=0; k<kernel; k++){
        if(i-k>=0 && i-k<NUM_LEDS){
          leds[i-k].r= 0;
          leds[i-k].g= 200- (int)((double)k/kernel*170);
          leds[i-k].b= (int)((double)k/kernel*170);
        }
      }
      FastLED.show();
      delay(18-(int)((double)i/NUM_LEDS*12)%13);
    }
    delay(40);
    for(int i=NUM_LEDS-1; i+kernel>=0; i--){
      FastLED.clear();
      for(int k=0; k<kernel; k++){
        if(i+k>=0 && i+k<NUM_LEDS){
          leds[i+k].r= 0;
          leds[i+k].g= 200- (int)((double)k/kernel*170);
          leds[i+k].b= (int)((double)k/kernel*170);
        }
      }
      FastLED.show();
      delay(18-(int)((double)i/NUM_LEDS*12)%13);
    }
  }
  FastLED.clear();
  FastLED.show();
}

void turnOff(){
  for(int i=NUM_LEDS/2, k=NUM_LEDS/2+(NUM_LEDS%2==0?1:0); i<NUM_LEDS || k>=0; i++, k--){
    if(i<NUM_LEDS){
      leds[i].r = 0;
      leds[i].g = 0;
      leds[i].b = 0;
    }
    if(k>=0){
      leds[k].r = 0;
      leds[k].g = 0;
      leds[k].b = 0;
    }
    FastLED.show();
    delay(8);
  }
  delay(3000);
}

void getRingResponse(){
  for(int i = 1; i<7; i++){
    updateLighting();
    Serial.println("waiting for response");
    delay(1000);

    if(!isRinging) break;
    //TODO: check response and break
  }
  isRinging = false;
  putLight();
}

void loop() {
  updateLighting();

  if(needsPut){
    explodeLED(CRGB::Yellow);
    makeRing();
    getRingResponse();
  }
  
  else if(lightOn && !needsPut){
    if(userStatus == "busy"){
      makeBusy();
    }
    
//    else if(isRinging){
//      makeRing();
//    }
    
    else{
      colorCycle();
    }  
  }
  else turnOff();
}
