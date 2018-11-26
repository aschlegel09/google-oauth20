var router = require('express').Router();

var authCheck = (req, res, next) => {
    if (!req.user) {

        res.redirect('/auth/login');
    } else {
        // if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
    // res.send('you are logged in');
});

module.exports = router;