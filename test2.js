const moment     = require('moment');
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('/Users/yuanyuan/Downloads/query_user.csv')
});

let arr = [];
let key_arr = [];
let i = 0;

lineReader.on('line',function (line) {
    let obj = {
        'user_data':{}
    };

    if(i === 0){
        key_arr = line.split(',');
    }else{
        let value_arr = line.split(',');
        for(let j = 0;j < value_arr.length;j++){
            if(value_arr[j] !== ''){
                obj['user_data'][key_arr[j]] = value_arr[j];
            }
        }

        let time = new Date().getTime();
        obj['_id'] = parseInt(obj['user_data']['id']) + parseInt(obj['user_data']['second_id']);
        obj['id'] = parseInt(obj['user_data']['id']) + parseInt(obj['user_data']['second_id']);
        obj['uid'] = Math.abs(obj['user_data']['id']);
        obj['timestamp'] = parseInt(obj['user_data']['$signup_time']) || time ;
        obj['updated_at'] = parseInt(obj['user_data']['$signup_time']) || time;

        delete obj['user_data']['distinct_id'];
        delete obj['user_data']['id'];
        delete obj['user_data']['time'];
        delete obj['user_data']['$signup_time'];

        arr.push(obj);

    }
    i++;

    if(i === 100){
        console.log(JSON.stringify(arr));
    }
});


function conver_time(str) {
    let mom = new moment(str);

    return mom.toDate(str).getTime();
}