// module.exports.isAuthenticate = (req, res, next) => {
//     if(!req.session.userId){
//         return res.redirect('/login');
//     }
//     next();
// }

module.exports = {
    ensureAutheticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', 'Proszę się zalogować.')
            res.redirect('/login');
        }
    },

    canRegisterLogin: function(req, res, next) {
        if(req.isAuthenticated()){
            res.redirect('/suggestionSong');
        }else{
            return next();
        }
    }
}