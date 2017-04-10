/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('normalUtil');
const Promise = require('bluebird');
const normalUtil = require('normalutil');


debug(normalUtil.isNumber([1]));
debug(isNaN([1]));
debug(parseFloat([1]));