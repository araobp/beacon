const thingShadow = require('../../aws-iot-device-sdk-js/').thingShadow
const isUndefined = require('../../aws-iot-device-sdk-js/common/lib/is-undefined')
const cmdLineProcess = require('../../aws-iot-device-sdk-js/examples/lib/cmdline')
const eddystoneBeacon = require('../../eddystone-beacon/index')

function processTest(args) {

   if (isUndefined(args.thingName)) {
      console.log('thing name must be specified with --thing-name');
      process.exit(1);
   }

   const thingShadows = thingShadow({
      keyPath: args.privateKey,
      certPath: args.clientCert,
      caPath: args.caCert,
      clientId: args.clientId,
      region: args.region,
      baseReconnectTimeMs: args.baseReconnectTimeMs,
      keepalive: args.keepAlive,
      protocol: args.Protocol,
      port: args.Port,
      host: args.Host,
      debug: args.Debug
   });

   thingShadows.register(args.thingName, {
      persistentSubscribe: true
   });

   thingShadows
      .on('error', function(error) {
         console.log('error', error);
      });

   thingShadows
      .on('delta', function(thingName, stateObject) {
         console.log('received delta on ' + thingName + ': ' +
            JSON.stringify(stateObject));
         thingShadows.update(thingName, {
            state: {
               reported: stateObject.state
            }
         });
         // advertises Eddystone URL
         var url = stateObject.state.url
         console.log(url)
         eddystoneBeacon.advertiseUrl(url);
      });

   thingShadows
      .on('timeout', function(thingName, clientToken) {
         console.warn('timeout: ' + thingName + ', clientToken=' + clientToken);
      });
}

module.exports = cmdLineProcess;

if (require.main === module) {
   cmdLineProcess('connect to the AWS IoT service and perform thing shadow echo',
      process.argv.slice(2), processTest, ' ', true);
}
