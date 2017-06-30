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

let date_titles = ["10月1日","10月3日","10月2日"];


date_titles.sort((a,b) => {
    if(normalUtil.isNumber(a)){
        //小时,周,月
        a = normalUtil.parseIntForce(a);
        b = normalUtil.parseIntForce(b);
    }else{
        //日
        a = moment(a,'M月D日').toDate().getTime();
        b = moment(b,'M月D日').toDate().getTime();
    }
    if(a >= b){
        return a;
    }else{
        return b;
    }
});


debug(`cur time = ${moment(new Date().getTime()).format('W周')}`);
debug(`cur start_day = ${moment(new Date().getTime()).startOf('day').toDate().getTime()}`);
debug(`cur start_day = ${moment(new Date().getTime()).endOf('day').toDate().getTime()}`);
debug(`cur sub_day = ${moment(new Date().getTime()).subtract(1,'days').format('YYYY年M月D日 HH:MM:ss')}`);
debug(`cur sub_day = ${moment(new Date().getTime()).subtract(7,'days').format('M.DD(dddd)')}`);
debug(`--    ${moment(new Date()).subtract(30,'days').startOf('day').toDate().getTime()}`);

debug(`--------- ${moment("10月01日","MM月DD日").toDate().getTime()}`);



debug(`--------------------------------------------------------------------`);

debug(`result = ${$birthday_age('asdfadf')}`);

debug(moment(new Date(-1031385600000).getTime()).format('YYYY-MM-DD HH:mm:ss'));
debug(moment('2017-04-26 15:21:31','YYYY-MM-DD HH:mm:ss').toDate().getTime());
debug(moment('2017-04-26 15:21:31','YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'));

function $birthday_age(birthday){

    if(!birthday) return 0;

    let bir = new Date(moment(birthday,'YYYY-MM-DD')).getTime();
    let now = new Date().getTime();
    let age_s = (now - bir);
    age_s = age_s > 0 ? age_s : 0;
    let year_s = 1000 * 365 * 24 * 60 * 60;
    return parseInt(age_s / year_s);
}
debug(`----------start of day ,start of hour,start of week,start of month`);
debug(moment(new Date()).startOf('hour'));
debug(moment(new Date()).startOf('month'));
debug(moment(new Date()).startOf('week'));
debug(moment(new Date()).startOf('day'));

debug(`----------end of day ,end of hour,end of week,end of month`);
debug(moment(new Date()).endOf('hour'));
debug(moment(new Date()).endOf('month'));
debug(moment(new Date()).endOf('week'));
debug(moment(new Date()).endOf('day'));