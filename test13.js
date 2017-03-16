/*

 Param <__re_middle_result.result[0].user_data.roles> replaced by <["运营管理"]>.

 if(typeof value === 'object'){
 value = JSON.stringify(value);
 }
 logger.info('Param <' + variable + '> replaced by <' + value + '>.');
 value_string = value_string.replace(variable, value);







 //{"data.name":{"$in":"__re_middle_result.id"}
 */

let obj = {"data.name":{"$in":"__re_middle_result.id"}};
let re = /__re_middle_result\.[\w_\-.\[\]]+/gi;
value_string = JSON.stringify(obj);


let variables = value_string.match(re);
// let value = "1";
// let value = "abc";
// let value = 1;  //ok
 //let value = '["1","2"]';     //ok
// let value = '{"id":"123"}';  ok

console.log(value);

if(typeof value === 'string'){
    console.log(value_string.replace(variables,value));
}else{
    console.log(value_string.replace("\"" + variables + "\"",value));

}
// console.log(value_string.replace("\"" + variables + "\"",value));
//
// console.log(value_string.replace(variables,value));






























