/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('geo');
const Promise = require('bluebird');
const request = require('request');





function get_coord(address) {
    return new Promise(function (resovle,reject) {
        request({
            'url': 'http://59.110.21.9:17173/util/geo/loc2geo.json',
            'body': JSON.stringify({address}),
            'headers':{
                'Content-Type': 'application/json; charset=utf-8',
            },
            'method': 'POST'
        },function (err,res,body) {
            return resovle(JSON.parse(body).result.geo);
        });
    });

}

module.exports = get_coord;
