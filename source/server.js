/**
 * Created by liujinhe on 16/12/20.
 */
import path from 'path';
import http from 'http';
import express from 'express';
import http_proxy from 'http-proxy';


import ReactDOM from 'ReactDOM'

// react-router
import routes from '../code/client/routes.js'

// Redux
import store from '../code/client/store.js'



export default function (parameters) {

    //Create Http server

    const app=new express();
    const server=new http.Server(app);


    app.use(express.static(path.join(__dirname),'..','build/assets'));

    const proxy=http_proxy.createProxyServer({target:'http://localhost:3001'});
    app.use('/api',(req,res)=>proxy.web(req,res));

    app.use((req,res)=>{


        react_router_match_url(routes,req.originalUrl).then((error,result)=>{
            if(error){

                res.status(500);
                return res.send('Server error');

            }
        })

        const  page=redux.provide(result,store);

        const  html=ReactDOM.renderToString(<Html>{page}</Html>);
        res.send('<!doctype html>' + '\n' + html);


    })

    server.listen();

}