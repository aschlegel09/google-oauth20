var express = require('express');
var authRoutes = require('./routes/auth-routes');
var passportSetup = require('./config/passport-setup');
var mongoose = require('mongoose');
var keys = require('./config/keys');
var cookieSession = require('cookie-session');
var passport = require('passport');
var profileRoutes = require('./routes/profile-routes');

var app = express();

// set up view engine
app.set('view engine', 'ejs');

// set up cookie session for one day and encryption
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () =>{
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

// listen at port 3000
app.listen(3000,() => {
    console.log('app listening on port 3000');
});