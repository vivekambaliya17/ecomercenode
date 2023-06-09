const mongoose = require('mongoose');
require('dotenv').config()

let dbconection = async()=>{
    try {
        
        await mongoose.connect(process.env.DBCONNECT)
        console.log("db connect");
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbconection