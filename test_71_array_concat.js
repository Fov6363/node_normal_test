/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


let arr1=  [{"_id":{},"count":1999,"age":[0,14]}];
let arr2 = [{"_id":{},"count":2000,"age":[14,28]}];
let arr3 =  [{"_id":{},"count":1999,"age":[0,14]},{"_id":{},"count":1999,"age":[0,14]},{"_id":{},"count":2000,"age":[14,28]}];
arr1 = arr1.concat(arr2);
console.log();