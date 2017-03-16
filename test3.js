'use strict';

const co            = require('co');
const util          = require('util');
const http          = require('http');
const async         = require('async');
const crypto        = require('crypto');


function encodeCipher(data,keys) {
    //1.ase加密
    //2.base64编码
    //3.encode

    //向量
    let iv = '';
    //编码设置
    let clearEncoding = 'utf8';
    //加密方式
    let algorithm = 'aes-256-ecb';
    //加密类型 base64/hex
    let cipherEncoding = 'hex';
    try{
        var cipher = crypto.createCipheriv(algorithm, keys, iv);
        var cipherChunks = [];
        cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        let result =  cipherChunks.join('');
        result = new Buffer(result).toString('base64');
        result = encodeURIComponent(result);

        return result;
    }catch(e){
        return null;
    }
}

function decodeCipher(data,keys) {
    //1.decode
    //2.解base64
    //3.ase解密
    data = decodeURIComponent(data);
    data = new Buffer(data,'base64').toString('ascii');

    //向量
    let iv = '';
    //编码设置
    let clearEncoding = 'utf8';
    //加密方式
    let algorithm = 'aes-256-ecb';
    //加密类型 base64/hex
    let cipherEncoding = 'hex';
    try{
        var cipherChunks = [data];
        var decipher = crypto.createDecipheriv(algorithm, keys, iv);
        var plainChunks = [];
        for (var i = 0;i < cipherChunks.length;i++) {
            plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
        }
        plainChunks.push(decipher.final(clearEncoding));
        return eval("("+plainChunks.join('')+")"); //转成对象，方便程序中使用
    }catch(e){
        console.log(e);
        return null;
    }
}

let resut = decodeCipher('NTE3YTMyZmY3OWU5NmY1OTQ5MDYyNzhlNDhmOTcyNGY%3d','ebc440eabf81873ef6605851af9095dd');
let jimi = encodeCipher('100','ebc440eabf81873ef6605851af9095dd');
console.log(resut);
//NTE3YTMyZmY3OWU5NmY1OTQ5MDYyNzhlNDhmOTcyNGY%3d