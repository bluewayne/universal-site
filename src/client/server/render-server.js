/**
 * Created by liujinhe on 17/1/6.
 */
import {server} from 'universal-webpack'

import setting from '../../../webpack/universal-webpack-settings.js'
import configuration from '../../../webpack/webpack.config.js'

server(configuration,setting)