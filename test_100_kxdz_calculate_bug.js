/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');

const obj = {"goods_tags":["银灰"]};
const map = new Map();
map.set(JSON.stringify(obj),{'sensor_report$id$count': 100});
const res = map.get(JSON.stringify(obj));

console.log(res);