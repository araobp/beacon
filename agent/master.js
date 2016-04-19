const exec = require('child_process').exec
const thingName = 'beacon-1'

var url = process.argv[2]
var payload = '{"state": {"desired": {"url": "' + url + '"}}}'

exec('aws iot-data update-thing-shadow --thing-name ' + thingName + ' --payload \'' + payload + '\' /tmp/outfile.json', function callback(error, stdout, stderr) {
	if (error) {
		console.log(error)
		console.log(stderr)
	};
	if (stdout) {
		console.log(stdout)
	};
});

