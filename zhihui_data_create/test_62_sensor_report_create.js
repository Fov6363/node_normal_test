/**
 * Created by yuanyuan on 17/3/19.
 */
const debug             = require('debug')('faker');
const faker             = require('faker');
const moment            = require('moment');
// const get_coord         = require('./test_69_geo');
const lodash            = require('lodash');
const Promise       = require('bluebird');
const Db            = require('mongodb').Db;
const MongoClient   = require('mongodb').MongoClient;
const Server        = require('mongodb').Server;
const args          = require('process').argv.slice(2);
const {start,end,start_time,end_time} = JSON.parse(args[0]);

async function insert(data) {
    return new Promise(function (resolve,rejct) {
        MongoClient.connect('mongodb://localhost:27019/analysis_sensor_report',async function(err, db) {
            var collection = db.collection('event_datas');
            // Insert the docs
            collection.insertMany(data, function(err, result) {
                db.close();

                resolve('ok');
            });
        });
    });

}



faker.locale = 'zh_CN';

debug(new Date().getTime());
const map = new Map();
const sensor_name_arr = ["摆件传感器","客流传感器","挂件传感器"];

let sensor_data_type = [1,2,3,4];
const sensor_type = [0,1];
const sensor_use_arr = [0,1,101,102,103];
const sanxing_goods_name = ["A388","A300 ","A308","N620","X199","X420","A539S308 ","X359 ","V200 ","V205","V208","X600"];
const apple_goods_name = ["iPhone 3G","iPhone 3GS","iPhone 45.	","iPhone 4S6","iPhone 57","iPhone 5C8","iPhone 5S9","iPhone 610","iPhone 6plus","iPhone 6s12","iPhone 6s plus","iPhone 7","iPhone 7splus"];
const xiaomi_goods_name = ["M5系列","红米Note3","系列Note","系列红米3","系列4S","系列M4系列","4C系列","红米Note2系列","红米Note系列","红米2系列","红米2A系列","2S系列","M1系列","M2系列","Mione1S系列"];
const huawei_goods_name = ["Mate S","P8，Mate7","荣耀7","荣耀7i","荣耀6 Plus","麦芒4G","P8青春版","荣耀6","Y635","荣耀4A","荣耀3C","荣耀4C","荣耀4X"];

const brand_id_arr = [111,112,113,114];
const brand_name_arr = ['三星','苹果','小米','华为'];

const state_arr = [0,1,2,3,4];
const sensor_map = new Map();
async function loop(start,end,start_time,end_time) {
    let arr = [];
    for(let i = start;i < end;i++){
        let doc = {};

        let timestamp = moment(faker.date.between(start_time,end_time)).toDate().getTime();

        doc.id  = i;
        doc._id = i;
        doc.event = 'sensor_report';
        doc.uid = faker.random.number({
            'min': 1000,
            'max': 2000,
        });
        doc.unique_uid = doc.uid;
        doc.timestamp = timestamp;
        doc.date = {
            hour: moment(timestamp).format('YYYY年MM月DD日HH小时'),
            day: moment(timestamp).format('YYYY年MM月DD日'),
            week: moment(timestamp).format('YYYY年W周'),
            month: moment(timestamp).format('YYYY年MM月'),
        };
        doc.event_attr = {
            'sensor_id': faker.random.number({
                'min': 50,
                'max': 100,
            }),
            'shop': '测试门店名',
            'shop_id': 1245205073298723,
            "shop_province":"重庆市",
            "shop_province_code":"110001",
            "shop_city":"重庆市",
            "shop_city_code":"110002",
            "shop_district":"渝中区",
            "shop_district_code":"110003",
            "shop_street":"渝中街道",

            'show_case': faker.name.firstName() + faker.name.lastName() + '的展柜名',
            'show_case_id': faker.random.number({
                'min': 100,
                'max': 150,
            }),
            "show_case_group_id":faker.random.number({
                'min': 0,
                'max': 100,
            }),
            'type': Math.round(Math.random()),
            'x': faker.random.number({
                'min': 100,
                'max': 600,
            }),
            'y': faker.random.number({
                'min': 100,
                'max': 300,
            }),
            'width': faker.random.number({
                'min': 30,
                'max': 90,
            }),
            'height': faker.random.number({
                'min': 30,
                'max': 90,
            }),
            'valuetype': '热度',
            'radius': faker.random.number({
                'min': 10,
                'max': 20,
            }),
            'startangle': faker.random.number({
                'min': 0,
                'max': 180,
            }),
            'endangle': faker.random.number({
                'min': 180,
                'max': 360,
            }),
            "coord":[
                106.51614,
                29.538679
            ]
        };

        doc.event_attr = lodash.merge(doc.event_attr,get_sensor(doc.event_attr.sensor_id));

        arr.push(doc);

        if(i !== 0 && i % 10000 === 0){
            console.log(`i======${i}`);
            await insert(arr);
            arr = [];
        }
    }


    return arr;
}

function get_sensor(sensor_id) {
    if(sensor_map.has(sensor_id)){
        return sensor_map.get(sensor_id);
    }
    const brand_id_index = Math.round(Math.random() * 3);
    let goods_name_arr;
    if(brand_id_index === 0){
        goods_name_arr = sanxing_goods_name;
    }else if(brand_id_index === 2){
        goods_name_arr = apple_goods_name;
    }else if(brand_id_index === 3){
        goods_name_arr = xiaomi_goods_name;
    }else{
        goods_name_arr = huawei_goods_name;
    }

    sensor_map.set(sensor_id,{
        'sensor_mac_address': get_sensor_mac_address(),
        'sensor_name': get_sensor_name(),
        'sensor_data_type': sensor_data_type[Math.round(Math.random() * 3)],
        'sensor_type': sensor_type[Math.round(Math.random())],
        'sensor_use': sensor_use_arr[Math.round(Math.random() * 4)],

        'goods_id': faker.random.number({
            min: 100000,
            max: 200000
        }),
        'goods_out_id': '',
        'brand_id': brand_id_arr[brand_id_index],
        'brand_name': brand_name_arr[brand_id_index],
        'goods_name': goods_name_arr[Math.round(Math.random() * 10)],
        'sensor_state' : state_arr[Math.round(Math.random() * 4)],

    });

    return sensor_map.get(sensor_id);
}
//
function get_sensor_name() {
    return faker.name.firstName() + faker.name.lastName() + '的' + sensor_name_arr[Math.round(Math.random() * 2)];
}

function get_sensor_mac_address() {
    return faker.random.uuid().slice(0,12);
}

async function get_coord_by_shop_province(shop_province) {
    if(map.has(shop_province)){
        return map.get(shop_province);
    }

    let result = await get_coord(shop_province);
    map.set(shop_province,result);

    return result;
}

function get_age_range_by_age(age) {
    if(age >= 0 && age < 25){
        return [0,25];
    }else if(age >= 25 && age < 35){
        return [25,35];
    }else if(age >= 35 && age < 45){
        return [35,45];
    }else{
        return [45,150];
    }
}

loop(start,end,start_time,end_time);

module.exports = loop;