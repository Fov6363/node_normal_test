/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('for_of');
const Promise = require('bluebird');
const fs       = require('fs');

let arr = [1,2,3,4,5];

async function test1() {
    debug('start');

    for(let i of arr){
        let res = await test2(i);
        debug(res);
    }

    debug('end');
}

async function test2(a) {
    return new Promise(function (resolve,reject) {
        resolve(a);
    })
}




test1();