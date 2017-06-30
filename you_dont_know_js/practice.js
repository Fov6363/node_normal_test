/**
 * Created by yuanyuan on 17/5/4.
 */
function test_1() {
    console.log(`1`);

    return new Promise(function (resolve,reject) {
        console.log(`2`);

        return resolve(100);
    })
}




test_1().then(val => console.log(val));