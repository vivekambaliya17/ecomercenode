const express = require('express');
const cookieParser = require('cookie-parser');
const dbconection = require('./config/conection');
const Router = require('./router/router');
const passport = require('passport');
const session = require('express-session')
const localAuth = require('./middleware/paasAuth');
let googleauth = require('./middleware/googleAuth');
localAuth(passport)
googleauth(passport)
const PORT =process.env.PORT || 8888
require('dotenv').config()
const app = express();
app.use(cookieParser())
app.use(session({secret:'ecomerce'}))
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use('/', Router)
app.listen(PORT ,()=>{
    console.log(`localhost:${PORT}`);
    dbconection()
})
