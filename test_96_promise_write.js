/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


function abc() {
    try{
        return new Promise(function (resolve,reject) {
            reject(121);
        })
    }catch (e){
        console.log(e);
    }

}

function def() {
    return {abc: abc(),'adf':123};
}


async function dddd() {
    let {abc,adf} = await def();
    console.log('abc',abc);
    console.log('adf',adf);
    console.log('adf',await abc.then());
}

function test_return() {
    return new Promise(function (resolve,reject) {
        return resolve(abc());
    })
}

abc();

