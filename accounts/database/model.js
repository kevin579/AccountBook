const mongoose = require('mongoose')

let AccountSchema = new mongoose.Schema({
        event:{type:String,required:true},
        date:{type:Date,default:18,required:true},
        type:{type:String,enum:['spend','income'],required:true},
        amount:{type:Number,required:true},
        note:{type:String}
})

let model = mongoose.model('accounts',AccountSchema);
module.exports = model;