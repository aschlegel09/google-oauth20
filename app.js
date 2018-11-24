var express = require('express');
var authRoutes = require('./routes/auth-routes');
var passportSetup = require('./config/passport-setup');

var app = express();

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000,() => {
    console.log('app listening on port 3000');
});