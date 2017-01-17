/**
 * Created by liujinhe on 17/1/6.
 */

import fetch from 'isomorphic-fetch'
import 'babel-polyfill'
import $ from 'jquery'
var Promise = require('bluebird');

export function getUsers() {

    const events = ['retrieving users', 'users retrieved', 'users retrieval failed']

    return (dispatch)=> {

        console.log('begin get users');
        //dispatch(resultWrapper(events[0]))

        //fetch('/api/users',{method: 'GET',headers: {
        //    'Accept': 'application/json',
        //    'Content-Type': 'application/json'
        //}})
        //    .then(res=>{console.log('res.text() :'+res.text() );console.log('res.json() :'+JSON.stringify(res) );return res.json()})
        //    .then(json=>{console.log('json :'+json);return dispatch(resultWrapper(events[1],json))} )
        //    .catch(error=>dispatch(resultWrapper(events[1],'',error)))
        //
        //

        //let users={a:1}
        //return dispatch(resultWrapper(events[1],users));

        //$.ajax({url: '/api/users'})
        //    .done(data => {
        //                 dispatch(resultWrapper(events[1],data))
        //    })
        //    .fail(jqXhr => {
        //        dispatch(resultWrapper(events[2], '', jqXhr.responseJSON.message))
        //    });

        //Promise.all([1].map(id=> fetch(`/api/users/${id}`, {
        //        method: 'GET', headers: {
        //            'Accept': 'application/json',
        //            'Content-Type': 'application/json'
        //        }
        //    }).then(resp=>resp.json()))
        //).then(values => {
        //        console.log('values :' + JSON.stringify(values)); // [3, 1337, "foo"]
        //
        //    });


        //Promise.all([1].map(id =>
        //        fetch(`/api/users/${id}`,{
        //            method: 'GET', headers: {
        //                'Accept': 'application/json',
        //                'Content-Type': 'application/json'
        //            }
        //        }).then(resp => resp.text())
        //)).then(texts => {
        //
        //    console.log('texts :'+JSON.stringify(texts)); // [3, 1337, "foo"]
        //
        //})

        fetch('/api/users', {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=> {
                //console.log('res.text() :' + res.text());
                console.log('res.json() :' + JSON.stringify(res));
                //let users={a:1}
                // //dispatch(resultWrapper(events[1],users))
                //let a=[1,2];


                //return Promise.all(a.map(id=> fetch(`/api/users/${id}`, {
                //    method: 'GET', headers: {
                //        'Accept': 'application/json',
                //        'Content-Type': 'application/json'
                //    }
                //}) ))
                return res.json()
            })
            .then(json=> {

                console.log('json   :' + JSON.stringify(json))

                return Promise.all(json.map(id=> fetch(`/api/users/${id}`, {
                        method: 'GET', headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(resp=>resp.json()))
                );
                //console.log('json :' + json);
            }).then(text=> {

                return dispatch(resultWrapper(events[1], text))

            })
            .catch(error=>dispatch(resultWrapper(events[2], '', error)))


    }
}

export function addUsers(info) {

    const events = ['adding user', 'user added', 'adding user failed']

    const headers = {
        'Content-Type': 'application/json'
    };
    console.log('info   :' + JSON.stringify(info));

    return (dispatch)=> {
        dispatch(resultWrapper(events[0]))

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res=>res.json())
            .then(json=>dispatch(resultWrapper(events[1], json)))
            .catch(error=>dispatch(resultWrapper(events[1], '', error)))

    }
}


export function deleteUsers(id) {

    const events = ['deleting user', 'user deleted', 'deleting user failed']

    return (dispatch)=> {
        dispatch(resultWrapper(events[0]))

        fetch(`/api/users/${id}`, {method: 'DELETE'})
            .then(res=>res.json())
            .then(json=>dispatch(resultWrapper(events[1], json)))
            .catch(error=>dispatch(resultWrapper(events[1], '', error)))

    }
}


function resultWrapper(type, res, error) {
    if (error) {
        console.log('res error');

        return {type: type, error: error}
    }

    if (res) {

        return {type: type, res: res}
    }
    console.log('res none');

    return {type: type}

}


