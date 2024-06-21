const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    img:String,
    catname:String,
    
})
let catschem = mongoose.model("cat",schema);
module.exports =catschem