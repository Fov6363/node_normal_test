/**
 * Created by yuanyuan on 17/3/19.
 */
const debug   = require('debug')('request');
const request = require('request');
const fs      = require('fs');

let str = fs.readFileSync('./temp/json_file2.json',{'encoding':'utf8'});

body = {
    "arr":JSON.parse(str)
};
console.log(JSON.stringify(body).length);

console.time('start');
request('http://127.0.0.1:3000/user.json',{
    body: body,
    'json': true
},function (err,res,body) {
    console.timeEnd('start');

    debug(err);
    debug(res.statusCode);
    debug(body);
});

