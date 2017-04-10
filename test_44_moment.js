/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('moment');
const Promise = require('bluebird');
const moment = require('moment');
const normalUtil = require('normalutil');

debug('hour = %s',moment(new Date().getTime()).format('H'));
debug('day = %s',moment(new Date().getTime()).format('YYYY年M月D日'));
debug('week = %s',moment(new Date().getTime()).format('w'));
debug('month = %s',moment(new Date().getTime()).format('M'));
debug('month type = %s', typeof moment(new Date().getTime()).format('M'));

debug(moment(`2017年4月5日`,'YYYY年M月D日').toDate().getTime());

let date_titles = ["2016年10月1日","2016年10月3日","2016年10月2日"];


date_titles.sort((a,b) => {
    if(normalUtil.isNumber(a)){
        //小时,周,月
        a = normalUtil.parseIntForce(a);
        b = normalUtil.parseIntForce(b);
    }else{
        //日
        a = moment(a,'YYYY年M月D日').toDate().getTime();
        b = moment(b,'YYYY年M月D日').toDate().getTime();
    }
    if(a >= b){
        return a;
    }else{
        return b;
    }
});


debug(`cur time = ${moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')}`);