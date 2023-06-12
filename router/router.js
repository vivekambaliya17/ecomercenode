const express = require('express');
const bcrypt = require('bcrypt');
const { home, signup, postsignup,  login , loginauth, foremail , forgot, forotp, changepass, authgooglecallback, catadd, catapi, cataddpost, details, cart, profile, addproductUI, addproduct, viewproduct, catproduct, oneproduct } = require('../controller/controller');
const passport = require('passport');
const auth = require('../middleware/authenticate');
const singupschem = require('../model/singupschem');
const catschem = require('../model/cat');
const uploadIMG = require('../middleware/multer');
const Router = express.Router();
Router.get("/",home);
Router.get("/signup",signup);
Router.post('/signup',postsignup);
Router.get("/login",login);
Router.post('/login',passport.authenticate('local', { failureRedirect: '/login'  }) ,loginauth);
Router.get("/product",(req,res)=>{
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
Router.get('/single-product',(req, res)=>{
    res.render('single-product')
})
// product
Router.get('/catadd',catadd)
Router.get('/catapi',catapi)
Router.post('/catadd', cataddpost)
Router.get('/details/:id',details)
// Router.get('/product',product)
Router.get('/addproduct', auth ,addproductUI)
Router.post('/addproduct', auth ,addproduct)
Router.get('/viewproduct',viewproduct)
Router.get('/catproduct/:catname',catproduct)
Router.get("/oneproduct/:id",oneproduct)
// ----------------------------------------------------------------
Router.get('/cart',auth , cart)
Router.get('/profile' , profile)
Router.get('/img',(req,res)=>{
    res.render('img')
})
Router.get('/imgss',(req,res)=>{
    res.render('imgtest')
})
Router.post('/img' ,uploadIMG, async(req,res)=>{
    console.log(req.file.path);
    // await ProductIMG.create(req.body.img)
    res.send("img uplod")
})
module.exports=Router