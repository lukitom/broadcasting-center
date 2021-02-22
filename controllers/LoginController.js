exports.loginSystem = (req, res) => {
    console.log(`Wysłano formularz do logowania z wartościami '${req.body.loginLog}' jako login i '${req.body.haslo}' jako hasło.`);
    res.redirect('/index')
};