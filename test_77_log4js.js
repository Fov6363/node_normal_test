/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const log4js  = require('log4js');

log4js.configure({
    appenders: [
        { type: "console" },
        {
            type: "dateFile",
            filename: 'logs/log.log',
            pattern: "-yyyy-MM-dd",
            maxLogSize: 20480,
            backups: 3,
            category: 'dateFileLog',
            alwaysIncludePattern: true

        },
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
    replaceConsole: true,   //替换console.log
    levels: {
        'dateFileLog': 'debug',
        'debug': 'debug',
    }

});


var dateFileLog = log4js.getLogger('dateFileLog');

// dateFileLog.setLevel('error');

module.exports = dateFileLog;
module.exports.log4js = log4js;

