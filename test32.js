/**
 * Created by yuanyuan on 17/3/24.
 */
const deasync = require('deasync');
const Promise = require('bluebird');

function test1() {
    Promise.map([1,2],async item => {

        return test2(item);
    }).then(res => {
        console.log(res);
    })
}

function test2(a) {
    let res = deasync(function (a,done) {
        console.log(`a ============ ${a}`);

        let promise = Promise.resolve(12);
        promise.then(res => {
            console.log(`res = ${res}`);
            done(null,res);
        })
    });

    return res(a);
}

function test3() {
    let promise = Promise.resolve(21);

    promise.then(res => {

        return test2(res);
    }).then(result => {
        console.log(result);
    })


}
// test2(123);
// test1();
test3();