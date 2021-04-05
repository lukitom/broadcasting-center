const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Local user model
const UserModel = require('../database/models/UserModel');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'login', passReqToCallback: true }, (req, login, password, done) => {
            // find user in database using login
            UserModel.findOne({ login: login })
                .then(user => {
                    if (!user) return done(null, false, req.flash('error', 'Niepoprawne dane'));

                    // sprawdzenie poprawnośći podadanego hasła
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, req.flash('error', 'Niepoprawne dane'))
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        UserModel.findById(user._id, (err, user) => {
            done(err, user);
        })
    });
}