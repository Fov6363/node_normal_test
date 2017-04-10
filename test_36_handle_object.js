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
    input: fs.createReadStream('./temp/handle_obj.log')
});

let i = 0;
let arr = [];

let obj = {};
rl.on('line',handle_object_param);
let stack_arr = [];

/*
 logger.info(`extend_constant.build_default_params start default_params = ${JSON.stringify(default_params)} , user_params = ${JSON.stringify(user_params)}`);

 loop_params(default_params,user_params);

 logger.info(`extend_constant.build_default_params end   default_params = ${JSON.stringify(default_params)}`);
 */
function handle_object_param(line) {
    let default_params_start_str = ' start obj = ';
    let default_params_end_str = ' end obj = ';

    i++;
    if(line.indexOf(default_params_start_str) !== -1){
        //start
        let start_params = line.slice(line.indexOf(default_params_start_str) + default_params_start_str.length,line.length);

        start_params = json_parse(start_params);
        stack_arr.push(start_params);
    }else{
        //end
        let end_params = line.slice(line.indexOf(default_params_end_str) + default_params_end_str.length,line.length);

        end_params = json_parse(end_params);
        let start_params = stack_arr.pop();
        obj = {
            'param': start_params,
            'result': end_params
        };

        arr.push(lodash.merge({},obj));
    }


    if( i === 15380){
        //finish

        arr = lodash.uniqWith(arr, lodash.isEqual);
        //t.deepEqual(t.context.extend_constant.handle_object(),{});
        arr.map(item => {
            console.log(`t.deepEqual(t.context.extend_constant.handle_object(${JSON.stringify( item.param)}),${JSON.stringify(item.result)});`);

        })
    }

}

function json_parse(str,num) {
    try{
        return JSON.parse(str)
    }catch (e){
        console.log(`${i}          1`);
    }

}