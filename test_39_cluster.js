/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug')('cluster');
const Promise = require('bluebird');
const cluster = require('cluster');
const http   = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    debug(`Master ${process.pid} is running`);

    //Fork workers
    for(let i = 0;i < numCPUs;i++){
        cluster.fork();
    }

    cluster.on('exit',(worker,code,signal) => {
        debug(`worker ${worker.process.pid} died`);

    })
}else{
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end('hello word\n');

    }).listen(14567);

    debug(`Worker ${process.pid} started:)`);
}





