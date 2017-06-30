/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('numeral');
const Promise = require('bluebird');
const numeral = require('numeral');



debug(numeral(1).add(2).value());
debug(numeral(1).subtract(2).value());
debug(numeral(1).multiply(2).value());