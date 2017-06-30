/**
 * Created by yuanyuan on 17/4/19.
 */
function check_param_batch(err_result,batch) {
    if(err_result !== null){
        return err_result;
    }

    if(batch && Array.isArray(batch) && batch.length > 0){
        batch.forEach(item => {
            if(!item.hasOwnProperty('event') || !Array.isArray(item['calcu_array']) || item['calcu_array'].length === 0){
                err_result = Code.PARAM_ERROR;
                err_result.error_msg = err_result.error_msg.replace('%s','batch');
            }else{
                item['calcu_array'].forEach(item => {
                    if(!item.hasOwnProperty('cal_function') || !item.hasOwnProperty('field_key') || !item.hasOwnProperty('field_type')){
                        err_result = Code.PARAM_ERROR;
                        err_result.error_msg = err_result.error_msg.replace('%s','batch');
                    }
                })
            }
        })
    }else{
        err_result = Code.PARAM_ERROR;
        err_result.error_msg = err_result.error_msg.replace('%s','batch');
    }

    return err_result;
}

let res = check_param_batch(null,[{"event":"sensors_up","calcu_array":[{"cal_function":"count","field_key":"id","field_type":"system"}]}]);

console.log(res);