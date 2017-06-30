/**
 * Created by yuanyuan on 17/5/18.
 */
const http = require('http');
const siri = require('./siri');
const lodash = require('lodash');

if(process.env.a === '1'){
    console.log(`I am is selected worker`);
}

http.createServer((req, res) => {
    console.log(`process id = ${process.pid}`);

    if(req.url === '/1.json'){
        process.send({cmd: 'niaho'});
    }

    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);

process.on('message',function (msg) {
    console.log(`worker..... receive msg = ${JSON.stringify(msg)}....id = ${process.pid}`);
});