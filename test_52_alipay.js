/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('alipay');
const Promise = require('bluebird');
const request   = require('request-promise');
const crypto    = require('crypto');

// const private_key = "-----BEGIN RSA PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIHevc9eJ6U5ceEv\nnL2tS9Q31ErWbxE9SmQuIjR3yxVUgT9E5utUYTCuqP3CveDZS13BYCmVcGBadhCD\nDaR2ZD7OeBzGln0oEd79oi8waf+RZ0GH4e70VwNPsbF+72NUAGzjaFk/qPVNEPRq\nSuOkB2r7MzkAN+xg/OBKJmWLsDbRAgMBAAECgYBK2BxZirCcZsu7dB4HrfyadAZT\njtr5e3II5BFwXW1bgJTv6nyOONW+IZpgjD+zemcVxCDwNiBKVzfdcjmFg3lnZ53s\nmvCxaOUl/V5uWgxECr4t3CCijJzkFGHPvwqSqzMkDVSE01nGFT4UaW+lck7UVusO\njwAdyd9TSoM2VMUqAQJBANfC8tEotuMkP6gu+Q5H/eVsXeI2xEN/k5oXugdakXBs\nvYOV15Ox7GXX9L2M5lmvIiP63HIYIJL99mpZyF2YMXECQQCaFxkvGCpX1c4cwyyI\nSZAGNTeOqRvBz4/22P6uEWANoRHqyCtApqFzJcPVrl+j4YdesLWT38rej361J7m8\nb6thAkEApleYGIUJKukhYqqEPOxn5F69qs+KVHeg9iXguBatFj3fhfkZ8LY1iPcL\nqq9cUDxjV9Xp6tSLGIhPWALMJMxXIQJADFWZAHoQuaM1snu1DtvEmZqc7eB/hk4V\nGg9Yo5pkc/LWulJ3k99CwTLesDYbFcUxztSaVFHvrU0TOXEKnxjZQQJAUnhbvbaU\nxllRChtPcwT14Pnvs4f60yx6uumpUgY37YL2F2+mnScPV+rU7pJSrmVc113sscC8\nyxHvnWSRfIk64g==\n-----END RSA PRIVATE KEY-----";
const private_key = "-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDDZYkrCPSeiqc0LFi4F1qKeWHVQzGeYtnOXX6j+oRgrlnf8aQ\nQy3glKElxgL1rylii9oEJ8RSBjhgXwH44Z8FAtPnX3k2DhTEjTtqLOrpCqmcpS2\n1w3b23gsrSzjKutpO/zeHA6rX/74N1IggD9sqAmr8qGxvBPz8x6purKYG/IwIDA\nQABAoGBAIRQjnlI4DU32Q/Yc999WP9qQNikXsZNVAaNg0NRUjER/6RJQnto/RvU\nUx98OUjzxd/covbzfJpaeXAkFpTllZOnaPVMOVvLpgQOilcEdcnme9f6MxU1czj\nOZQJKXWdeW+VP3nWgePYfIak7R3yiaZ2j3GiZBeyb6BCNDDO2Cc0JAkEA65jqDx\nkgMClDXQeOsDxeMTfT/qCit5rDbIdIvm8f1B+bs4iBPMYO1Gnr3AT5d6xxJjKx3\nAKzX7hcarDvuDu7xQJBANRRY+sS//bKvfKbPI4cF2Jw8nlSJzebWKJP+OO2MDUp\nK3h8apjxPH5n12h3/fBqO6gPowjgdLKRpbOHcMSXNccCQQCDWI/89NwOHaMRpVn\n2hOFafS5yQaoVxHF4+v8iNB/BihGrCMpMUHsKDzdQRXGzN28phY/FAbhw//59+M\nDcrGilAkBOlaV2/7xP2zC9GCosq0cYf5evwfGUCmKfCRylI+zp8EgPu3U1EK0EW\nGkJWMhb8OYNyWPdyD5JTdFYBrx9dz5HAkBMR+RTClYeLTZGUVWNEdwkAi+MPHIJ\nUdp/4tLVcwnXIWSR0Ym3mmK2GTiEeFxuoU6PNWxxWsCYdDqT94qvHEe0\n-----END RSA PRIVATE KEY-----";
// const private_key = "-----BEGIN RSA PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIHevc9eJ6U5ceE\nvnL2tS9Q31ErWbxE9SmQuIjR3yxVUgT9E5utUYTCuqP3CveDZS13BYCmVcGBadh\nCDDaR2ZD7OeBzGln0oEd79oi8waf+RZ0GH4e70VwNPsbF+72NUAGzjaFk/qPVNE\nPRqSuOkB2r7MzkAN+xg/OBKJmWLsDbRAgMBAAECgYBK2BxZirCcZsu7dB4Hrfya\ndAZTjtr5e3II5BFwXW1bgJTv6nyOONW+IZpgjD+zemcVxCDwNiBKVzfdcjmFg3l\nnZ53smvCxaOUl/V5uWgxECr4t3CCijJzkFGHPvwqSqzMkDVSE01nGFT4UaW+lck\n7UVusOjwAdyd9TSoM2VMUqAQJBANfC8tEotuMkP6gu+Q5H/eVsXeI2xEN/k5oXu\ngdakXBsvYOV15Ox7GXX9L2M5lmvIiP63HIYIJL99mpZyF2YMXECQQCaFxkvGCpX\n1c4cwyyISZAGNTeOqRvBz4/22P6uEWANoRHqyCtApqFzJcPVrl+j4YdesLWT38r\nej361J7m8b6thAkEApleYGIUJKukhYqqEPOxn5F69qs+KVHeg9iXguBatFj3fhf\nkZ8LY1iPcLqq9cUDxjV9Xp6tSLGIhPWALMJMxXIQJADFWZAHoQuaM1snu1DtvEm\nZqc7eB/hk4VGg9Yo5pkc/LWulJ3k99CwTLesDYbFcUxztSaVFHvrU0TOXEKnxjZ\nQQJAUnhbvbaUxllRChtPcwT14Pnvs4f60yx6uumpUgY37YL2F2+mnScPV+rU7pJ\nSrmVc113sscC8yxHvnWSRfIk64g==\n-----END RSA PRIVATE KEY-----";
// const private_key = "-----BEGIN RSA PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIHevc9eJ6U5ceE\nvnL2tS9Q31ErWbxE9SmQuIjR3yxVUgT9E5utUYTCuqP3CveDZS13BYCmVcGBadh\nCDDaR2ZD7OeBzGln0oEd79oi8waf+RZ0GH4e70VwNPsbF+72NUAGzjaFk/qPVNE\nPRqSuOkB2r7MzkAN+xg/OBKJmWLsDbRAgMBAAECgYBK2BxZirCcZsu7dB4Hrfya\ndAZTjtr5e3II5BFwXW1bgJTv6nyOONW+IZpgjD+zemcVxCDwNiBKVzfdcjmFg3l\nnZ53smvCxaOUl/V5uWgxECr4t3CCijJzkFGHPvwqSqzMkDVSE01nGFT4UaW+lck\n7UVusOjwAdyd9TSoM2VMUqAQJBANfC8tEotuMkP6gu+Q5H/eVsXeI2xEN/k5oXu\ngdakXBsvYOV15Ox7GXX9L2M5lmvIiP63HIYIJL99mpZyF2YMXECQQCaFxkvGCpX\n1c4cwyyISZAGNTeOqRvBz4/22P6uEWANoRHqyCtApqFzJcPVrl+j4YdesLWT38r\nej361J7m8b6thAkEApleYGIUJKukhYqqEPOxn5F69qs+KVHeg9iXguBatFj3fhf\nkZ8LY1iPcLqq9cUDxjV9Xp6tSLGIhPWALMJMxXIQJADFWZAHoQuaM1snu1DtvEm\nZqc7eB/hk4VGg9Yo5pkc/LWulJ3k99CwTLesDYbFcUxztSaVFHvrU0TOXEKnxjZ\nQQJAUnhbvbaUxllRChtPcwT14Pnvs4f60yx6uumpUgY37YL2F2+mnScPV+rU7pJ\nSrmVc113sscC8yxHvnWSRfIk64g==\n-----END RSA PRIVATE KEY-----";
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

function buildOrderParamMap(app_id,total_amount,subject,out_trade_no,notify_url,seller_id) {
    let biz_content = {
        'timeout_express' : '30m',
        'seller_id'       : seller_id + '',
        'product_code'    : 'QUICK_MSECURITY_PAY',
        'total_amount'    : total_amount + '',
        'subject'         : subject + '',
        'out_trade_no'    : out_trade_no + '',
    };
    return {
        'app_id'        : app_id + '',
        'charset'       : 'utf-8',
        'method'        : 'alipay.trade.app.pay',
        'sign_type'     : 'RSA',
        'timestamp'     : getNowFormatDate(),
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


let res = createRSASign({"abc":123},private_key);
debug(res);

module.exports = {
    'linkSignStr'                       : linkSignStr,
    'createRSASign'                     : createRSASign,
    'verifyRSASign'                     : verifyRSASign,
    'buildOrderParamMap'                : buildOrderParamMap,
    'buildOrderQueryMapByOutTradeNo'    : buildOrderQueryMapByOutTradeNo,
    'buildOrderQueryMapByTradeNo'       : buildOrderQueryMapByTradeNo
};