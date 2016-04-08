#Beacon

I have just bought Raspberry Pi 3 Model B in Akihabara, Tokyo.

![rpi3](./rpi3.png)

The Beacon architecture including Beacon management with tega.

![Beacon](https://docs.google.com/drawings/d/1ddUhcWiNF57k3DRVUa-Zz_Lcl1cscXHIdlRZLvoy8NA/pub?w=960&h=720)

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
