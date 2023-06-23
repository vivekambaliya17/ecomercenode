const express = require('express');
const bcrypt = require('bcrypt');
const { home, signup, postsignup, login, loginauth, foremail, forgot, forotp, changepass, authgooglecallback, catadd, catapi, cataddpost, details, cart, profile, addproductUI, addproduct, viewproduct, catproduct, oneproduct, logout, singleapi, imge, imgtest, imguplod } = require('../controller/controller');
const passport = require('passport');
const auth = require('../middleware/authenticate');
const singupschem = require('../model/singupschem');
const catschem = require('../model/cat');
const uploadIMG = require('../middleware/multer');
const productschem = require('../model/productSchema');
const Router = express.Router();
Router.get("/", home);
Router.get("/signup", signup);
Router.get("/logout", logout);
Router.post('/signup', postsignup);
Router.get("/login", login);
Router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), loginauth);
Router.get("/product", (req, res) => {
    res.render('product')
})
// forgot password
Router.get('/forgot', forgot)
Router.post('/foremail', foremail)
Router.post('/forotp', forotp)
Router.post('/changepass', changepass)
// log in with Google
Router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
Router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/sigup' }), authgooglecallback);
// --------------------------
Router.get('/catadd')
Router.get('/single-product', (req, res) => {
    res.render('single-product')
})
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
Router.get('/img', imge)
Router.get('/imgss', imgtest)
Router.post('/img', uploadIMG, imguplod)
// Add to Cart
Router.get('/cart', auth, cart)
Router.post('/addtocart', async (req, res) => {
    let value = await singupschem.findById(req.session.passport.user)
    console.log(value.cart);
    for (let i = 0; i < value.cart.length; i++) {
        const element = value.cart[i];
        console.log(element._id);
    }
    value.cart.push(req.body)
    let newvalue = await singupschem.findByIdAndUpdate(value.id, value)
    // console.log(newvalue);
    res.send(newvalue)
})
Router.get('/addtocart', async (req, res) => {
    if(req.session.passport.user) {
        let Cart = await singupschem.findById(req.session.passport.user)
        return res.send(Cart)
    }
    else {
       return res.render('login')
    }
})
Router.get('/deleteid/:id',async(req,res)=>{
    if(req.session.passport.user) {
        let id = req.params.id
        console.log(id);
        let element = await singupschem.findById(req.session.passport.user)
        console.log(element.cart);
        element.cart.splice(id,1)
        console.log(element.cart);
        let aa = await singupschem.findByIdAndUpdate(req.session.passport.user , element )
        console.log(aa);
        return res.send(element)
    }
    else {
       return res.render('login')
    }
    res.send("done")
})
module.exports = Router