/**
 * Created by liujinhe on 17/1/5.
 */


import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers';

const createStoreWithMiddleware=compose(applyMiddleware(thunk))(createStore);

export default  function (initialState) {

    const store =createStoreWithMiddleware(reducer,initialState);

    //热替换选项
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers')
            store.replaceReducer(nextReducer)
        })
    }
    return store;

}