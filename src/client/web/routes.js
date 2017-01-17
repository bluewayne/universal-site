/**
 * Created by liujinhe on 17/1/5.
 */

import {Provider} from 'react-redux'
import Layout from './pages/layout.js'
import Home from './pages/home.js'
import Users from './pages/users.js'
import configureStore from './store';

import {browserHistory,Router,Route,IndexRoute} from 'react-router'
import React from 'react';

require('./assets/styles/style.scss')

var store = configureStore();

console.log('store  :'+store);
console.log('store  :'+JSON.stringify(store));

export default (
<Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Home}/>
            <Route path='users' component={Users}/>
        </Route>
    </Router>

</Provider>


)
