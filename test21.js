/**
 * Created by yuanyuan on 17/1/23.
 */

Array.prototype.keySort = function(keys) {

    keys = keys || {};

// via
// http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
    var obLen = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    };

// avoiding using Object.keys because I guess did it have IE8 issues?
// else var obIx = function(obj, ix){ return Object.keys(obj)[ix]; } or
// whatever
    var obIx = function(obj, ix) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (size == ix)
                    return key;
                size++;
            }
        }
        return false;
    };

    var keySort = function(a, b, d) {
        d = d !== null ? d : 1;
        // a = a.toLowerCase(); // this breaks numbers
        // b = b.toLowerCase();
        if (a == b)
            return 0;
        return a > b ? 1 * d : -1 * d;
    };

    var KL = obLen(keys);

    if (!KL)
        return this.sort(keySort);

    for ( var k in keys) {
        // asc unless desc or skip
        keys[k] =
            keys[k] == 'desc' || keys[k] == -1  ? -1
                : (keys[k] == 'skip' || keys[k] === 0 ? 0
                : 1);
    }

    this.sort(function(a, b) {
        var sorted = 0, ix = 0;

        while (sorted === 0 && ix < KL) {
            var k = obIx(keys, ix);
            if (k) {
                var dir = keys[k];
                sorted = keySort(a[k], b[k], dir);
                ix++;
            }
        }
        return sorted;
    });
    return this;
};

let lodash = require('lodash');

var obja = [
    {USER:"bob",  SCORE:2000, TIME:32,    data: {AGE:16}, COUNTRY:"US"},
    {USER:"jane", SCORE:4000, TIME:35,    data: {AGE:16}, COUNTRY:"DE"},
    {USER:"tim",  SCORE:1000, TIME:30,    data: {AGE:17}, COUNTRY:"UK"},
    {USER:"mary", SCORE:1500, TIME:31,    data: {AGE:19}, COUNTRY:"PL"},
    {USER:"joe",  SCORE:2500, TIME:33,    data: {AGE:18}, COUNTRY:"US"},
    {USER:"sally",    SCORE:2000, TIME:30,    data: {AGE:16}, COUNTRY:"CA"},
    {USER:"yuri", SCORE:3000, TIME:34,    data: {AGE:19}, COUNTRY:"RU"},
    {USER:"anita",    SCORE:2500, TIME:32,    data: {AGE:17}, COUNTRY:"LV"},
    {USER:"mark", SCORE:2000, TIME:30,    data: {AGE:18}, COUNTRY:"DE"},
    {USER:"amy",  SCORE:1500, TIME:29,    data: {AGE:19}, COUNTRY:"UK"}
];

// var sort_by = {
//     SCORE:"desc",TIME:"asc", "data.AGE":"desc"
// };
//
// let result = obja.keySort(sort_by);
//
// console.log(result);




let result = lodash.orderBy(obja,['SCORE','data.AGE'],['','asc']);
console.log(result);