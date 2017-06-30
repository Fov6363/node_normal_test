/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');

let obj = {'a':1,'b':2};


let {a,b} = obj;



function test(a,b) {
    return {a: a +1,b: b+1};
}

({a,b} = test(2,2));

let name = 'abc';
let obj2 = {
    [name]: 'adsfad'
};

// obj2[name] = '123';





console.log(a,b);
console.log(obj2);