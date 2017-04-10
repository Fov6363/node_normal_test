function linkSignStr(params) {
    let keys = Object.keys(params);
    keys.sort();
    let str = '';
    for(let i of keys){
        str += i + '=' + encodeURIComponent(params[i]) + '&';
    }
    str = str.slice(0,-1);
    return str;
}


let app_id = '2017031106166794';

let params = {
    'app_id'        : app_id + '',
    'charset'       : 'utf-8',
    'method'        : 'alipay.trade.app.pay',
    'sign_type'     : 'RSA',
    'timestamp'     : new Date().getTime() + '',
    'version'       : '1.0',
    'biz_content'   : JSON.stringify({"order_id":1087888239427603}),
    'notify_url'    : 'www.baidu.com',
};

console.log(linkSignStr(params));