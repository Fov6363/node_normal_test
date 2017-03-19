const moment = require('moment');
function get_random_array(day,user_count,phone,start_time) {
    start_time = getStartDate(start_time);

    day = parseInt((day - 1) / 2) + 1;
    let random_arr = [];

    for(let i = 0;i < day - 1;i++){
        random_arr.push(parseInt(Math.random() * user_count));
    }

    random_arr = random_arr.sort(function (a,b) {
        if(a > b){
            return true;
        }

        return false;
    });

    let new_random_arr = [];
    let total_num = 0;
    for(let i = 0;i < random_arr.length - 1;i++){
        if(i === 0){
            new_random_arr.push(random_arr[i]);
        }

        new_random_arr.push(random_arr[i + 1] - random_arr[i]);

    }

    for(let i of new_random_arr){
        if(i > 0){
            total_num +=i;
        }
    }

    new_random_arr.push(user_count - total_num);

    return return_phone_obj_by_random(start_time,new_random_arr,phone,true);
}

function return_phone_obj_by_random(start_time,random_array,phone,is_odd) {
    let arr = [];
    for(let i = 0;i < random_array.length;i++){
        let count = random_array[i];
        if(count <= 0) continue;
        let phone_arr = phone.slice(0,count);
        phone = phone.slice(count,phone.length);
        for(let j = 0;j < count;j++){
            let time;
            if(is_odd === undefined){
                time = start_time + i * 24 * 3600 * 1000;
            }else if(is_odd === true){
                let day = new Date(start_time).getDate();
                if(day % 2 === 1){
                    time = start_time + 2 * (i * 24 * 3600 * 1000);

                }else{
                    time = start_time + 3 * (i * 24 * 3600 * 1000);
                }
            }else if(is_odd === false){
                let day = new Date(start_time).getDate();

                if(day % 2 === 1){
                    time = start_time + 2 * ((i + 1) * 24 * 3600 * 1000);
                }else{
                    time = start_time + 2 * (i * 24 * 3600 * 1000);
                }
            }else {
                time = start_time + i * 24 * 3600 * 1000;
            }

            time += parseInt(Math.random() * 24 * 3600 * 1000);

            if(phone_arr[j]){
                arr.push({
                    time,phone: phone_arr[j]
                })
            }
        }
    }

    return arr;
}

function getStartDate(time) {
    var date = new Date(time);
    date.setHours(0, 0, 0);   // Set hours, minutes and seconds
    return date.getTime();
}


let phone = [13800000000,13800000001,13800000002,13800000003,13800000004,13800000005,13800000006,13800000007,13800000008,13800000009]//13800000010,13800000011,13800000012,13800000013,13800000014,13800000015,13800000016,13800000017,13800000018,13800000019,13800000020,13800000021,13800000022,13800000023,13800000024,13800000025,13800000026,13800000027,13800000028,13800000029,13800000030,13800000031,13800000032,13800000033,13800000034,13800000035,13800000036,13800000037,13800000038,13800000039,13800000040,13800000041,13800000042,13800000043,13800000044,13800000045,13800000046,13800000047,13800000048,13800000049,13800000050,13800000051,13800000052,13800000053,13800000054,13800000055,13800000056,13800000057,13800000058,13800000059,13800000060,13800000061,13800000062,13800000063,13800000064,13800000065,13800000066,13800000067,13800000068,13800000069,13800000070,13800000071,13800000072,13800000073,13800000074,13800000075,13800000076,13800000077,13800000078,13800000079,13800000080,13800000081,13800000082,13800000083,13800000084,13800000085,13800000086,13800000087,13800000088,13800000089,13800000090,13800000091,13800000092,13800000093,13800000094,13800000095,13800000096,13800000097,13800000098,13800000099];
let result = get_random_array(5,10,phone,new Date().getTime());
console.log(result);
console.log(result.length);

for(let i of result){
    console.log(moment(i.time).format('yyyy-MM-DD  HH:mm:ss'));
}
