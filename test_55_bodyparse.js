/**
 * Created by yuanyuan on 17/3/19.
 */
const debug         = require('debug');
const Promise       = require('bluebird');
const bodyParser    = require('body-parser');
const express       = require('express');

const bodyParse_log = debug('body-parse');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false ,limit: '50mb'}));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.write('you posted:\n');
    res.end(JSON.stringify(req.body, null, 2))
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});