const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    fullname:String,
    username:String,
    email:String,
    Pnumber:String,
    password:String
})
let singupschem = mongoose.model("ecomerce",schema);
module.exports =singupschem