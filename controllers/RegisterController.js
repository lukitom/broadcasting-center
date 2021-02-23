exports.registerSystem = async (req, res) => {
    const bcrypt = require('bcrypt');
    const database = require('../database/ConnectionDatabase');

    try {
        const hashedPassword = await bcrypt.hash(req.body.haslo, 10);
        console.log(hashedPassword);
        const sql = `INSERT INTO users (login, password, permission) values ("${req.body.loginRegister}", "${hashedPassword}", ${2})`;
        database.query(sql, (err) => {
            if (err) throw err;
            res.status(201);
        })
    } catch {

    }

    console.log(`Przesłano formularz rejestracji, a w nim podano login: ${req.body.loginRegister}, email: ${req.body.email} oraz hasło: ${req.body.haslo}`);
    // res.redirect('/index');
}