/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');

/**
 * 用来对extends目录下所有的json文件进行加密,因为已有的文件不经过加密,在部署到客户服务器时无法被extend_api.js识别.
 */
const fs = require('fs');
const CryptoJs = require('crypto-js');
const secret_key = '8d26c846ca909ce72db342a12f2c3fd5';
const crypto     = require('crypto');

let i = 0;
const file_path = './test.json';
fs.readFile(file_path,'UTF-8',function (err,define) {
    if (err) {
        console.error('readFile error, file_name = ' + file_path);
    }

    JSON.parse(define);
    let encr_key = md5(secret_key);
    define = CryptoJs.AES.encrypt(define, encr_key);
    fs.writeFile(file_path, define, function (err) {
        if (err) {
            console.error('writeFile error, file_name = ' + file_path);
        } else {
            i++;
            console.log('success ! i = ' + i);
        }
    });
});

function md5(key) {
    if(typeof key != 'string'){
        key += '';
    }

    if(key){
        key  = crypto.createHash('md5').update(key).digest("hex");
    }
    return key;
};
