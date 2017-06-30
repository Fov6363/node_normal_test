/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const util  = require('util');
const EventEmit = require('events');

function abc() {

}

util.inherits(abc,EventEmit);


const ab = new abc();
ab.on('error',function (adf) {
    
})