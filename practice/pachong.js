/**
 * Created by yuanyuan on 17/5/1.
 */
const Promise   = require('bluebird');
const request   = require('request');
const cheerio   = require('cheerio');

const arr = [];
const bt  = [];
//400以下已收集
async function run() {
   init();
    await Promise.map(arr,async item => {
        let first_url = `http://www.btmeet.org/search/sod-${item}.html`;
        try{
            let first_result = await send_request(first_url);
            let second_url_suffix = await get_url_by_first(first_result);
            let second_url = `http://www.btmeet.org${second_url_suffix}`;
            let second_result = await send_request(second_url);
            bt.push(get_bt_by_second(second_result));
            console.log(JSON.stringify(bt));
        }catch (e){
        }
    });

    bt.filter(item => {
        return item !== undefined;
    });
    console.log(bt);
}

function get_url_by_first(first_result) {
    const $ = cheerio.load(first_result);

    let str = $('.item-title').find('a').attr('href');

    return str;
}

function get_bt_by_second(second_result) {
    const $ = cheerio.load(second_result);
    let str = $('.panel-body').find('a').attr('href');

    return str;
}

function init() {
    for(let i = 1;i < 100;i++){
        arr.push(i);
    }
}

function send_request(url) {
    return new Promise(function (resolve,reject) {
        request({
            'url': url,
            'method': 'get'
        },function (err,res,body) {
            if(err){
                return reject(err)
            }else{
                return resolve(body);
            }
        });
    })
}

run();