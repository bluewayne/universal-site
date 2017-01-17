/**
 * Created by liujinhe on 16/12/20.
 */

import {server} from 'universal-webpack';
import setting from '../webpack/universal-webpack-settings.js';

import configuration from '../webpack/webpack.config.js'

server(configuration,setting);


