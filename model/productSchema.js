const mongoose = require('mongoose');
let schema = new mongoose.Schema({
    productname:String,
    currentprice:String,
    fakeprice:String,
    discount:String,
    detailone:String,
    detailtwo:String,
    brand:String,
    activity:String,
    material:String,
    gender:String,
    img:String,
    img2:String,
    img3:String,
    img4:String,
    catid:{type: mongoose.Schema.Types.ObjectId , ref:"cat"},
    userid:{type: mongoose.Schema.Types.ObjectId , ref:"ecomerce"},
})
let productschem = mongoose.model("product",schema);
module.exports = productschem