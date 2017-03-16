/**
 * Created by yuanyuan on 17/1/20.
 */
var xml2js = require('xml2js');
var MD5 = require('md5');

var utils = {
    sign: function(object, key) {
        var querystring = utils.createQueryString(object);
        if(key) querystring += "&key=" + key;

        return MD5(querystring).toUpperCase();
    },

    createNonceStr: function(length) {
        length = length || 24;
        if(length > 32) length = 32;

        return (Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)).substr(0, length);
    },

    createTimestamp: function() {
        return parseInt(new Date().getTime() / 1000) + '';
    },

    createQueryString: function(options) {
        return Object.keys(options).filter(function(key){
            return options[key] !== undefined && options[key] !== '' && ['pfx', 'apiKey', 'sign', 'key'].indexOf(key) < 0;
        }).sort().map(function(key){
            return key + '=' + options[key];
        }).join("&");
    },

    buildXML: function(json) {
        var builder = new xml2js.Builder();
        return builder.buildObject(json);
    },

    parseXML: function(xml, fn) {
        var parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
        parser.parseString(xml, fn || function(err, result){});
    },

    parseRaw: function() {
        return function(req, res, next){
            var buffer = [];
            req.on('data', function(trunk){
                buffer.push(trunk);
            });
            req.on('end', function(){
                req.rawbody = Buffer.concat(buffer).toString('utf8');
                next();
            });
            req.on('error', function(err){
                next(err);
            });
        }
    },

    pipe: function(stream, fn){
        var buffers = [];
        stream.on('data', function (trunk) {
            buffers.push(trunk);
        });
        stream.on('end', function () {
            fn(null, Buffer.concat(buffers));
        });
        stream.once('error', fn);
    }
};

let result = utils.sign({"appid":"wx9d171881470ca557","mch_id":"1250053601","nonce_str":"S1GWKSOVUXEQMJOIKA37WL7SZ","sign_type":"MD5","body":"书籍是人类进步的知道","out_trade_no":"12345678765","total_fee":1,"spbill_create_ip":"127.0.0.1","notify_url":"http://59.110.21.9:28006/util/pay/wxpay/callback.json","trade_type":"JSAPI","openid":"oZG7OtyTr6v4mNl0ZYiEefkFV7H4"},'5d4af7d2ebd9da988b37924835dda342');

console.log(result);

//DB993C7CF98D4E463B838C7C0C24EDBC
//DB993C7CF98D4E463B838C7C0C24EDBC