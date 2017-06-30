/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const test_84 = require('./test_84_process_test');
const sleep = require('sleep');
const process = require('process');


process.stdin.resume();//so the program will not close instantly

process.on('SIGINT',function (m) {
    console.log(`-------111111--------m = ${m}`);
    process.exit();
});
// for(let i = 0;i < 100;i++){
//     console.log(i);
//     sleep.msleep(1000);
// }

