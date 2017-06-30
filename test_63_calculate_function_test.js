/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const deepEql                   = require('deep-eql');

function calculate_link_ratio(result,link_ratio_result,link_ratio) {

    let result_key = link_ratio['result_key'];
    for(let i = 0;i < result.length;i++){
        let result_item = result[i];
        let result_value = result_item[result_key];
        for(let j = 0;j < link_ratio_result.length;j++){
            let link_ratio_item = link_ratio_result[j];
console.log(`==== ${JSON.stringify(link_ratio_item)}`);
            let link_ratio_value = link_ratio_item[result_key] || 0;
        console.log(result_item);
        console.log(link_ratio_item);
            if(deepEql(result_item._id,link_ratio_item._id)){
                if(link_ratio_value === 0){
                    result_item[result_key] = 0;
                }else{
                    result_item[result_key] = (result_value - link_ratio_value) / link_ratio_value;

                }
                break;
            }

            if(j === link_ratio_result.length - 1){
                result_item[result_key] = 0;
            }
        }
    }
}

const result = [ { _id: { good_name: '盐酸普罗帕酮片' } ,sensor_count: 6,
        sensor_real_count: 6 },
        { _id: { good_name: '正旨平' },
            sensor_count: 8,
            sensor_real_count: 8 } ];
const link_ratio_result = [ { _id: { good_name: '正旨平' }, sensor_count: 7 },
    { _id: { good_name: '盐酸普罗帕酮片' }, sensor_count: 16 } ];

calculate_link_ratio(result,link_ratio_result,{
    'result_key':'sensor_count'
});

console.log(result);