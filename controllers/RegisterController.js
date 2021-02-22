exports.registerSystem = (req, res) => {
    console.log(`Przesłano formularz rejestracji, a w nim podano login: ${req.body.loginRegister}, email: ${req.body.email} oraz hasło: ${req.body.haslo}`);
    res.redirect('/index');
}