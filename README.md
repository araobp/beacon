#Beacon

## Project goal

Test iBeacon, Eddystone and WiFi SSID as location tags for smart phones.

## Devices
![rpi](./rpi.png)
![rpi3](./rpi3.png)

## Architecture
The Beacon architecture uses AWS for device management and location-specific services:

![Beacon](https://docs.google.com/drawings/d/1DZxTeMSGM-XhIbeoqJHV08z73gGVNqJ6OSQoyZqkEKk/pub?w=480&h=360)

## iBeacon setup

Refer to https://learn.adafruit.com/downloads/pdf/pibeacon-ibeacon-with-a-raspberry-pi.pdf

## Eddystone setup

### node.js installation

Uninstall the older version of nodejs:
```
$ sudo apt-get --purge remove nodejs
```

Install the latest version:
```
$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
$ sudo apt-get install nodejs
```

Refer to https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

### Install eddystone-nodejs

```
$ npm install eddystone-beacon
```
Refer to https://github.com/don/node-eddystone-beacon

## Android applications

- [Physical Web](https://play.google.com/store/apps/developer?id=The+Physical+Web+Team)
- [iBeacon and Eddystone Scanner](https://play.google.com/store/apps/details?id=de.flurp.beaconscanner.app)

### Screenshots

![iBeacon and Eddystone Scanner](./Screenshot_2016-04-12.jpg)

## WiFi access point setup

Refer to https://learn.adafruit.com/setting-up-a-raspberry-pi-as-a-wifi-access-point/overview

## AWS setup

[Step 1] Download the SDK, certs and config

Save the config as "config.json".

In my case, I saved all the files in "certs" directory.

[Step 2] Unzip the SDK and try out the examples

```
$ unzip aws-iot-device-sdk-js-latest.zip
$ cd aws-iot-device-sdk-js-latest
$ npm install
$ cd examples
$ node echo-example.js -F ../../certs/config.json -f ../../certs/ -g ap-northeast-1
$ netstat -a | grep 8883
tcp        0      0 192.168.57.132:42235    ec2-54-199-236-168:8883 ESTABLISHED
```

[Step 3] Install aws cli
```
$ sudo pip install awscli
$ aws configure
AWS Access Key ID [None]: XXXXXXXXXXXXXXXXXXXX
AWS Secret Access Key [None]: XXXXXXXXXXXXXXXXXXXXXXXX
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

## AWS IOT test

### device-example.js

Terminal 1
```
$ node device-example.js -F ../../certs/config.json -f ../../certs/ -g ap-northeast-1 --test-mode=1
connect
message topic_1 {"mode2Process":1}
message topic_1 {"mode2Process":2}
message topic_1 {"mode2Process":3}
   :
```

Terminal 2
```
$ node device-example.js -F ../../certs/config.json -f ../../certs/ -g ap-northeast-1 --test-mode=2
connect
message topic_2 {"mode1Process":2}
message topic_2 {"mode1Process":3}
message topic_2 {"mode1Process":4}
   :
```

### thing-example.js

Terminal 1
```
$ node thing-example.js
-F ../../certs/config.json -f ../../certs/ -g ap-northeast-1 --test-mode=1
connected to AWS IoT
delta on: RGBLedLamp{"timestamp":1460904574,"state":{"red":42,"green":143,"blue":10},"metadata":{"red":{"timestamp":1460904574},"green":{"timestamp":1460904574},"blue":{"timestamp":1460904574}}}
delta on: RGBLedLamp{"timestamp":1460904584,"state":{"red":243,"green":216,"blue":65},"metadata":{"red":{"timestamp":1460904584},"green":{"timestamp":1460904584},"blue":{"timestamp":1460904584}}}
```

Terminal 2
```
$ node thing-example.js
-F ../../certs/config.json -f ../../certs/ -g ap-northeast-1 --test-mode=2
connected to AWS IoT
got 'accepted' status on: RGBLedLamp
updated state to thing shadow
got 'accepted' status on: RGBLedLamp
updated state to thing shadow
```

### echo-test.js

Terminal 1
```
node echo-example.js
-F ../../certs/config.json -f ../../certs/ -g ap-northeast-1 --thing-name beacon-1
received delta on beacon-1: {"timestamp":1460990590,"state":{"power":"off"},"metadata":{"power":{"timestamp":1460990590}}}
received delta on beacon-1: {"timestamp":1460990629,"state":{"power":"on"},"metadata":{"power":{"timestamp":1460990629}}}
```

Terminal 2
```
$ aws iot-data update-thing-shadow --thing-name beacon-1 --payload '{"state": {"desired" : {"power" : "o
ff"}}}' outfile2.json
$ aws iot-data update-thing-shadow --thing-name beacon-1 --payload '{"state": {"desired" : {"power" : "o
n"}}}' outfile2.json
```
