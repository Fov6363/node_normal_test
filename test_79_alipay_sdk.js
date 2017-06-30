/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');

//设置应用相关参数
//网关地址，示例中为沙箱环境
var GATEWAY_URL='https://openapi.alipaydev.com/gateway.do?';
//沙箱环境应用的APPID
var APP_ID='2017041206669247';
//签名方式，推荐使用RSA2
var SIGN_TYPE='RSA';
//沙箱环境RSA2应用私钥
var PRIVATE_KEY='';
//沙箱环境RSA2支付宝公钥
var ALI_PUBLIC_KEY='';


//将RSA公私钥转换为PEM格式
var privateKey = '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDeptZXDFEtswArfwHAO5Oy5S149kqbBPs0U2Gy1UBViv+1LUO\nNCWlAGP8Dmd+GqTbRO1v+ZMngmxVsZ9z/QYh5cmz/UNOQAjYLHLkydkxQfmD3aY\nPS6cAXBy9ED/OskjUHs9+st0ZmW+IECNyTEOYF793LfQTgycmOhGgemRrCmQIDA\nQABAoGAMViutpo/P66lgf5jJ/TMVmDexClp/ZOMDVvRkm4bFRp6c/A1QYPtdMxV\ncLngxZqpUJQkXmx+Ja6Zf+5BF72xfjclMriZHTm7RE3ADu/jY1KooQT7ob4Gist\nHtX6QANFJ7ChhcHTRFTHIMnh3mmEM40omjxpVRAXVeE1TcVZKo5ECQQD+48fisu\nQho1M6QGC6e/VyIQEURi9gtt1HLtXr/EroKb9eBlcOORmi5k4ug+dQppWHdGMQZ\n5MUpdyRiKil2s7tAkEA358b3l164hADJGZfI2OW4hebbmE+52BiIatb//M7pHYr\nREi+ZmKxC5Vt5Zb1qGWSuP6z90wimHkMr0lNsyqg3QJAZeD/nSIpwzQ36PmgcAl\np8qM0fjkLaNnOmkwjHz7pZeCB6AAavcme8JijOT5pr7fV3p1rlzv+8urUvark1d\n4ehQJBAIWDgOcmFw1MFCQyfxEpD9gT0jh4FU+eC1kg78AEoJKT/0c4y31j5WMOJ\n9xRYoDVjGGpqRe4vFsewwURFjQn+n0CQQCDwYzN4zZT2snL+eHbp+f5dGSP1oAq\nNxAsUKZTUp72jjgKn5TojTzIuLPb6XyGhrOasxNc13my3DLGN0dsZGRX\n-----END RSA PRIVATE KEY-----';
var aliPublicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDI6d306Q8fIfCOaTXyiUeJHk\nrIvYISRcc73s3vF1ZT7XN8RNPwJxo8pWaJMmvyTn9N4HQ632qJBVHf8sxHi/fEs\nraprwCtzvzQETrNRwVxLO5jVmRGi60j8Ue1efIlzPXV9je9mkjzOmdssymZkh2Q\nhUrCmZYI/FCEa3/cNMW0QIDAQAB\n-----END PUBLIC KEY-----";

//准备业务请求参数、签名用的应用私钥、验签用的支付宝公钥，示例中为预下单接口
var requestParams = {
    timestamp: '2017-05-09 14:51:52',
    method: 'alipay.trade.wap.pay',
    app_id: APP_ID,
    sign_type: SIGN_TYPE,
    charset:'utf-8',
    version: '1.0',
    biz_content: {
        'timeout_express' : '30m',
        'seller_id'       : 2088521540330151 + '',
        'product_code'    : 'QUICK_WAP_PAY',
        'total_amount'    : 1 + '',
        'subject'         : '商品名称' + '',
        'out_trade_no'    : 1225716810187002 + '',
    },
    notify_url: "http://101.201.115.31:28030/util/pay/alipay/callback.json"
};
//将biz_content参数序列化为JSON格式字符串
requestParams.biz_content=JSON.stringify(requestParams.biz_content);

//去除无效参数，排序并生成待签名字符串
var preStr='';
var keySet=[];
for(var key of Object.keys(requestParams).sort()){
    if(!requestParams[key] || key=='sign'){
        continue;
    }
    keySet.push(key);
}

for(var i=0; i<keySet.length; i++){
    var key=keySet[i];
    var value = requestParams[key];
    if(i==keySet.length-1){
        preStr = preStr + key + '=' + value + '';
    }else{
        preStr = preStr + key + '=' + value + '&';
    }
}

console.log(preStr);


//生成签名
var crypto=require('crypto');
var signer=crypto.createSign('RSA-SHA256');
if(SIGN_TYPE=='RSA'){
    signer=crypto.createSign('RSA-SHA1');
}

signer.update(new Buffer(preStr,'utf-8'));
var sign=signer.sign(privateKey, 'base64');


console.log(sign);
//rre4krVU3qEyOv8fFMcG+z5bFASbDudI1UDFLLsBnGRD9YYvX0N3eKI2vrn7sSiFg7f/NIHBp5L4ABKj1J7tRZxCv3v6zZwmRKT38XTxcApvjNTS5kESMaNcx8FgNzGTWUXIEUw1xZcKXhsZt1DgDj/jxyy+oMhwgxyaER2Oldc=

//
// //请求支付宝
// var https = require('https');
// var qs = require('querystring');
// requestParams.sign=sign;
// var content = qs.stringify(requestParams);
// var requestUrl = GATEWAY_URL+content;
// https.get(requestUrl, function(res){
//     res.setEncoding('utf8')
//     res.on('data', function(chunk){
//         console.log("响应数据："+ chunk);
//         //对响应数据进行验签
//         var responseData = JSON.parse(chunk);
//         //获取待验签字符串
//         var preVerifyStr = JSON.stringify(responseData.alipay_trade_precreate_response);
//         //转义正斜杠
//         var reg = new RegExp('/',"g");
//         preVerifyStr = preVerifyStr.replace(reg,'\\/');
//         //验签
//         var verifier = crypto.createVerify('RSA-SHA256');
//         if(SIGN_TYPE=='RSA'){
//             verifier=crypto.createVerify('RSA-SHA1');
//         }
//         verifier.update(preVerifyStr);
//         console.log("验签结果："+verifier.verify(aliPublicKey,responseData.sign,'base64'));
//     });
// }).on('error',function(e){
//     console.log("Got error: " + e.message);
// });