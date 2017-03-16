/**
 * Created by yuanyuan on 17/1/4.
 */





//callback
//http://59.110.21.9:28004/yzx/callback.json

//2014-06-30
//{SoftVersion}/Accounts/{AccountSid}/{function}/{operation}?sig={SigParameter}


/*
 2. SigParameter是REST API 验证参数
 URL后必须带有sig参数，sig= MD5（账户Id + 账户授权令牌 + 时间戳），共32位(注:转成大写)
 使用MD5加密（账户Id + 账户授权令牌 + 时间戳），共32位
 时间戳是当前系统时间（24小时制），格式“yyyyMMddHHmmss”。时间戳有效时间为50分钟。
 */


/*
 3. Authorization是包头验证信息
 使用Base64编码（账户Id + 冒号 + 时间戳）
 冒号为英文冒号
 时间戳是当前系统时间（24小时制），格式“yyyyMMddHHmmss”，需与SigParameter中时间戳相同。
 */

//Content-Type:application/json;charset=utf-8;Accept:application/json;




const request = require('request');
const crypto  = require('crypto');
const moment  = require('moment');

let account_sid = 'e53cdbad711fffb6354c7c79ccdc294b';
let appId = '5e449ae65d3b40f4987d4bada1025479';
let auth_token = '5cb2cf2258013bb73be09051160aad27';
let from = '67967079427615';
let to = '15712921838';
//{"callback":{"appId":"5e449ae65d3b40f4987d4bada1025479","fromClient":"18247184097","to":"18686535083","fromSerNum":"01053576994","toSerNum":"01053576994"}}


let body = {
    callback: {
        'appId'     : appId,
        'fromClient': '67967079577451',
        'to'        : '18247184097',
        'fromSerNum': '01053576994',
        'toSerNum'  : '01053576994'
    }
};
//01053576994
let options = {
    url: 'https://api.ucpaas.com/2014-06-30/Accounts/' + account_sid + '/Calls/callBack?sig=',
    body: body,
    json: true,
    headers:{
        'Content-Type': 'application/json; charset=utf-8'
    },
    'method': 'POST'
};//sig=5DB8163E6323303A12A8743B0D9A8784'

function send_request() {
    let timestamp = getCurTimeStampStr();
    let sign = get_sign(timestamp);
    sign = sign.toUpperCase();
    let authorization = get_authorization(timestamp);
    options['url'] = options['url'] + sign;
    options['headers']['Authorization'] = authorization;

    console.log(options);
    request(options,function (err,res,body) {
        console.log('返回值如下:');
        /*
         { resp:
         { respCode: '000000',
         callback:
         { callId: '2c77f6428f5ac702e752514d57ec03f3',
         createDate: '20170116201412' } } }
         */
        console.log(JSON.stringify(body['resp']));
    })
}

function md5(key) {
    if(typeof key != 'string'){
        key += '';
    }

    if(key){
        key  = crypto.createHash('md5').update(key).digest("hex");
    }
    return key;
}


//sig= MD5（账户Id + 账户授权令牌 + 时间戳）
function get_sign(timestamp) {
    return md5(account_sid + auth_token + timestamp);
}
//使用Base64编码（账户Id + 冒号 + 时间戳）

function get_authorization(timestamp) {
    return new Buffer(account_sid + ':' + timestamp).toString('base64');
}

function md5(key) {
    if(typeof key != 'string'){
        key += '';
    }

    if(key){
        key  = crypto.createHash('md5').update(key).digest("hex");
    }
    return key;
};

function getCurTimeStampStr() {
    let date = new Date();
    return moment(date).format('YYYYMMDDHHmmss');
}

function send_clients() {
    let body_client = {
        'appId': appId,
        'clientType': '0',
        'charge': '0',
        'mobile': '18247184097'
    };

    let options_client = {
        url: 'https://api.ucpaas.com/2014-06-30/Accounts/' + account_sid + '/Clients?sig=',
        body: {
            'client':body_client
        },
        json: true,
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
        },
        'method': 'POST'
    };

    let timestamp = getCurTimeStampStr();
    let sign = get_sign(timestamp);
    sign = sign.toUpperCase();
    let authorization = get_authorization(timestamp);
    options_client['url'] = options_client['url'] + sign;
    options_client['headers']['Authorization'] = authorization;

    console.log(options_client);
    request(options_client,function (err,res,body) {
        console.log('返回值如下:');
        /*
         { resp:
         { respCode: '000000',
         client:
         { balance: '0',
         clientNumber: '67967079427615',
         clientPwd: '310a37d1',
         createDate: '2017-01-16 20:13:44' } } }
         */
        console.log(body['resp']['client'])
    })
}

// send_clients();


send_request();

