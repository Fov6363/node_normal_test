/**
 * Created by yuanyuan on 17/3/19.
 */
const debug         = require('debug')('xinge');
const Promise       = require('bluebird');
const Xinge         = require('xinge');

const ios_access_id = 2200256808;
const ios_secret_key = '133309dd59528a53119070fedef467c7';
const content = '标题行';
const badge = 1;//未读数

const device_id = 'B0704496-9EEA-445F-8B8C-D79B92276725';

const XingeApp = new Xinge.XingeApp(ios_access_id, ios_secret_key);

let iosMessage = new Xinge.IOSMessage();
//以下都为默认值
iosMessage.alert = content;
iosMessage.badge = parseInt(badge);
iosMessage.sound = 'df';
iosMessage.acceptTime.push(new Xinge.TimeInterval(0, 0, 23, 0));

//TODO 先使用测试环境
XingeApp.pushToSingleDevice(device_id, iosMessage, Xinge.IOS_ENV_DEV, function (err, result) {
    if (typeof result === 'string') {
        try {
            result = JSON.parse(result);
        } catch (e) {

        }
    }
    debug('xinge_push result = ');
    debug(result);

});