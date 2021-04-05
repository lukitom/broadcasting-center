exports.loginSystem = (req, res, next) => {
    const passport = require('passport');

    passport.authenticate('local', {
        successRedirect: '/suggestionSong',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};