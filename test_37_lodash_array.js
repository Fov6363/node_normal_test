/**
 * Created by yuanyuan on 17/3/19.
 */
const debug   = require('debug');
const Promise = require('bluebird');
const lodash  = require('lodash');

/*
-----------
Array
----------
 */
const debug_array = debug('array');

let arr1 = [1,2,3,4,5];
let arr2 = [3,4,8,9,19,11];
let arr3 = [56,67,78];


debug_array(lodash.intersection(arr1,arr2));
debug_array(lodash.intersection(arr1,arr3));
debug_array(lodash.concat([1,2],[4,5],null));

const debug_math = debug('math');
debug_math(lodash.max([1,2,3,4,5]));
debug_math(lodash.max([1,2,3,4,'abc']));
debug_math(lodash.max([1,2,3,4,NaN]));
debug_math(lodash.max([1,2,3,4,'8']));

const concat    = debug('concat');
let arr4 = ['你好',100,,,10];
let arr5 = ['你好',100,,99];
let arr6 = ['你好',100,11];
let arr7 = ['你好',100,,,,199];

concat(lodash.merge(arr4,arr5));


