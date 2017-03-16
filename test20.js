/**
 * Created by yuanyuan on 17/1/22.
 */
const lodash        = require('lodash');
const util          = require('util');
const request       = require('request');
const Promise       = require('bluebird');
const moment        = require('moment');
const xml           = require('xml');
const crypto        = require('crypto');




const account_sid = 'e53cdbad711fffb6354c7c79ccdc294b';
const appId       = '5e449ae65d3b40f4987d4bada1025479';
const auth_token  = '5cb2cf2258013bb73be09051160aad27';


let SUCCESS_RESPCODE  = '000000';
let HAS_REGISTER_CODE = '103114';
let CALL_DATA_NAME    = 'work_order';

function user_register() {
    let body = {
        appId: appId,
        mobile: '18247184034'
    };

    let timestamp = getCurTimeStampStr();

    let sign          = get_sign(timestamp);
    let authorization = get_authorization(timestamp);

    let options = {
        url: 'https://api.ucpaas.com/2014-06-30/Accounts/' + account_sid + '/ClientsByMobile?sig=' + sign + '&mobile=18247184097&appId=' + appId,
        body: body,
        json: true,
        headers: {
            'Content-Type' : 'application/json;charset=utf-8',
            'Authorization': authorization
        },
        'method': 'GET'
    };

    request(options,function (err,response,body) {

        console.log(body);
    });


};

user_register()
//
// async function both_call_phone(req,res) {
//     let uid            = req.body.uid;
//     let other_phone    = req.body.other_phone;
//     let id             = req.body.id;
//
//     if(!isNumber(uid)){
//         return errorRequest(req,res,Code.MISS_PARAMS,'uid');
//     }
//
//     if(util.isUndefined(other_phone)){
//         return errorRequest(req,res,Code.MISS_PARAMS,'other_phone');
//     }
//
//     let user = await User.findOne({"id": parseInt(uid)}).exec();
//
//     if(util.isUndefined(user.user_data.client_number)){
//         let error_code = Code.SYSTEM_ERROR;
//         error_code.error_msg = '请先注册云之迅用户';
//         return errorRequest(req,res,Code.error_code);
//     }
//
//     let body = {
//         callback : {
//             'appId': appId,
//             'fromClient': user.user_data.client_number,
//             'to': other_phone,
//             'fromSerNum': '01053576994',
//             'toSerNum': '01053576994'
//         }
//     };
//
//     let timestamp = getCurTimeStampStr();
//
//     let sign          = get_sign(timestamp);
//     let authorization = get_authorization(timestamp);
//
//     let options = {
//         url: 'https://api.ucpaas.com/2014-06-30/Accounts/' + account_sid + '/Calls/callBack?sig=' + sign,
//         body: body,
//         json: true,
//         headers: {
//             'Content-Type' : 'application/json;charset=utf-8',
//             'Authorization': authorization
//         },
//         'method': 'POST'
//     };
//
//     request(options,function (err,result,body) {
//         if(err){
//             return errorRequest(req,res,err.message);
//         }
//
//         let respCode = body['resp']['respCode'];
//         if(respCode === SUCCESS_RESPCODE){
//             Data(CALL_DATA_NAME).findOne({'id': id}).exec(function (err,data) {
//                 data.data.callId = body['resp']['callback']['callId'];
//                 data.data.status = 0;
//                 data.markModified('data');
//
//                 data.save(function () {
//                     return jsonResponse(res,data,req);
//                 });
//             });
//         }else{
//             let error_code = Code.SYSTEM_ERROR;
//             error_code.error_msg = '云之迅服务错误';
//             return errorRequest(req,res,error_code);
//         }
//     });
//
//
// };



function get_sign(timestamp) {
    return (md5(account_sid + auth_token + timestamp)).toUpperCase();
}

function get_authorization(timestamp) {
    return new Buffer(account_sid + ':' + timestamp).toString('base64');
}


function getCurTimeStampStr() {
    let date = new Date();
    return moment(date).format('YYYYMMDDHHmmss');
}

function send_response_xml_success(response) {
    response.set('Content-Type', 'text/xml');
    response.send(xml({
        'response': {
            'retcode' : 0
        }
    }));
}

function send_response_xml_fail(response) {
    response.set('Content-Type', 'text/xml');
    response.send(xml({
        'response': {
            'retcode' : -100
        }
    }));
}

function md5(key) {
    return crypto.createHash('md5').update(key).digest("hex");
}


