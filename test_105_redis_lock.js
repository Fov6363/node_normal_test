/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');


const http          = require('http');
var client1         = require('redis').createClient(6379, '127.0.0.1');
var Redlock         = require('redlock');
const Db            = require('mongodb').Db;
const MongoClient   = require('mongodb').MongoClient;
const Server        = require('mongodb').Server;
var collection;

var redlock = new Redlock(
    // you should have one client for each redis node
    // in your cluster
    [client1],
    {
        // the expected clock drift; for more details
        // see http://redis.io/topics/distlock
        driftFactor: 0.01, // time in ms

        // the max number of times Redlock will attempt
        // to lock a resource before erroring
        retryCount:  10,

        // the time in ms between attempts
        retryDelay:  200, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter:  200 // time in ms
    }
);
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World\n');
    update(res);
});
var resource = "1219924275036161";
var ttl = 10000;

MongoClient.connect('mongodb://localhost:27017/baas',async function(err, db) {

    // Create a collection
    collection = db.collection('users');
    // Insert the docs


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});

function update(res) {
    console.log('-----');
    redlock.lock(resource,ttl).then(lock => {
        collection.find({'id':1219924275036161}).toArray(function (err,result) {
            let age = result[0].user_data.age;
            age += 1;
            // age = 0;

            collection.updateOne({'id':1219924275036161},{'$set':{'user_data.age':age}},function (err,result) {
                lock.unlock();
                res.end('nihao');
            })
        });
    })

}
