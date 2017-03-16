/**
 * Created by yuanyuan on 16/12/30.
 */
let arr = '["ab","ef",3,4]';
console.log(Array.isArray(arr));

try{
    arr = JSON.parse(arr);
}catch (e){

}

console.log(arr);
console.log(typeof arr);
// console.log(JSON.parse(arr));
// console.log(typeof JSON.parse(arr));