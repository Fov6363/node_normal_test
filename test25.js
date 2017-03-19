/**
 * Created by yuanyuan on 17/3/14.
 */
const fs = require('fs');
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function Promise(fn) {
    let state = PENDING;

    let value = null;

    let handles = [];

    function fulfilled(result) {
        state = FULFILLED;
        value = result;
        handles.forEach(handle);
        handles = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handles.forEach(handle);
        handles = null;
    }

    function resolve(result) {
        try{
            let then = getThen(result);
            if(then){
                doResolve(then.bind(result),resolve,reject);
                return;
            }

            fulfilled(result);
        }catch (e){
            reject(e);
        }
    }

    function getThen(value) {
        let type = typeof value;

        if(type && (type === 'object' || type === 'function')){
            let then = value.then;

            if(typeof then === 'function'){
                return then;
            }
        }

        return null;
    }

    function doResolve(fn,onFulfilled,onRejected){
        let done = false;
        try{
            fn(function (value) {
                if(done) return;
                done = true;
                onFulfilled(value);
            },function (reason) {
                if(done) return;
                done = true;
                onRejected(reason);
            })
        }catch (ex){
            if(done) return;
            done = true;
            onRejected(ex);
        }
    }

    function handle(handler) {
        if (state === PENDING){
            handles.push(handler);
        }else {
            if(state === FULFILLED && typeof handler.onFulfilled === 'function'){
                handler.onFulfilled(value);
            }
            if(state === REJECTED && handler.onRejected === 'function'){
                handler.onRejected(value);
            }
        }
    }
    
    this.done = function (onFulfilled,onRejected) {
        setTimeout(function () {
            handle({
                onFulfilled : onFulfilled,
                onRejected  : onRejected
            });
        },0)

    };

    this.then = function (onFulfilled,onRejected) {
        let self = this;
        return new Promise(function (resolve,reject) {
            return self.done(function (result) {
                if(typeof onFulfilled === 'function'){
                    try{
                        return resolve(onFulfilled(result));
                    }catch (e){
                        return reject(e);
                    }
                }else{
                    return resolve(result);
                }
            },function (error) {
                if(typeof onRejected === 'function'){
                    try{
                        return resolve(onRejected(error));
                    }catch (e){
                        return reject(e);
                    }
                }else{
                    return reject(error);
                }
            });
        });
    };

    doResolve(fn,resolve,reject);
}

let promise = new Promise(function (resolve,reject) {
   resolve('abc');
});

let promise1 = new Promise(function (resolve,reject) {
    resolve('abcefg');
});


promise.then(abc => {
    console.log(`abc = ` + abc);
    return promise1;
},def => {
    console.log(`def = ` + def);
}).then(res => {
    console.log(`res = ${res}`);
})

console.log(`---------------------------------------`);