// exports.registerSystem = async (req, res) => {
//     const bcrypt = require('bcrypt');
//     const database = require('../database/ConnectionDatabaseMysql');

//     try {
//         const hashedPassword = await bcrypt.hash(req.body.haslo, 10);
//         // console.log(hashedPassword);
//         const sql = `INSERT INTO users (login, password, permission) values ("${req.body.loginRegister}", "${hashedPassword}", ${2})`;
//         database.query(sql, (err) => {
//             if (err) throw err;
//             res.status(201);
//         })
//     } catch {

//     }

//     console.log(`Przesłano formularz rejestracji, a w nim podano login: ${req.body.loginRegister}, email: ${req.body.email} oraz hasło: ${req.body.haslo}`);
//     // res.redirect('/index');
// }

exports.registerSystem = async (req, res) => {
    const mongoose = require('mongoose');
    const UserModel = require('../database/models/UserModel');
    const bcrypt = require('bcrypt');

    try {
        const hashedPassword = await bcrypt.hash(req.body.haslo, 10);
        const user = new UserModel({
            login: req.body.loginRegister,
            password: hashedPassword,
            permission: "normal"
        });

        user.save()
            .then(() => {
                console.log('User saved');
            }).catch(err => {
                console.log('Error saving user');
            });
    } catch (err) {
        console.log(err);
    }
    res.redirect('/');
}