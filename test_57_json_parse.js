/**
 * Created by yuanyuan on 17/3/19.
 */
const debug   = require('debug')('parse');
const Promise = require('bluebird');
const fs      = require('fs');

let str = fs.readFileSync('./temp/json_file2.json',{'encoding':'utf8'});

debug(`read`);
JSON.parse(str);
debug('json parse');