const numeral = require('numeral');
const debug   = require('debug')('numeral');

let num = new numeral(10.02);
debug(`num = ${num.value()}`);

// debug(`sub = ${num.subtract(10).value()}`);
// num.set(0.1);
// debug(`add = ${num.add(0.2).value()}`);
// num.set(10.05);
// debug(`mul = ${num.multiply(100).value()}`);
// num.set(0.1);
// debug(`add = ${num.add(0.02).value()}`);

function $_add(x, y){
    if (!x) x = 0;
    if (!y) y = 0;
    x = parseFloat(x);
    y = parseFloat(y);

    let num = new numeral(x);

    return num.add(y).value();
}

let res = eval('$_add(0,1)');
debug(res);