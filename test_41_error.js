/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('error');
const Promise = require('bluebird');


function abc() {
    return new Promise((resolve,reject) => {
        reject('1');
    })
}




function def() {
    let promise = abc();

    promise.then(result => {
        debug(`result = ` + result);
    },err => {
        debug(`err = ${err}`);
    })
}

function def1() {
    try{
        let promise = abc();

        promise.then(() => {
            debug(`result = ` + result);
        },err => {

        }).catch(e => {

        });
    }catch (e){
        debug(`def1 error,e = ${e}`);
    }

}


async function hjk() {
    try{
        let res = await abc();
        debug(`async res = ${res}`);
    }catch (e){
        debug(`async e = ${e}`);
    }
}

// def();
// hjk();
def1();
//await 只接收两种参数 1.它是一个async方法,2,它是一个promise