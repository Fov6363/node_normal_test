/**
 * Created by yuanyuan on 17/3/17.
 */
const Util          = require('util');
const moment        = require('moment');
const XLSX          = require('xlsx');


const CustomRouter = {};

CustomRouter.batch_user_new = async function (req,res) {};

async function batch_create_user(phone,type,start_time,end_time,uid) {
    start_time = getStartDate(start_time);
    end_time   = getEndDate(end_time);

    let phone_time_arr = build_user_date(phone,type,start_time,end_time);

    console.log(phone_time_arr);
}


function build_user_date(phone,type,start_time,end_time) {
    let time = end_time - start_time;

    let day = parseInt(time / (3600 * 24 * 1000));


    if(type === 0 || type === 1 || type === 2){
        return random_user_date(start_time,day,phone);
    }

    if(type === 3){
        return odd_user_date(start_time,day,phone);
    }

    if(type === 4){
        return even_user_date(start_time,day,phone);
    }

    return random_user_date(start_time,day,phone);
}

function random_user_date(start_time,day,phone) {

    return get_random_array(day,phone.length,phone,start_time);
}



function odd_user_date(start_time,day,phone) {
    day = parseInt((day - 1) / 2) + 1;
    return get_random_array(day,phone.length,phone,start_time,true);

}

function even_user_date(start_time,day,phone) {
    day = parseInt((day - 1) / 2) + 1;
    return get_random_array(day,phone.length,phone,start_time,false);
}


function get_random_array(day,user_count,phone,start_time,is_odd) {
    let random_arr = [];
console.log(`---data = ${day},user_count = ${user_count},phone = ${JSON.stringify(phone)} ,start_time = ${start_time} ,end_time = ${is_odd}`);
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

    return return_phone_obj_by_random(start_time,new_random_arr,phone,is_odd);
}

function getStartDate(time) {
    var date = new Date(time);
    date.setHours(0, 0, 0);   // Set hours, minutes and seconds
    return date.getTime();
}

function getEndDate(time) {
    var date = new Date(time);
    date.setHours(23, 59, 59);   // Set hours, minutes and seconds
    return date.getTime();
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
                    time = start_time + 3 * (i * 24 * 3600 * 1000);
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


async function read_phone_from_excel(req) {

    let file = req.files.file;

    let keys = 'phone|long';

    return await handle_xml_to_baas_array(keys,file);
};


function handle_xml_to_baas_array(keys,file) {
    return new Promise(function (resolve,reject) {
        let promise = Keygen.issuePromise();
        let result = {
            'data'  : '',
            'error' : null
        };

        keys = keys.split(',');

        promise.then(key => {
            if (isNaN(key)) {
                result['error'] = Code.SYSTEM_ERROR;
                return resolve(result);
            }

            get_temp_file_unique_path(key,function (err,file_path) {
                file.mv(file_path, function (err) {
                    if (err) {
                        result['error'] = Code.SYSTEM_ERROR;
                        return resolve(result);
                    }

                    let datas;
                    try{
                        let workbook = XLSX.readFile(file_path);
                        datas = excel_to_json(workbook);
                    }catch (e){
                        logger.error('excel_to_json error,e = ' + e.message);
                        result['error'] = Code.XML_PARSE_FAIL;
                        return resolve(result);
                    }

                    let datas_keys = Object.keys(datas);
                    let baas_array_all = [];

                    for(let key of datas_keys){
                        let item = datas[key];
                        item.map(obj_item => {

                            let obj_item_keys = Object.keys(obj_item);
                            for(let i = 0;i < obj_item_keys.length;i++){
                                let field = keys[i];
                                let field_name = '';
                                let field_type = '';

                                if(field.indexOf('|') !== -1){
                                    field_name = field.split('|')[0];
                                    field_type = field.split('|')[1];
                                }else{
                                    field_name = field;
                                }

                                baas_array_all.push(get_value_by_type(obj_item[obj_item_keys[i]],field_type));
                            }
                        });

                    }
                    resolve(baas_array_all);
                });
            });

        });
    });
}


function excel_to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}

function get_value_by_type(value,type) {
    switch (type){
        case 'int':
            return parseInt(value) || 0;
        case 'string':
            return value + '';
        case 'float':
            return parseFloat(value) || 0;
        case 'long':
            return new Number(value).valueOf() || 0;
        default:
            return value;

    }
}

batch_create_user(['18247184097','18247678765'],0,1491580800000,1494172800000);


module.exports = CustomRouter;