/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const event = require('events');


const eve = new event();


eve.on('message',function (message) {
    console.log(`1-----` + message);
    eve.emit('niaho');
});

function abc() {
    eve.on('niaho',function () {
        console.log('---------------------------------------------------------------');
    })
}


eve.emit('message',123);


const res = abc();


console.log(res);


module.exports = eve;