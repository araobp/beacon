'use strict';
var aws = require('aws-sdk');

var endpoint = 'https://XXXXXXXXXXXXXX.iot.ap-northeast-1.amazonaws.com';
var thingName = 'beacon-1';
var iotdata = new aws.IotData( { endpoint: endpoint } );
var params = { thingName: thingName };

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    event.Records.forEach((record) => {
        //console.log(record.eventID);
        //console.log(record.eventName);
        //console.log(record.dynamodb.Keys)
        var newImage = record.dynamodb.NewImage;
        var ageOfGroup = newImage.ageOfGroup.S
        //console.log(newImage);
        console.log(ageOfGroup);
        var url = 'https://github.com/araobp';
        switch (ageOfGroup) {
            case 'A':
                url = 'https://github.com/araobp/a';
                break;
            case 'B':
                url = 'https://github.com/araobp/b';
                break;
            case 'C':
                url = 'https://github.com/araobp/c';
                //console.log(ageOfGroup);
                break;
            default:
                console.log('Unidentifed ageOfGroup');
        }
  
        iotdata.getThingShadow(params, function (err, data) {
            if (!err) {
      
                var payload = JSON.parse(data.payload);
      
                var desiredState = {
                    state: {
                        desired: {
                            url: url
                        }
                    }
                };
                console.log(desiredState);
                 
                var params = {
                  thingName: thingName,
                  payload: JSON.stringify(desiredState)
                };
    
                iotdata.updateThingShadow(params, function (err, data) {
                    if (!err) {
                        context.succeed();
                    } else {
                        context.fail(err);      
                    }
                });
            } else {
                console.log('thing update failed');
                console.log(err);
                context.fail(err);      
            }
        });
        
        //console.log('DynamoDB Record: %j', record.dynamodb);
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};
