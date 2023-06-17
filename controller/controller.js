const bcrypt = require('bcrypt');
const singupschem = require("../model/singupschem");
const nodemailer = require('nodemailer');
const catschem = require('../model/cat');
const productschem = require('../model/productSchema');
require('dotenv').config()
let home = (req, res) => {
    res.render('index', {remove:"notauthenticate"} )
}
let signup = (req, res) => {

    res.render('signup')
}
let postsignup = async (req, res) => {
    try {
        let password = req.body.password
        let confirmpassword = req.body.confirmpassword
        let username = req.body.username
        let usernamechack = await singupschem.findOne({ username: username })
        if (!usernamechack) {
            if (password == confirmpassword) {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        req.body.password = hash
                        console.log(req.body.password);
                        let user = await singupschem.create(req.body)
                        console.log(user);
                        res.render('index')
                    }
                });
            }
            else {
                res.status(444).send("Paasword not Match")
            }
        }
        else {
            return res.send("Username is allready used")
        }

    } catch (error) {
        console.log(error);
    }
}
let login = (req, res) => {
    res.render('login')
}
let loginauth = (req, res) => {
    
    // console.log(req.session.passport.user);
    res.render('index' , {remove:"authenticate"})
}
// forgot password
let forgot = (req, res) => {
    res.render('foremail')
}
let otp = 0
let changeemil = 0
let foremail = async (req, res) => {
    changeemil = req.body.email
    let changeuser = await singupschem.findOne({ email: changeemil })
    if (!changeuser) {
        return res.send("Email not match")
    }
    else {
        let teanspotrr = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ambaliyavivek2@gmail.com',
                pass: process.env.Mailpass
            }
        })
        otp = Math.ceil(Math.random() * 10000)
        let maileroption = {
            from: "ambaliyavivek2@gmail.com",
            to: changeemil,
            subject: " Password Forgot ",
            text: `otp =${otp}`
        }
        teanspotrr.sendMail(maileroption, (err, info) => {
            if (err) {
                return res.send(err);
            } else {
                console.log(otp);
                res.render('forotp')
            }
        })
    }
}
let forotp = (req, res) => {
    let Enterotp = req.body.Enterotp
    if (Enterotp == otp) {
        res.render('changepass')
    }
    else {
        res.send("Otp is wrong");
    }
}
let changepass = async (req, res) => {
    let newpassword = req.body.newpassword
    let connewpassword = req.body.connewpassword
    let userdata = await singupschem.findOne({ email: changeemil })
    if (newpassword == connewpassword) {
        bcrypt.hash(newpassword, 10, async (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                let userid = userdata.id
                userdata.password = hash
                await singupschem.findByIdAndUpdate(userid, userdata)
                res.render('login')
            }
        });
    } else {
        return res.send("Password Not matched")
    }
}
let authgooglecallback =  async(req, res)=> {
    console.log(req.user);
    let email = req.user.emails[0].value
    let data = await singupschem.create({email:email})
    console.log(data);
    res.redirect('/');
}
let catadd = (req,res)=>{
    res.render('catadd');
}
let catapi = async(req,res)=>{
    let data = await catschem.find()
    // console.log(data);
    res.send(data);
}
let cataddpost = async(req,res)=>{
    console.log(req.body);
    let catdata = await catschem.create(req.body)
    res.send("done");
}
// render not working 
let details = (req , res)=> {
    
    res.redirect('/product')
}
let cart = (req, res) =>{
    res.render('Cart')
  }
let profile = (req, res) =>{
    res.render('profile')
  }
let addproductUI = (req, res) =>{
    
    res.render('addproduct')
}
let addproduct = async(req, res) =>{
    console.log(req.body);
    console.log(req.session.passport.user);
    req.body.userid = req.session.passport.user
    console.log(req.body.userid);
    await productschem.create(req.body)
    res.send('done')
}
let viewproduct = async(req, res) =>{
    let view = await productschem.find()
    res.send(view)
}
let catproduct = async(req, res) =>{
    let {catname ,price , discounts} =req.query
    console.log(catname + price ,discounts)
    
    // console.log(catname);
    // console.log(price);
    let cat = await catschem.findOne({catname:catname})
    let view = await productschem.find({catid:cat.id})        
   
    if( price == 0 & discounts == 0) {
        console.log("1");
        return res.send(view)
    }
     if(price == 1000) {
        console.log("2");
         let product=view.filter((ele)=>ele.currentprice < 1000)
        return res.send(product)
    }
     if(price == 5000) {
        console.log("3");
        let product=view.filter((ele)=>ele.currentprice < 5000)
        return res.send(product)
    }
     if(price == 10000) {
        console.log("4");
        let product=view.filter((ele)=>ele.currentprice < 10000)

        return res.send(product)
    }
     if(price == 20000) {
        console.log("5");
        let product=view.filter((ele)=>ele.currentprice < 20000)
        return res.send(product)
    }
     if(price == 40000) {
        console.log("6");
        let product=view.filter((ele)=>ele.currentprice < 40000)
        return res.send(product)
    }
}
// let product = (req , res) =>{
//     res.render('product')
// }
let oneproduct = async(req , res) => {
    // let id = req.params.id
    // let pro = await productschem.findById(id)
    // console.log(pro);
    return res.render('single-product')
}
module.exports = { home, signup, postsignup, login, loginauth, forgot, foremail, forotp, changepass , authgooglecallback ,catadd ,catapi , cataddpost ,details , cart ,profile ,addproductUI ,addproduct ,viewproduct ,catproduct , oneproduct }