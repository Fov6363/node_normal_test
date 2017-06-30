/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('lodash');
const Promise = require('bluebird');
const lodash = require('lodash');

let arr = [{'id':123,'name':'abc'}];



debug(lodash.get(arr,'[0].id'))