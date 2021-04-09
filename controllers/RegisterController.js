exports.registerSystem = async (req, res) => {
    const UserModel = require('../database/models/UserModel');
    const bcrypt = require('bcrypt');
    const { login, email, password } = req.body;
    let errors = [];

    // check required fields
    if( !login || !email || !password){
        errors.push({ msg: 'Proszę uzupełnić wszystkie pola'});
        req.flash('error', 'Proszę uzupełnić wszystkie pola');
    }

    // check password length
    if(password.length < 8){
        errors.push({ msg: 'Hasło powinno zawierać co najmniej 8 znaków'});
        req.flash('error', 'Hasło powinno zawierać co najmniej 8 znaków');
    }

    // ! TODO: check if email domain: elektryk.edu.pl

    if(errors.length > 0){
        res.render('register', {
            errors,
            User: {
                logged: false
            }
        });
    }else{
        // register form was validated succesfully
        UserModel.findOne({email: email})
            .then(user =>{
                if(user){
                    // user exists with this email
                    errors.splice(0, 0, {msg: 'Istnieje już użytkownik o podanym adresie email'});
                    req.flash('error', 'Istnieje już użytkownik o podanym adresie email');
                    res.render('register', {
                        errors,
                        User: {
                            logged: false
                        }
                    });
                }else{
                    // if user with this email doesn't exist -> check if login exist
                    UserModel.findOne({login: login}).then(async userLoginTest =>{
                        if(userLoginTest){
                            errors.splice(0, 0, {msg: 'Istnieje już użytkownik o takim loginie'});
                            req.flash('error', 'Istnieje już użytkownik o takim loginie');
                            if(userLoginTest.login == login){
                                res.render('register', {
                                    errors,
                                    User: {
                                        logged: false
                                    }
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