/**
 * Created by yuanyuan on 16/12/8.
 */
const request   = require('request-promise');
const crypto    = require('crypto');

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDeptZXDFEtswArfwHAO5Oy5S149kqbBPs0U2Gy1UBViv+1LUO\nNCWlAGP8Dmd+GqTbRO1v+ZMngmxVsZ9z/QYh5cmz/UNOQAjYLHLkydkxQfmD3aY\nPS6cAXBy9ED/OskjUHs9+st0ZmW+IECNyTEOYF793LfQTgycmOhGgemRrCmQIDA\nQABAoGAMViutpo/P66lgf5jJ/TMVmDexClp/ZOMDVvRkm4bFRp6c/A1QYPtdMxV\ncLngxZqpUJQkXmx+Ja6Zf+5BF72xfjclMriZHTm7RE3ADu/jY1KooQT7ob4Gist\nHtX6QANFJ7ChhcHTRFTHIMnh3mmEM40omjxpVRAXVeE1TcVZKo5ECQQD+48fisu\nQho1M6QGC6e/VyIQEURi9gtt1HLtXr/EroKb9eBlcOORmi5k4ug+dQppWHdGMQZ\n5MUpdyRiKil2s7tAkEA358b3l164hADJGZfI2OW4hebbmE+52BiIatb//M7pHYr\nREi+ZmKxC5Vt5Zb1qGWSuP6z90wimHkMr0lNsyqg3QJAZeD/nSIpwzQ36PmgcAl\np8qM0fjkLaNnOmkwjHz7pZeCB6AAavcme8JijOT5pr7fV3p1rlzv+8urUvark1d\n4ehQJBAIWDgOcmFw1MFCQyfxEpD9gT0jh4FU+eC1kg78AEoJKT/0c4y31j5WMOJ\n9xRYoDVjGGpqRe4vFsewwURFjQn+n0CQQCDwYzN4zZT2snL+eHbp+f5dGSP1oAq\nNxAsUKZTUp72jjgKn5TojTzIuLPb6XyGhrOasxNc13my3DLGN0dsZGRX\n-----END RSA PRIVATE KEY-----';

const public_key =
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIgHnOn7LLILlKETd6BFRJ0Gqg\n' +
    'S2Y3mn1wMQmyh9zEyWlz5p1zrahRahbXAfCfSqshSNfqOmAQzSHRVjCqjsAw1jyq\n' +
    'rXaPdKBmr90DIpIxmIyKXv4GGAkPyJ/6FTFY99uhpiq0qadD/uSzQsefWo0aTvP/\n' +
    '65zi3eof7TcZ32oWpwIDAQAB\n' +
    '-----END PUBLIC KEY-----';


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHour = date.getHours();
    var strMin  = date.getMinutes();
    var strSecond = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
    }
    if (strMin >= 0 && strMin <= 9) {
        strMin = "0" + strMin;
    }
    if (strSecond >= 0 && strSecond <= 9) {
        strSecond = "0" + strSecond;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + strHour + seperator2 + strMin
        + seperator2 + strSecond;
    return currentdate;
}

function createRSASign(params, privateKey) {
    let signer = crypto.createSign('RSA-SHA1');
    let prestr = linkSignStrUtil(params);

    console.log(prestr);
    let sign = signer.update(new Buffer(prestr, 'utf-8')).sign(privateKey, 'base64');
    return sign;
}

function verifyRSASign(params, sign, publicKey) {
    let verify = crypto.createVerify('RSA-SHA1');
    let prestr = linkSignStrUtil(params);
    return verify.update(new Buffer(prestr, 'utf-8')).verify(publicKey, sign, 'base64');
}

function linkSignStrUtil(params) {
    let keys = Object.keys(params);
    keys.sort();
    let str = '';
    for(let i of keys){
        str += i + '=' + params[i] + '&';
    }
    str = str.slice(0,-1);
    return str;
}

function linkSignStr(params) {
    let keys = Object.keys(params);
    keys.sort();
    let str = '';
    for(let i of keys){
        str += i + '=' + encodeURIComponent(params[i]) + '&';
    }
    str = str.slice(0,-1);
    return str;
}

/*

 keyValues.put("app_id", app_id);

 keyValues.put("biz_content", "{\"timeout_express\":\"30m\",\"product_code\":\"QUICK_MSECURITY_PAY\",\"total_amount\":\"0.01\",\"subject\":\"1\",\"body\":\"我是测试数据\",\"out_trade_no\":\"" + getOutTradeNo() +  "\"}");

 keyValues.put("charset", "utf-8");

 keyValues.put("method", "alipay.trade.app.pay");

 keyValues.put("sign_type", "RSA");

 keyValues.put("timestamp", "2016-07-29 16:55:53");

 keyValues.put("version", "1.0");
 */
function buildOrderParamMap(app_id,total_amount,subject,out_trade_no,notify_url,seller_id) {
    let biz_content = {
        'timeout_express' : '30m',
        'seller_id'       : seller_id + '',
        'product_code'    : 'QUICK_WAP_PAY',
        'total_amount'    : total_amount + '',
        'subject'         : subject + '',
        'out_trade_no'    : out_trade_no + '',
    };
    return {
        'app_id'        : app_id + '',
        'charset'       : 'utf-8',
        'method'        : 'alipay.trade.wap.pay',
        'sign_type'     : 'RSA',
        'timestamp'     : '2017-05-09 14:51:52',
        'version'       : '1.0',
        'biz_content'   : JSON.stringify(biz_content),
        'notify_url'    : notify_url + '',
    };
}


function buildOrderQueryMapByOutTradeNo(app_id,out_trade_no) {
    let biz_content = {
        'out_trade_no': out_trade_no
    };
    return {
        'app_id'        : app_id,
        'charset'       : 'utf-8',
        'method'        : 'alipay.trade.query',
        'sign_type'     : 'RSA',
        'timestamp'     : getNowFormatDate(),
        'version'       : '1.0',
        'biz_content'   : JSON.stringify(biz_content)
    };

}

let obj =buildOrderParamMap('2017041206669247','1','商品名称','1225716810187002','http://101.201.115.31:28030/util/pay/alipay/callback.json','2088521540330151');

console.log(createRSASign(obj,privateKey));
//authInfo = app_id=2016082401792488&biz_content={"timeout_express":"30m","product_code":"QUICK_MSECURITY_PAY","total_amount":"0.01","subject":"1","body":"我是测试数据","out_trade_no":"120916552497326"}&charset=utf-8&method=alipay.trade.app.pay&sign_type=RSA&timestamp=2016-07-29 16:55:53&version=1.0

function buildOrderQueryMapByTradeNo(app_id,trade_no) {
    let biz_content = {
        'trade_no': trade_no
    };
    return {
        'app_id'        : app_id,
        'charset'       : 'utf-8',
        'method'        : 'alipay.trade.query',
        'sign_type'     : 'RSA',
        'timestamp'     : getNowFormatDate(),
        'version'       : '1.0',
        'biz_content'   : JSON.stringify(biz_content)
    };

}


module.exports = {
    'linkSignStr'                       : linkSignStr,
    'createRSASign'                     : createRSASign,
    'verifyRSASign'                     : verifyRSASign,
    'buildOrderParamMap'                : buildOrderParamMap,
    'buildOrderQueryMapByOutTradeNo'    : buildOrderQueryMapByOutTradeNo,
    'buildOrderQueryMapByTradeNo'       : buildOrderQueryMapByTradeNo
};