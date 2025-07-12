var express = require('express');
var router = express.Router();
const shortid = require('shortid')
const md5 = require('md5')
const session = require('express-session')
const path = require('path')


const model = require('../database/UserModel')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/reg',(req,res)=>{
  res.render('register')
})

router.post('/reg',(req,res)=>{
  console.log(req.body.password);
  model.create({...req.body,password:md5(req.body.password)}).then(
    res.json(req.body)

  ).catch(
    err =>{
      if (err){
        console.log(err);
        res.status(500).send('error')
      }
    }
  )
})

router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',(req,res)=>{
  const {uname,password} = req.body;
  model.findOne({uname:uname,password:md5(password)}).then(
    data =>{
      console.log(password);
      if (data){
        req.session.uname=data.uname;
        req.session._id=data._id;
        res.redirect('/account')
      }else{
        res.send('no such user')
      }
    }
  ).catch(
    err=>{
      if(err){
        console.log(err);
        res.status(500).send('failed');
      }
    }
  )
})

router.get('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/users/login');
  })
})
module.exports = router;
