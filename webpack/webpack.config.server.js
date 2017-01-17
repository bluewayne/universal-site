/**
 * Created by liujinhe on 17/1/6.
 */

import {server_configuration} from 'universal-webpack'
import setting from './universal-webpack-settings.js'
import configuration from './webpack.config.js'

export default server_configuration(configuration,setting)