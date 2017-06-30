/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const lodash  = require('lodash');

const array = debug('array');

function to_array_field_name_convert(datas,to_array_field_name) {
    let arr = [];

    datas = datas.map(data => {
        return lodash.get(data,to_array_field_name);
    }).filter(data => {
        if(data !== null && data !== undefined){
            return data;
        }
    });

    datas.forEach(data => {
        arr = lodash.concat(arr,data);
    });

    let set = new Set(arr);

    return Array.from(set);
}

const datas = [{
    'id': 123,
    'name': 'abc',
    'arr': [1,2]
},{
    'id': 234,
    'name': 'adfadf',
    'arr': [10,2]
}];

let res = to_array_field_name_convert(datas,'arra');

array(res);