#!/bin/bash

aws iot-data update-thing-shadow --thing-name beacon-1 --payload '{"state": {"desired": {"url": "https://github.com/araobp/beacon"}}}' /tmp/outfile.json
