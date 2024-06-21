const express = require('express');
const bcrypt = require('bcrypt');
const { home, signup, postsignup, login, loginauth, foremail, forgot, forotp, changepass, authgooglecallback, catadd, catapi, cataddpost, details, cart, profile, addproductUI, addproduct, viewproduct, catproduct, oneproduct, logout, singleapi, imge, imgtest, imguplod, addtocart, addtocartget, deletecart, allproduct, singleproduct, product, limitproduct, myproduct, myproductapi } = require('../../controller/controller');
const passport = require('passport');
const auth = require('../../middleware/authenticate');
const singupschem = require('../../model/singupschem');
const catschem = require('../../model/cat');
const uploadIMG = require('../../middleware/multer');
const productschem = require('../../model/productSchema');
const Router = express.Router();
Router.get("/", home);
Router.get("/signup", signup);
Router.get("/logout", logout);
Router.post('/signup', postsignup);
Router.get("/login", login);
Router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), loginauth);
Router.get("/product", product)
// forgot password
Router.get('/forgot', forgot)
Router.post('/foremail', foremail)
Router.post('/forotp', forotp)
Router.post('/changepass', changepass)
// log in with Google
Router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
Router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/sigup' }), authgooglecallback);
// --------------------------
Router.get('/single-product', singleproduct)
// product
Router.get('/catadd', catadd)
Router.get('/catapi', catapi)
Router.post('/catadd', cataddpost)
Router.get('/details', details)
Router.get('/addproduct', auth, addproductUI)
Router.post('/addproduct', auth, uploadIMG, addproduct)
Router.get('/viewproduct', viewproduct)
Router.get('/catproduct/', catproduct)
Router.get("/oneproduct/:id", oneproduct)
Router.get('/singleapi/:key', singleapi)
// ----------------------------------------------------------------
Router.get('/profile', profile)
Router.get('/myproduct', myproduct)
Router.get('/myproductapi', myproductapi)
Router.get('/img', imge)
Router.get('/imgss', imgtest)
Router.post('/img', uploadIMG, imguplod)
Router.get('/header', (req, res) => {
    res.render('header')
})
Router.get('/like', (req, res) => {
    res.render('like')
})
// Add to Cart
Router.get('/cart', auth, cart)
Router.post('/addtocart', auth, addtocart)
Router.get('/addtocart', auth, addtocartget)
Router.get('/deleteid/:id', auth, deletecart)
Router.get('/allproduct', allproduct)
Router.get('/limitproduct/:id', limitproduct)
module.exports = Router