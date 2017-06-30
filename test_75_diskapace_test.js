/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const diskapace = require('diskspace');

diskapace.check('/',function (err,result) {
    console.log(JSON.stringify(result));
});