/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('array');
const Promise = require('bluebird');

let arr = [1,2];

arr[5] = undefined;

arr = arr.map(item => {
    debug(`item = %s`,item);
    if(item === undefined){
        item = '';
    }

    return item;
});

debug('arr = %s',arr);