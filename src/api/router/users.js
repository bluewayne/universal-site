/**
 * Created by liujinhe on 17/1/5.
 */

var express=require('express');
var router=new express.Router();

var users=new Map();
var counter=0;


router.get('/', function (req, res, next) {

    console.log('users get :'+JSON.stringify(users));

    res.send(Array.from(users.keys()));

    //res.send({users});
    //res.send(users);
})

router.post('/', function (req,res,next) {

    let name=req.body.name;
    console.log('req.body :'+JSON.stringify(req.body));
    users.set(String(++counter),{name:name})

    console.log('users  post:'+JSON.stringify(users));
    res.send(users);
})

router.get('/:id', function (req, res, next) {

    let id=req.params.id;
    console.log('req.params :'+JSON.stringify(req.params));
    console.log('id         :'+id);
    console.log('users      :'+JSON.stringify(users));

    console.log('users.has(id)  :'+users.has(id));

    if(users.has(String(id))){

        res.send({...users.get(id),id:id});
    }

})

router.delete('/:id', function (req, res, next) {

    let id =req.params.id;

    if(users.has(id)){
        users.delete(id);
        res.send({users})

    }

});

module.exports=router;

