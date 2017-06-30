/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const cp    = require('child_process');
const process = require('process');
const child_arr = [];

for(let i = 0;i < 2;i++){
    child_arr.push(cp.fork('./test_82_childProcess_test.js',[]));
}


process.on('SIGINT', () => {
    child_arr.forEach(item => {
        item.kill('SIGHUP');
    });
    process.exit();
});



