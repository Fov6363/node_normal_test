const querystring = require('querystring');
const request = require('request-promise');
const fs = require('fs');
const http = require('http');



// var postData = querystring.stringify({
//     'schema_type' : 'user',
//     'title_key': [{"title":"用户id","key":"id","default":""},{"title":"用户姓名","key":"user_data.user_name"},{"title":"创建的直播","key":"counter_data.data_live_count","default":"4","convert":{"type":"translate","format":{"1":"一个","2":"两个","3":"三个","4":"没有"}}},{"title":"创建时间","key":"created_at","convert":{"type":"date","format":"YYYY-MM-DD HH:mm:ss"}}],
//     'filename': '用户列表.xlsx'
// });
//
//
// let reqObj = {
//     // 'json': true,
//     'uri': 'http://101.200.205.189:16166/util/excel/export.json',
//     'body': postData,
//     'method': 'POST'
// };
//
// let file = fs.createWriteStream('/Users/yuanyuan/Downloads/1.xlsx');
//
// request(reqObj)
//     .then(res => {
//         console.log(res);
//         console.log(typeof res);
//         // let stream =  fs.createReadStream(buffer);
//         // let write = fs.createWriteStream('/Users/yuanyuan/Downloads/1.xlsx');
//         //
//         // stream.pipe(write);
//         //
//         // // or use event handlers
//         // stream.on('data', function(data) {
//         //
//         // });
//         //
//         // stream.on('end', function() {
//         //
//         // });
//        // fs.write(buffer);
//
//         res.pipe(file);
//     })
//     .catch(err => {
//         console.log(err.message);
//     });




var postData = querystring.stringify({
    'schema_type' : 'user',
    'title_key': '[{"title":"用户id","key":"id","default":""},{"title":"用户姓名","key":"user_data.user_name"},{"title":"创建的直播","key":"counter_data.data_live_count","default":"4","convert":{"type":"translate","format":{"1":"一个","2":"两个","3":"三个","4":"没有"}}},{"title":"创建时间","key":"created_at","convert":{"type":"date","format":"YYYY-MM-DD HH:mm:ss"}}]',
    'filename': '用户列表.xlsx'
});

let file = fs.createWriteStream('/Users/yuanyuan/Downloads/2.xlsx');
let options = {
    hostname: '101.200.205.189',
    port: 16166,
    path: '/util/excel/export.json',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    },
    body: postData
};

let req = http.request(options,function (res) {
    console.log(typeof res);
    //res.pipe(file);
   // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //     console.log(`BODY: ${chunk}`);
    // });
    // res.on('end', () => {
    //     console.log('No more data in response.');
    // });
    res.pipe(file);
});


req.on('error',e => {
    console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();