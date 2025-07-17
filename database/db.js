/**
 * 
 * @param {*} success 
 * @param {*} error 
 */
module.exports = function(success,error){
    const mongoose = require('mongoose')
    const {DBHOST:host,DBPORT:port,DBNAME:name} = require('./config.js')
    console.log(`mongodb://${host}:${port}/${name}`)
    mongoose.connect(`mongodb://${host}:${port}/${name}`);

    mongoose.connection.once('open',()=>{
        success();
    })

    mongoose.connection.on('error', ()=>{
        error();
    })

    mongoose.connection.on('close', ()=>{
        console.log('End');
    })



}

