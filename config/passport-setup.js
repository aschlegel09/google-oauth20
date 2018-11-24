var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');
var User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        // storing profiles
    }, (accessToken, refreshToken, profile, done) => {
// cb
console.log("passport cb function fired");
// console.log(profile);
    })
)
