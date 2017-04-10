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

const debug_math = debug('math');
debug_math(lodash.max([1,2,3,4,5]));
debug_math(lodash.max([1,2,3,4,'abc']));
debug_math(lodash.max([1,2,3,4,NaN]));
debug_math(lodash.max([1,2,3,4,'8']));