/**
 * Created by yuanyuan on 17/5/13.
 */
const cp = require('child_process');


for(let i = 0;i < 10;i++){
    let start_time = i + 1;
    let end_time = i + 2;
    if(start_time <= 9){
        start_time = '0' + start_time;
    }
    if(end_time <= 9){
        end_time = '0' + end_time;
    }
    const obj = {
        start: i * 500000,
        end: (i + 1) * 500000,
        start_time: '2017-05-' + start_time,
        end_time: '2017-05-' + end_time,
    };

    cp.fork('./test_62_sensor_report_create.js',[JSON.stringify(obj)]);
}
