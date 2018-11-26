var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');
var User = require('../models/user-model');

// stuff user info in cookie
passport.serializeUser((user, done) => {
    // identify user with id (not google id)
    done(null, user.id);
});

// when cookie comes back from browser, take id and find user
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// use google+ api with passport
passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        // storing profiles
    }, (accessToken, refreshToken, profile, done) => {
        // passport cb
        console.log("passport cb function fired");
        console.log(profile);

        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //already have this user
                console.log('User is: ' + currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in db
                // create new user model
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log("new user created: " + newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
