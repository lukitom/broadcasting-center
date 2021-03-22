const express = require('express');
require('dotenv').config();
const path = require('path');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//// const mysql = require('mysql');
//// const dbConnectedMysql = require('./database/ConnectionDatabaseMysql.js');
require('./database/ConnectionDatabaseMongodb.js');
const session = require('express-session');
const flash = require('connect-flash');
const routesIndex = require('./routes/index');
const api = require('./routes/api');
const spotifyApi = require('./routes/spotifyApi');
const passport = require('passport');
const cors = require('cors');

// utworzenie instancji express
const app = express();
app.use(cors());

// ustawienia modułu passport
require('./middleware/passport')(passport);

// ustawienie miejsca widoków
app.set('views', path.join(__dirname, 'views'));
// wskazanie sposobu renderowania templatek
app.set('view engine', 'pug')
// dołączanie statycznych plików np. css, img
app.use(express.static(path.join(__dirname, 'public')));

// obsługa przesyłanych danych metodą POST z formularzy
// deprecated
////app.set(bodyParser.json());
//// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// obsługa ciasteczek
app.use(cookieParser());

// konfiguracja sesji nwm jak to działa dokładnie
// TODO: check this
app.use(session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: 'test',
    cookie: {
        maxAge: 10 * 60 * 1000,
        sameSite: true,
        secure: process.env.ENV === 'production',
    }
}));

// ! TODO: ustawić flasha do rejestracji - przy logowaniu jest i korzysta z fragmentów templatki .pug
// wiadomości typu Flash usunięte i niepotrzebne -> chyba
app.use(flash());

// app.use((req, res, next) => {
//     res.locals.success.msg = req.flash('success_msg');
//     res.locals.error.msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// })

// uruchomienie modułu passport
app.use(passport.initialize());
app.use(passport.session());

// przekierowanie obsługi ścieżek do innego pliku
app.use('/', routesIndex);
app.use('/api', api);
app.use('/spotify', spotifyApi);

// ! TODO: sprawdzić czy trzeba next
app.use((req, res, next) => {
    res.status(404).json({ error: "Not found" });
})

// ! TODO: sprawdzić czy trzeba next
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
})

module.exports = app;