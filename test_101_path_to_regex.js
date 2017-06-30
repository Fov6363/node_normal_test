/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


const pathToRegexp = require('path-to-regexp');


let url = '/data/:data_name/find.json';


let keys = [];
const map = new Map();

const regex = pathToRegexp(url,keys);

console.log(regex.toString());

map.set(regex,12);



for(let regex of map.keys()){
    if(regex.test(url)){
        console.log(map.get(regex));
    }
}