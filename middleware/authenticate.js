const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg', 'Proszę się zalogować.')
        res.redirect('/login');
    }
}

const canRegisterLogin = (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/suggestionSong');
    }else{
        return next();
    }
}

const isAdmin = (req, res, next) => {
    if(req.session.passport.user.permission == 'admin') return next();
    res.redirect('/login');
}

module.exports = {
    ensureAuthenticated,
    canRegisterLogin,
    isAdmin
}