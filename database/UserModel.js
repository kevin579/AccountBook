const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
        uname:{type:String,required:true},
        password:{type:String,required:true}
})

let model = mongoose.model('users',UserSchema);
module.exports = model;