/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('v8');
const Promise = require('bluebird');
const v8 = require('v8');





let res = v8.getHeapSpaceStatistics();
debug(res);