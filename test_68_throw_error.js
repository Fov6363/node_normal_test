/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');

function test() {
    throw {type: 'error_code_above_zero', detail: 'wu', url: '/test/1.json'};
}
try{
    test();
}catch (e){
    console.log(e);
}
