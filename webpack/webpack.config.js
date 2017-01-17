/**
 * Created by liujinhe on 17/1/5.
 */

var webpack = require('webpack');
var path = require('path');
var root_folder = path.resolve(__dirname, '..')
var configuration = require('../src/configuration');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var hotMiddlewareScript = `webpack-hot-middleware/client?reload=true`

var publicPath = `http://${configuration.hmr_server.host}:${configuration.hmr_server.port}/assets/`
//assets/ 就可以了，但是做服务端渲染的时候，需要指明具体ip地址。如果不加上的话，客户端渲染引用的是/assets/,服务器引用的是http:/127.0.0.1:xxxx/assets

module.exports = {

    context: root_folder,
    entry: {hotMiddlewareScript, main: './src/client/web/entry.js'},
    output: {
        path: path.resolve(root_folder, 'build/assets'),
        publicPath: publicPath,
        filename: '[name].js',
        chunkFilename: '[name].[hash].js'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
        },
            {
                test: /\.json$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'json-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'url-loader?limit=10000'
                ]
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract('style','css?sourceMap&modules!sass?sourceMap')
            }]
    },
    postcss: () => [autoprefixer({browsers: 'last 2 version'})],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', {allChunks: true})
    ]

}