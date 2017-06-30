/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const url = require('url');



const re = url.parse('http://127.0.0.1:1666/data/find.json',true,true);
console.log(re);