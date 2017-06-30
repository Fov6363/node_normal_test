/**
 * Created by yuanyuan on 17/3/19.
 */
const fs = require('fs');


function create_promise() {
    return new Promise((resolve,reject) => {
        fs.readFile('./abc.txt',function (err,body) {
            if(err){
                return resolve(err);//1
            }
            console.log(`if not error,do something`);//2
            resolve(body);//3
        })
    })
}



// create_promise().then(res => {
//     console.log(`res = ${res}`);//4
// },err => {
//     console.log(`err = ${err}`);//5
// });


function abc() {
    return create_promise();
}



abc().then(res => {
    console.log(res);
});

