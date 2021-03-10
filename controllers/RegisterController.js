// mysql
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

//#region deprecated
//// mongodb
//// exports.registerSystem = async (req, res) => {
////     const mongoose = require('mongoose');
////     const UserModel = require('../database/models/UserModel');
////     const bcrypt = require('bcrypt');

////     try {
////         const hashedPassword = await bcrypt.hash(req.body.haslo, 10);
////         const user = new UserModel({
////             login: req.body.loginRegister,
////             password: hashedPassword,
////             permission: "normal"
////         });

////         user.save()
////             .then(() => {
////                 console.log('User saved');
////             }).catch(err => {
////                 console.log('Error saving user');
////             });
////     } catch (err) {
////         console.log(err);
////     }
////     res.redirect('/');
//// }
//#endregion

exports.registerSystem = async (req, res) => {
    const UserModel = require('../database/models/UserModel');
    const bcrypt = require('bcrypt');
    const { login, email, password } = req.body;
    let errors = [];

    // check required fields
    if( !login || !email || !password){
        errors.push({ msg: 'Proszę uzupełnić wszystkie pola'});
    }

    // check password length
    if(password.length < 8){
        errors.push({ msg: 'Hasło powinno zawierać co najmniej 8 znaków'})
    }

    // ! TODO: check if email domain: elektryk.edu.pl

    if(errors.length > 0){
        res.render('register', {
            errors
        });
    }else{
        // register form was validated succesfully
        UserModel.findOne({email: email})
            .then(user =>{
                if(user){
                    // user exists with this email
                    errors.splice(0, 0, {msg: 'Istnieje już użytkownik o podanym adresie email'});
                    res.render('register', {
                        errors
                    });
                }else{
                    // if user with this email doesn't exist -> check if login exist
                    UserModel.findOne({login: login}).then(async userLoginTest =>{
                        if(userLoginTest){
                            errors.splice(0, 0, {msg: 'Istnieje już użytkownik o takim loginie.'});
                            if(userLoginTest.login == login){
                                res.render('register', {
                                errors
                                });
                            }

                        }else{
                            // if email and login is unique
                            const newUser = new UserModel({
                                login,
                                email,
                                password,
                                permission: 'normal'
                            });

                            try{
                                // hash password and save in database new user
                                const hashedPassword = await bcrypt.hash(password, 10);
                                newUser.password = hashedPassword;

                                newUser.save()
                                    .then(() => {
                                        // req.flash('success_msg', 'Rejestracja się powiodła. Możesz się zalogować.')
                                        res.redirect('/login');
                                    });
                            }catch(err){
                                console.log(err);
                            }
                        }
                    });
            }})
            .catch(err => {
                res.status(500).send("Przepraszamy za błąd serwera.");
                console.log(err);
            });
    }
}