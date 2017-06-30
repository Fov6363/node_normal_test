/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


function person() {
    if(person.instance){
        return person.instance;
    }

    this.name = "a";
    person.instance = this;
}


const p1 = new person();
person.instance = false;
const p2 = new person();

console.log(p2 === p1);