/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const fs     =require('fs');
const path = require('path');
const moment = require('moment');
const lodash = require('lodash');
//
// function mkdirsSync(dirpath) {
//     if (!fs.existsSync(dirpath)) {
//         let pathtmp = '';
//         dirpath.split(path.sep).forEach(function(dirname) {
//             pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
//             if(!pathtmp) {
//                 return;
//             }
//             console.log(pathtmp);
//             if(!fs.existsSync(pathtmp)) {
//                 try {
//                     console.log(`---------------`);
//                 } catch (err) {
//                     console.log(err);
//                 }
//             } else {
//                 console.log('Exist path %s', pathtmp);
//             }
//         });
//     }
//     console.log(`'`);
//     return true;
// }
//
// mkdirsSync('/Users/yuanyuan/WebstormProjects/node_normal_test');


const result = fs.statSync('./test_89_util.js');

console.log( moment(lodash.get(result,'mtime')).format('x'));