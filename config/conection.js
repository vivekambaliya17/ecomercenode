const mongoose = require('mongoose');
require('dotenv').config()

let dbconection = async()=>{
    try {
        
        await mongoose.connect("mongodb+srv://ambaliyavivek17:ecomerce@cluster0.acnvdx3.mongodb.net/?retryWrites=true&w=majority")
        console.log("db connect");
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbconection