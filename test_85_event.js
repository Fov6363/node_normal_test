/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');

const event = require('events');


const eve = new event();


eve.on('message',function (message) {
    console.log(message);
});

eve.on('message1',function (message) {
    console.log(message);
});

console.log(eve);