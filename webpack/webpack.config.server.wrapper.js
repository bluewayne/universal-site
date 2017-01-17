/**
 * Created by liujinhe on 17/1/6.
 */


import webpack_server from './webpack.config.server.js'
import configuration from '../src/configuration.js'

//webpack_server.output.publicPath = `http://${configuration.hmr_server.host}:${configuration.hmr_server.port}${webpack_server.output.publicPath}`

//webpack_server.output.publicPath = `${webpack_server.output.publicPath}`

export default  webpack_server;