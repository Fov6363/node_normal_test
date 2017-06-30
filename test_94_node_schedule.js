/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
var schedule = require('node-schedule');
const cronParser = require('cron-parser');
//*/3600 * * * * *
var j = schedule.scheduleJob('*/5 * * * * *', function(){
    console.log('date1 = %d',new Date().getTime());
});

// var jd = schedule.scheduleJob('*/60 * * * * *', function(){
//     console.log('date2 = %d',new Date().getTime());
// });

// var start;
// var tz;
//    // var res = cronParser.parseExpression('*/59 * * * * *', { currentDate: start, tz: tz });
// // console.log(res);
//
// function convert_period_to_actionTime(period) {
//     let second = Math.abs(period / 1000);
//
//     if(second >= 3600){
//         second = parseInt(second / 3600);
//         return '1 1 */' + second + ' * * *';
//     }else if(second >= 60){
//         second = parseInt(second / 60);
//         return '1 */' + second + ' * * * *';
//     }else{
//         return '*/' + second + ' * * * * *';
//     }
// }
//
// console.log(convert_period_to_actionTime(3600000)
//);
console.log(__dirname);