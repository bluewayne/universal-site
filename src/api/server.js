/**
 * Created by liujinhe on 17/1/5.
 */

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var configuration = require('../configuration');


var app = new express();

var server = http.Server(app);
app.use(bodyParser.json());

var users = require('./router/users');

//app.use(function (req,res) {
//    console.log('req :'+JSON.stringify(req.originalUrl));
//    return ;
//})

app.use('/users', users);


server.listen(configuration.api_server.port, function (error) {

    if (error) {
        console.error('api server get error')
    }

    console.info('api server is running');

})










