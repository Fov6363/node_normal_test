/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
var util = require('util');
const fs = require('fs');
var heapdump = require('heapdump');
console.log(util.inspect(process.memoryUsage()));
console.log(process.memoryUsage());
var profiler = require('v8-profiler');
var snapshot1 = profiler.takeSnapshot();
console.log(snapshot1.getHeader());

profiler.startProfiling('', true);
setTimeout(function() {
    var profile = profiler.stopProfiling('');
    console.log(profile);
    // fs.writeFileSync('/tmp/1.heapsnapshot',profile)
    profiler.deleteAllProfiles();
}, 1000);

// heapdump.writeSnapshot('/tmp/' + Date.now() + '.heapsnapshot');