
const debug = require('debug')('promise');

function Promise(fn) {
    const PENDING = 0;
    const FULFILLED = 1;
    const REJECT = 2;

    let value = null;
    let state = PENDING;
    let handles = [];

    function fulfilled(result) {
        state = FULFILLED;
        value = result;
        handles.forEach(handle);
        handles = null;
    }

    function reject(reason) {
        state = REJECT;
        value = reason;
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

    function doResolve(fn,onFulfilled,onRejected) {
        let done = false;
        try{
            fn(function (result) {
                if(done) return;
                done = true;
                onFulfilled(result);
            },function (error) {
                if(done) return;
                done = true;
                onRejected(error);
            })
        }catch (e){
            if(done) return;
            done = true;
            reject(e);
        }

    }

    function getThen(result) {
        if(typeof result === 'object' || typeof result === 'function'){
            let then = result.then;
            if(typeof then === 'function'){
                return then;
            }
        }else{
            return null;
        }
    }


    this.done = function (onFulfilled,onRejected) {
        setTimeout(function () {
            handle({
                onFulfilled,
                onRejected,
            })
        },0);
    };

    this.then = function (onFulfilled,onRejected) {
        let self = this;
        return new Promise(function (resolve,reject) {
           return self.done(function (value) {
                    if(typeof onFulfilled === 'function'){
                        resolve(onFulfilled(value));
                    }else{
                        resolve(value);
                    }
                },function (error) {
                    if(typeof onRejected === 'function'){
                        resolve(onRejected(error));
                    }else{
                        reject(error);
                    }
                })
        })
    };

    function handle(handler) {
        if(state === PENDING){
            handles.push(handler);
        }else if(state === FULFILLED && typeof handler.onFulfilled === 'function'){
            handler.onFulfilled(value);
        }else if(state === REJECT && typeof handler.onRejected === 'function'){
            handler.onRejected(value);
        }else{
            debug('wowowowwowo----------------');
        }
    }

    doResolve(fn,resolve,reject);
}

let promise = new Promise(function (resolve,reject) {
    resolve(100);
});


promise.then(res => {
    debug(res);
});
debug('--------------------');