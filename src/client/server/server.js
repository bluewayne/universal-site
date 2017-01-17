/**
 * Created by liujinhe on 17/1/6.
 */

import express from 'express'
import path from 'path'
import http from 'http'
import httpProxy from 'http-proxy'

import { RouterContext, match} from 'react-router';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from '../web/routes.js'
import configureStore from '../web/store.js'
import Promise from 'bluebird';


import configuration from '../../configuration.js'

export default function (parameters) {

    let app = new express();

    let server = http.Server(app);

    //var proxy=httpProxy.createProxyServer({target:'https://www.reddit.com/'});

    var proxy=httpProxy.createProxyServer({target:'http://127.0.0.1:3001'});

    console.log('begin api proxy subreddit')

    app.use('/api',(req,res)=>{ console.log(`${req.protocol} ://  ${req.get('host')} ${req.originalUrl}` );return proxy.web(req,res)})

    app.use(function (req, res) {


        match({routes, location: req.url}, (error, redirectLocation, renderProps)=> {

            if (error) {
                res.status(500).send(error.message);

            } else if (redirectLocation) {
                res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {

                let store=configureStore();

                console.log('store  :'+JSON.stringify(store));


                //console.log(' ...renderProps  :'+JSON.stringify( renderProps));

                //let html=ReactDOM.renderToString(<RouterContext {...renderProps}/>)
                //console.log('html  :'+html);
                //store.dispatch(getUsers());

                console.log('RoutingContext before');

                //store.dispatch(getUsers())
                //store.dispatch(getUsers())


                const html = ReactDOM.renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);

                const initialState = store.getState();
                console.log('initialState   :'+JSON.stringify(initialState));

                res.send(renderFullPage(html, initialState));

                //Promise.all([store.dispatch(getUsers())])
                //.then(()=>{
                //        const html = ReactDOM.renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
                //
                //        const initialState = store.getState();
                //        console.log('initialState   :'+JSON.stringify(initialState));
                //
                //        res.send(renderFullPage(html, initialState));
                //
                //
                //
                //    })
                var html = ReactDOM.renderToString(<Provider store={store}><RoutingContext {...renderProps} /></Provider>);
                //var contentFromRouter = ReactDOM.renderToString(<Provider store={store}><RoutingContext {...renderProps} /></Provider>);

                console.log('RoutingContext after');


                //var contentFromRouter = ReactDOM.renderToString(<RouterContext {...renderProps} />);

                //const html = renderToString(
                //    <Provider store={store}>
                //        <App />
                //    </Provider>
                //)
                //
                //const initialState = store.getState();
                res.send(renderFullPage(html, initialState));
                //res.send(renderFullPage('', initialState));


            }

        })


    })


    function renderFullPage(html, initialState) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Redux Universal Example</title>
                    <link rel="stylesheet" href="http://127.0.0.1:3002/assets/style.css">
                </head>
                <body>
                <div id="app">${html}</div>
                    <script>
                        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
                    </script>
                    <script src="http://127.0.0.1:3002/assets/main.js"></script>
                </body>
            </html>
            `
    }

    server.listen(configuration.page_server.port, function (error) {

        if (error) {
            console.error('page server got error')
        }

        console.info(`page server is running on ${configuration.page_server.host}:${configuration.page_server.port}`)

    })

}