/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


class Person{
    constructor(name){
        this.name = name;
    }

    toString(){
        return this.name + 'adf';
    }
}

let person = new Person("abc");

console.log(person.toString());