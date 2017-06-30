/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('bluebird');
const Promise = require('bluebird');



function test() {
    return new Promise.reject('asdfdfs');
}


test().catch(err => {
    console.log(err);
});