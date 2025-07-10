var express = require('express');
var router = express.Router();
const shortid = require('shortid')
const model = require('../database/UserModel')
const md5 = require('md5')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/reg',(req,res)=>{
  res.render('register')
})

router.post('/reg',(req,res)=>{
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
  model.findOne({uname:uname,password:md5(passsword)}).then(
    res.send('login')
    
  ).catch(
    err=>{
      if(err){
        console.log(err);
        res.status(500).send('failed');
      }
    }
  )
})
module.exports = router;
