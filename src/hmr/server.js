/**
 * Created by liujinhe on 17/1/5.
 */

var express = require('express');
var http = require('http');
var configuration = require('../configuration');

var webpack = require('webpack');
var webpackConfig = require('../../webpack/webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = new express();

var server = http.Server(app);

var compiler = webpack(webpackConfig);


console.log('public :'+`${webpackConfig.output.publicPath}`);

app.use(webpackDevMiddleware(compiler, {
    publicPath: `${webpackConfig.output.publicPath}`,
    noInfo: true,
    stats: {
        colors: true
    }

}))
app.use(webpackHotMiddleware(compiler))

server.listen(configuration.hmr_server.port, function (error) {

    if (error) {
        console.error('hmr server got error')
    }

    console.info(`hmr server running on ${configuration.hmr_server.host}:${configuration.hmr_server.port}`);
})






