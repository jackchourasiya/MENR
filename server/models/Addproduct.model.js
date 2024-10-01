const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
    productname: {type:String , required:true},
    image:       {type:String,required:true}
})

module.exports = mongoose.model('product_info',product_schema)