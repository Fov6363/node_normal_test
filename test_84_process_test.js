/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const process = require('process');


process.on('SIGINT',function (m) {
    console.log(`---------------m = ${m}`);
    process.exit();
});