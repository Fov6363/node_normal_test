/**
 * Created by yuanyuan on 17/1/5.
 */
const crypto = require('crypto');






 function md5(key) {
    if(typeof key != 'string'){
        key += '';
    }

    if(key){
        key  = crypto.createHash('md5').update(key).digest("hex");
    }
    return key;
};







console.log(md5('op_menu_like_1066485695971402'));