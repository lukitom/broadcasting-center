// exports.loginSystem = (req, res) => {
//     const bcrypt = require('bcrypt');
//     const database = require('../database/ConnectionDatabaseMysql');

//     const sql = `SELECT * FROM users where login="${req.body.loginLog}"`;
//     database.query(sql, async (err, result) => {
//         if (err) throw err;
//         console.log(result)

//         try {
//             if (await bcrypt.compare(req.body.haslo, result[0].password)) {
//                 res.send('Success');
//             } else {
//                 res.send('Not Allowed');
//             }
//         } catch {
//             res.status(500).send();
//         }
//     });

//     console.log(`Wysłano formularz do logowania z wartościami '${req.body.loginLog}' jako login i '${req.body.haslo}' jako hasło.`);
//     res.redirect('/suggestion-song')
// };

//#region deprecated
////exports.loginSystem = async (req, res) => {
////    const bcrypt = require('bcrypt');
////    const mongoose = require('mongoose');
////    const UserModel = require('../database/models/UserModel');
////
////    // const user = UserModel.find(user => UserModel.login == req.body.loginLog);
////    const user = await UserModel.find({ login: req.body.loginLog });
////    if (!user.length) {
////        return res.status(400).send('Cannot find user');
////    }
////
////    try {
////        if (await bcrypt.compare(req.body.haslo, user[0].password)) {
////            // TODO: dokończyć przypisywanie do sesji
////            req.session.userId = user[0]._id;
////            // res.send('Success');
////            res.redirect('/index');
////        } else {
////            res.send('Not Allowed');
////        }
////    } catch {
////        res.status(500).send("Problem with server.");
////    }
////}
//#endregion

exports.loginSystem = (req, res, next) => {
    const passport = require('passport');

    passport.authenticate('local', {
        successRedirect: '/suggestionSong',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};