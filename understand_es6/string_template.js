/**
 * Created by yuanyuan on 17/5/18.
 */
const str = "abc";

console.log(`name = ${str}`);




const arr = [1,2,3,4,5];

const arr_str = ab`arr = ${arr}`;

function ab(str_array,value_array) {
    let final_str = str_array.join('');
    value_array.forEach(item => {
         final_str += `${item} ,`;
    });

    return final_str.slice(0,-1);
}

console.log(arr_str);