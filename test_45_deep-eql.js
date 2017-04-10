/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('deep-eql');
const Promise = require('bluebird');
const deepEql = require('deep-eql');




let arr1 = [1,2,3,4];
let arr2 = [1,2,3,4];



debug(deepEql(arr1,arr2));