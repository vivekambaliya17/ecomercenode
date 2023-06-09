const passport = require('passport');
require('dotenv').config()
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleauth = (passport)=>{
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null ,profile)
  }
));
passport.serializeUser((user,done)=>{
    return done(null ,user)
})

passport.deserializeUser((user,done)=>{
  return done(null ,user)
})
}

module.exports =googleauth