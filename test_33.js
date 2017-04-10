/**
 * Created by yuanyuan on 17/3/19.
 */
const debug     = require('debug');
const Promise   = require('bluebird');
const fs        = require('fs');
const readline  = require('readline');
const normalUtil = require('normalutil');
const deep_eql  = require('deep-eql');
const lodash    = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('./temp/default_params.log')
});

let i = 0;
let arr = [];

let obj = {};
rl.on('line',handle_default_param);

/*
 logger.info(`extend_constant.build_default_params start default_params = ${JSON.stringify(default_params)} , user_params = ${JSON.stringify(user_params)}`);

 loop_params(default_params,user_params);

 logger.info(`extend_constant.build_default_params end   default_params = ${JSON.stringify(default_params)}`);
 */
function handle_default_param(line) {
    let default_params_str = 'start default_params = ';
    let user_params_str = ' , user_params = ';
    let default_params_index = line.indexOf(default_params_str) + default_params_str.length;
    let user_params_index = line.lastIndexOf(user_params_str) + user_params_str.length;

    let str = line.slice(default_params_index,line.length);

    i++;

    if(line.indexOf(user_params_str) !== -1){
        //reset user_params_index
        user_params_index = str.lastIndexOf(user_params_str);

        //start
        let default_params = str.slice(0,user_params_index);
        let user_params = str.slice(user_params_index + user_params_str.length,str.length);

        let default_params_obj = json_parse(default_params,0);
        let user_params_obj = json_parse(user_params,0);
        obj['params'] = [default_params_obj,user_params_obj];

    }else{
        //end
        let default_params_end = 'end   default_params = ';
        let default_params = line.slice(line.indexOf(default_params_end) + default_params_end.length,line.length);
        let result_obj = json_parse(default_params,1);
        obj['result'] = result_obj;
        let obj2 = lodash.merge({},obj);
        arr.push(obj2);
        obj = {};
    }

    if(i === 20055){
        arr = lodash.uniqWith(arr, lodash.isEqual);
        console.log(JSON.stringify(arr));
    }
}

function json_parse(str,num) {
    try{
        return JSON.parse(str)
    }catch (e){
        console.log(`${i}`);
    }

}