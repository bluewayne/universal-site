/**
 * Created by liujinhe on 17/1/5.
 */


import ReactDOM from 'react-dom'
import configureStore from './store';
import routes from './routes.js'
import React from 'react';
import { Provider } from 'react-redux'

const initialState = window.__INITIAL_STATE__;


var store=configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <div>
            {routes}
        </div>

    </Provider>
    , document.getElementById('app'))

if (module.hot) {
    module.hot.accept();
}