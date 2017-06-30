/**
 * Created by yuanyuan on 17/3/19.
 */
const debug             = require('debug')('faker');
const faker             = require('faker');
const moment            = require('moment');

faker.locale = 'zh_CN';

// debug(faker.name.firstName());
// debug(faker.name.lastName());
// debug(faker.address.state());
// debug(faker.commerce.price());
// debug(faker.company.companyName());
// debug(faker.random.number({
//     'min': 100,
//     'max': 300,
// }));
// debug(faker.date.between('2017-04-03','2017-04-13'));
//
// debug(moment(faker.date.between('2017-04-03','2017-04-13')).toDate().getTime());

debug(new Date().getTime());
let arr = [];
let sex = ["男","女"];
let education_arr = ['小学','初中','高中','大学',];

for(let i = 1;i < 100000;i++){
    let doc = {};

    let timestamp = moment(faker.date.between('2017-04-03','2017-04-13')).toDate().getTime();

    doc.id  = i;
    doc._id = i;
    doc.event = 'order';
    doc.uid = faker.random.number({
        'min': 1000,
        'max': 2000,
    });
    doc.unique_uid = doc.uid;
    doc.timestamp = timestamp;
    doc.date = {
        hour    : moment(timestamp).format('H'),
        day     : moment(timestamp).format('YYYY年M月D日'),
        week    : moment(timestamp).format('w'),
        month   : moment(timestamp).format('M'),
    };
    doc.event_attr = {
        'sex': sex[Math.round(Math.random())],
        'paymentAmount': faker.random.number({
            'min': 500,
            'max': 2000,
        }),
        'province': faker.address.state(),
        'age'   : faker.random.number({
            'min': 5,
            'max': 95,
        }),
        'income': faker.random.number({
            'min': 1000,
            'max': 10000,
        }),
        'sign_in': faker.random.number({
            'min': 1,
            'max': 100,
        }),
        'name'   : faker.name.firstName() + faker.name.lastName(),
        'education':  education_arr[Math.round(Math.random() * 3)],
    };

    arr.push(doc);
}
debug(new Date().getTime());
debug(arr.length);

module.exports = arr;