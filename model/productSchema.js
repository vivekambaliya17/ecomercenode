const mongoose = require('mongoose');
let schema = new mongoose.Schema({
    img:String,
    productname:String,
    currentprice:String,
    fakeprice:String,
    discount:String,
    catid:{type: mongoose.Schema.Types.ObjectId , ref:"cat"},
    userid:{type: mongoose.Schema.Types.ObjectId , ref:"ecomerce"},
})
let productschem = mongoose.model("product",schema);
module.exports = productschem