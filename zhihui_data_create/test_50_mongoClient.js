/**
 * Created by yuanyuan on 17/3/19.
 */
const debug         = require('debug')('mongoClient');
const Promise       = require('bluebird');
const Db            = require('mongodb').Db;
const MongoClient   = require('mongodb').MongoClient;
const Server        = require('mongodb').Server;
const loop          = require('./test_62_sensor_report_create');
const args          = require('process').argv.slice(2);
const {start,end,start_time,end_time} = JSON.parse(args[0]);

MongoClient.connect('mongodb://localhost:27017/analysis_sensor_report',async function(err, db) {

    // Create a collection

    const data = await loop(start,end,start_time,end_time);
    var collection = db.collection('event_datas');
    // Insert the docs
    collection.insertMany(data, function(err, result) {

        debug(err);
        debug(result);
        db.close();
    });
});