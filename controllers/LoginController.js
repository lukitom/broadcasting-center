exports.loginSystem = (req, res) => {
    const bcrypt = require('bcrypt');
    const database = require('../database/ConnectionDatabase');

    const sql = `SELECT * FROM users where login="${req.body.loginLog}"`;
    database.query(sql, async (err, result) => {
        if (err) throw err;
        console.log(result)

        try {
            if (await bcrypt.compare(req.body.haslo, result[0].password)) {
                res.send('Success');
            } else {
                res.send('Not Allowed');
            }
        } catch {
            res.status(500).send();
        }
    });

    console.log(`Wysłano formularz do logowania z wartościami '${req.body.loginLog}' jako login i '${req.body.haslo}' jako hasło.`);
    res.redirect('/suggestion-song')
};