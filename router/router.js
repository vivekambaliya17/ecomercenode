const express = require('express');
const bcrypt = require('bcrypt');
const { home, signup, postsignup,  login , loginauth, foremail , forgot, forotp, changepass, authgooglecallback, catadd, catapi, cataddpost, details, cart, profile, addproductUI, addproduct, viewproduct } = require('../controller/controller');
const passport = require('passport');
const auth = require('../middleware/authenticate');
const singupschem = require('../model/singupschem');
const catschem = require('../model/cat');
const Router = express.Router();
Router.get("/",home);
Router.get("/signup",signup);
Router.post('/signup',postsignup);
Router.get("/login",login);
Router.post('/login',passport.authenticate('local', { failureRedirect: '/login'  }) ,loginauth);
Router.get("/product",auth,(req,res)=>{
    res.render('product')
})
// forgot password
Router.get('/forgot', forgot)
Router.post('/foremail' , foremail)
Router.post('/forotp', forotp)
Router.post('/changepass', changepass)
// log in with Google
Router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
Router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/sigup' }),authgooglecallback);
// --------------------------
Router.get('/catadd')
// product
Router.get('/catadd',catadd)
Router.get('/catapi',catapi)
Router.post('/catadd', cataddpost)
Router.get('/details/:id',details)
Router.get('/addproduct', auth ,addproductUI)
Router.post('/addproduct', auth ,addproduct)
Router.get('/viewproduct',viewproduct)

// ----------------------------------------------------------------
Router.get('/cart',auth , cart)
Router.get('/profile' , profile)
module.exports=Router