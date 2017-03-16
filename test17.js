let lodash = require('lodash');
let querystring = require('querystring');
let Promise     = require('bluebird');











function abc(flag) {
    return new Promise(function (resole,reject) {
        if(flag) resole(1);
        reject(2);
    })
}





async function ddd() {
    try{
        let result = await abc(false);
    }catch (e){
        console.log(e);
    }

}






ddd();