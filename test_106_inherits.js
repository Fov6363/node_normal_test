/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const util   = require('util');

function person() {

}

function stu() {

}

stu.prototype.name = "xiaoli";
stu.prototype.abc = function () {
    return 1+1;
};

util.inherits(stu,person);
const pers = new stu();
console.log(pers);
