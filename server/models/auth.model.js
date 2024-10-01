const mongoose = require("mongoose")

const signupschema = new mongoose.Schema({
    firstname   :{type:String,required:true},
    lastname    :{type:String,required:true},
    email       :{type:String,required:true},
    password    :{type:String,required:true},
    mobile      :{type:String,required:true}
})

const signupmodel     = mongoose.model('User',signupschema);
module.exports        = signupmodel;