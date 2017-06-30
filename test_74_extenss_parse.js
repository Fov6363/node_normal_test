/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const regStr = '(\\$add\\(|\\$divide\\(|\\$mul\\(|\\$number_format\\(|\\$cur_date_str\\(|\\$cur_date\\(|\\$to_num\\(|\\$to_str\\(|\\$to_array\\(|\\$to_number_array\\(|\\$array_value\\(|\\$recent_holiday\\(|\\$birthday_age\\(|\\$cal_days_count\\(|\\$concat\\(|\\$default_param\\(|\\$sub\\(|\\$sys_constant\\(|\\$recent_month\\(|\\$thumbnail\\(|\\$incr\\(|\\$calendar_start_time\\(|\\$calendar_end_time\\(|\\$rand_str\\(|\\$replace\\(|\\$date2str\\(|\\$str2date\\(|\\$cal_date_difference\\()';//api function list

const reg = new RegExp(regStr);
function $concat(param1,param2) {
    if(!param1) param1 = '';
    if(!param2) param2 = '';
    return param1 + '' + param2;
}

let str = eval("$concat($concat('红演圈(北京)网络科技有限公司', '/'), '运维部经理')");

//去尾巴
const init = function (arr) {
    const  isString = typeof arr === 'string';
    if (isString)arr = arr.split('');
    const rs = !arr || arr.length == 0? []:arr.slice(0,-1);
    if (isString)return rs.join('');
    return rs
};

//去头
const tail = function (arr) {
    const  isString = typeof arr === 'string';
    if (isString)arr = arr.split('');
    const rs = !arr || arr.length == 0? []: arr.slice(1);
    if (isString)return rs.join('');
    return rs
};

function test_1(param) {
    const isTuple = (typeof param === 'string' && param.startsWith('(') && param.endsWith(')'));
    const isOneExpression = typeof param === 'string' && reg.test(param);
    // const isArray = param.startsWith('[') && param.endsWith(']');
    // const is = param.startsWith('(') && param.endsWith(')');

    //isTuple只用来解析$in_date_range的操作符嵌套问题,只有$in_date_range与其它表达式,操作符的格式都不一样,只处理它即可
    if (isTuple && /\$in_date_range/.test(param)){//多个嵌套表达式
        param = test(param);
    }else{
        return test_2(param);
    }

    return param
}


function test_2(param){

    var obj = {};
    if ( typeof param == 'string' && reg.test( param ) ) {

        // var tmpParam = param;
        // let split_value = '(';
        // tmpParam = tmpParam.split(split_value);
        // for (var i = tmpParam.length - 2; i >= 0; i--) {
        //     if ( -1 == tmpParam[i].indexOf('$') ) {
        //         obj.status = -1;
        //         obj.name   = '表达式格式错误';
        //         return obj;
        //     }
        // }

        try {
            console.info('extend_parse.compile param = ' + param);
            param = eval( "("+ param +")");//parse json
        }catch(e){
            console.error('表达式执行错误');
            console.error(param);
            console.error(e);
            throw e;
        }
    }

    return param ;
};

function test(param) {

    if (typeof param === 'string' && reg.test( param )){
        console.log(`tail = ${tail(param)}`);
        console.log(`init = ${init(tail(param))}`);
        const arrayStr = `[${init(tail(param))}]`;
        console.log(`arrayStr = ${arrayStr}`);

        try{
            //将元组替换为数组计算
            const rs =  JSON.stringify(eval(`(()=>{return ${arrayStr};})()`));
            //数组转换为元组字符串
            return `(${init(tail(rs))})`;
        }catch(e) {
            console.error('表达式执行错误');
            console.error(param);
            console.error(e);
            throw e;
        }
    }else {//没有要计算的表达式
        console.info('无表达式');
        return param;
    }
}
// console.log(str);
const res = test_1("$concat($concat('红演圈(北京)网络科技有限公司', '/'), '运维部经理'");

console.log(res);
//$array_add_items($array_to_string('["ab","cd"]'))