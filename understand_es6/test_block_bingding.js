/**
 * Created by yuanyuan on 17/4/20.
 */
// const debug = require('debug')('block');
// const name = "abc";
// const age = 123;
//
// function tag(literals,...substitutions) {
//     console.log(literals);
//     console.log(substitutions);
//
//     return "abcb";
// }
//
// const msg = tag`niaho ${name}.my age is ${age}`;
//
// console.log(msg);


// var obj = {
//     a: 1,
//     0: 1,
//     c: 1,
//     2: 1,
//     b: 1,
//     1: 1
// };
//
// obj.d = 1;
//
// console.log(Object.keys(obj).join(""));

// let set = new WeakSet();
// let obj = {"a":1};
// set.add(obj);
//
// console.log(set.has(obj));
// obj = null;
// console.log(set.has(obj));

let iterator = function *() {
    yield 12;
    yield 11;
    yield 1;
    yield 2;
};

const _iterator = iterator();

console.log(_iterator.next());
console.log(_iterator.next());
console.log(_iterator.next());
console.log(_iterator.next());
console.log(_iterator.next());