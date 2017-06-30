/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const lodash = require('lodash');




const lodash_pro_merge = function (user_data,update_user_data) {
    return lodash.mergeWith(user_data,update_user_data,function (a,b) {
        if(lodash.isArray(a)){
            return b;
        }
    })
};

const user_data = {
    'a':{
        'b':1
    }
};

const update_user_data = {
    'a':{
        'c':2
    }
};

console.log(lodash_pro_merge(user_data,update_user_data));

