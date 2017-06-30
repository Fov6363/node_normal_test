/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('node');
const Promise = require('bluebird');
const log4js  = require('log4js');
const fs     = require('fs');
// const easyMonitor = require('easy-monitor');
// easyMonitor('log4js');
var heapdump = require('heapdump');
log4js.configure({
    appenders: [
        // { type: "console" },
        {
            type: "dateFile",
            filename: 'logs/debug.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: 20480,
            backups: 3,
            category: 'debug',
            alwaysIncludePattern: true

        }
    ],
    // replaceConsole: true,   //替换console.log
    levels: {
        'debug': 'debug',
    }

});

const debug_logger = log4js.getLogger('debug');

const arr = [];
for(let i =0;i < 1000000;i++){
// for(let i =0;i < 1;i++){
    arr.push(i);
}
// const theStream = fs.createWriteStream('./logs/test2.log');
setTimeout(function () {
    Promise.map(arr,item => {
        debug_logger.debug('test'); //1.4G
        // console.log('test');//274MB
        // debug('test'); //324MB
        // theStream.write('test\n','utf8');
    });

},10000);

