/**
 * Created by yuanyuan on 17/5/18.
 */
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
let god_select_worker_id = 0;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        if(i === 0){
            cluster.fork({
                'a':'1'
            });
            god_select_worker_id = 1;
        }
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(worker.id);
        console.log(`worker ${worker.process.pid} died`);
        if(worker.id === god_select_worker_id){
            let new_worker = cluster.fork({
                'a':'1'
            });
            god_select_worker_id = new_worker.id;
        }else{
            cluster.fork();
        }
    });

    for (const id in cluster.workers) {
        cluster.workers[id].on('message', function (msg) {
            console.log(`msg = ${JSON.stringify(msg)}....id = ${id}`);
        });
    }

    cluster.on('message',function (worker,message) {
        console.log(`message = ${JSON.stringify(message)}....woker.pid = ${worker.process.pid}`);
        for (const id in cluster.workers) {
            cluster.workers[id].send({'message':'abc'});
        }
    });

} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    require('./index');

    console.log(`Worker ${process.pid} started`);
}