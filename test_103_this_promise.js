/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


function Person() {

}

function test() {
    console.log(this);
    return new Promise(function (resolve,reject) {
        console.log(`this`,this);
        return resolve(this.name);
    });
}

Person.prototype.test = test;

const person = new Person();
person.name = 'dfadfa';


person.test().then(item => {
    console.log(item);
});