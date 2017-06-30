/**
 * Created by yuanyuan on 17/3/19.
 */
const debug         = require('debug')('mongoClient');
const Promise       = require('bluebird');
const Db            = require('mongodb').Db;
const MongoClient   = require('mongodb').MongoClient;
const Server        = require('mongodb').Server;

MongoClient.connect('mongodb://localhost:27017/analysis_sensor_report',async function(err, db) {

    // Create a collection
    var collection = db.collection('event_datas');
    // Insert the docs
    collection.aggregate([{'$match': {"$and":[{"timestamp":{"$gt":1}},{"timestamp":{"$lt":9223372036854776000}},{"$and":[{"timestamp":{"$gt":0}}]}]}},{'$group':{"_id":{},"interact_count":{"$sum":1}}}],function (err,result) {
        console.log(err);
        console.log(result);
    })
});