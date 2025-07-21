const express = require('express');
const router = express.Router();

const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync(__dirname+'/../data/db.json')

const moment = require('moment')
// const db = low(adapter)

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const model = require('../database/AccountModel.js')
const config = require('../database/config.js')

function checkLogin(req,res,next){
  if (!req.session.uname){
    return res.redirect('/users//login')
  }
  const token = req.cookies.token
  jwt.verify(token,config.secret,(err,data)=>{
    if (err||!data){
      return res.redirect('/users//login')
    } 
    if (data){
      req.user = data;
    }

  })
  
  next();
}

/* Main page of account book. */
router.get('/account', checkLogin,function(req, res, next) {

  // let accounts = db.get('accounts').value();
  console.log(req.user)
  model.find({uname:req.session.uname}).sort({time:-1})
  .then(data=>{
    console.log(data)
    // res.json({
    //   code:'0000',
    //   msg:'',
    //   data:data
    // })
    res.render('account',{accounts:data, moment:moment})
  })
  .catch(err=>{
    // res.status(500).send('reading error')
    res.json({
      code:'1001',
      msg:'error',
      data:null
    })
  })
  
});

router.get('/account/create', checkLogin,function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.post('/account',(req,res)=>{
  // let id = shortid.generate();
  // db.get('accounts').push({id:id, ...req.body}).write();

  model.create({
    ...req.body,
    date: moment(req.body.date).toDate(),
    uname : req.session.uname
  }).then((err,data)=>{
    if (err){
      console.log(err);
      return;
    }
    res.json({
      code:'0000',
      msg:'',
      data:data
    })
  })
  res.redirect('/account');
})

//deleting account

router.get('/account/:id', checkLogin, (req,res)=>{
    let id = req.params.id;
    // db.get('accounts').remove({id:id}).write();
    model.deleteOne({_id:id}).then(
      data=>{
        console.log(data);
        res.redirect('/account')
    }
    ).catch(
      err=>{
        console.log(err);
        res.status(500).send('error')
      }
    )
});


// query an account
// router.get('/account/:id',(req,res)=>{
//   let {id} = req.params;
//   model.findById(id)
//     .then(
//       data=>{
//         res.json({
//           code:'0000',
//           msg:'',
//           data:data
//         })
//       }
//     ).catch(
//       err=>{
//         console.log(err);
//         res.json({
//           code:'1004',
//           msg:'Cannot load data',
//           data:null
//         })
//       }
//     ) 
// })

module.exports = router;
