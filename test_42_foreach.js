/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('foreach');
const Promise = require('bluebird');
const fs    = require('fs');

function abc(item) {
    return new Promise(function (resolve,reject) {
        fs.readFile('./test31.js',{},function (err,body) {
            resolve(body);
        });
    });
}


let arr = [1,2,3,4,5,6,7];


async function def() {
    arr.forEach(async item => {
        debug(`def item------- ${item}`);
        await abc(item);
    });

    debug(`def end-------`);
}

async function def1() {
    await Promise.map(arr,async item => {
        debug(`def item------- ${item}`);
        await abc(item);
    }) ;

    debug(`def end-------`);
}

async function def2() {

    debug(`def2 start-------`);
    arr.map(async item => {
        debug(`def2 item------- ${item}`);
        await abc(item);
    });

    debug(`def2 end-------`);
}

// def();
// def1();
// def2();

(async () => {
    await def();
    await def2();
})();
