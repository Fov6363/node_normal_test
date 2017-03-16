/**
 * Created by yuanyuan on 17/1/7.
 */

Number.prototype.shift = function (bit) {
    return parseInt(this * (2 << bit));
};

function getSec () {
    return Date.parse(new Date()) / 1000 - 1420041600;
}

function getYmd () {
    return (new Date()).toISOString().slice(2, 10).replace(/-/g, '');
}
let doc = {'seid': 1};


var csid = getSec().shift(10)  + parseInt(doc.seid % 1000);
console.log(csid);