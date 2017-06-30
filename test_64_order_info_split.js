/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('obj');
const Promise = require('bluebird');

// let str = "app_id=2017010504855357&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%222088521332539900%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%22%E7%94%A8%E6%88%B7%E8%AE%A2%E5%8D%951227285496660339%22%2C%22out_trade_no%22%3A%221227285496660339%22%7D&charset=utf-8&method=alipay.trade.app.pay&notify_url=http%3A%2F%2F101.201.115.31%3A28030%2Futil%2Fpay%2Falipay%2Fcallback.json&sign=hc3kxCcyUy7jvdIEeFLjg7ZYhVAKasb31rozqzWwacRZ0HRxQo3%2BAOsK6u4donR2Q9w6xHq%2FJfdRvVuYa9M13a0MMBuBB%2B5w%2FI2BbkZ3Oh9V6wi2yZkC1MZWEIQUj%2BMwyBYQa5pZWsFF8h0dkzM%2FMmM1W%2Fg856SunR7gbe3MShk%3D&sign_type=RSA&timestamp=2017-04-26%2016%3A00%3A10&version=1.0";

let str = "app_id=2017041206669247&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%222088521540330151%22%2C%22product_code%22%3A%22QUICK_WAP_PAY%22%2C%22total_amount%22%3A%221%22%2C%22subject%22%3A%22%E5%95%86%E5%93%81%E5%90%8D%E7%A7%B0%22%2C%22out_trade_no%22%3A%221225716810187002%22%7D&charset=utf-8&method=alipay.trade.wap.pay&notify_url=http%3A%2F%2F101.201.115.31%3A28030%2Futil%2Fpay%2Falipay%2Fcallback.json&return_url=http%3A%2F%2Flxy.leoswitch.com%2Fpaysuccess.html&sign=puvSwZfHs89bMMzaPnZRDrKGXGZ5UrloGMPOFmTW8tpvjwudGs1axqAIauqoDBdHbFWqLV5%2FFITxJWisTsA%2BmloGMSlW3gKXvsF1hWTGIatAoY%2FdjTRK9FZvHRjg4cw1H952j37GCCUWE4Lf3l4mvggIYypHfDExnRhtd9k2x1w%3D&sign_type=RSA&timestamp=2017-05-24%2013%3A41%3A11&version=1.0";
let arr = str.split('&');
let obj = {};

console.log(arr);

arr.map(item => {
    let arr2 = item.split('=');
    obj[arr2[0]] = decodeURIComponent(arr2[1]);
});

// debug(JSON.stringify(obj));

console.log(obj);
