const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mysql = require('mysql');
//const dbConnected = require('./database/ConnectionDatabase.js');
const session = require('express-session');
const routes = require('./routes/index');

// utworzenie instancji express
const app = express();

// ustawienie miejsca widoków
app.set('views', path.join(__dirname, 'views'));
// wskazanie sposobu renderowania templatek
app.set('view engine', 'pug')
// dołączanie statycznych plików np. css, img
app.use(express.static(path.join(__dirname, 'public')));

// obsługa przesyłanych danych metodą POST z formularzy
app.set(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// obsługa ciasteczek
app.use(cookieParser());

// konfiguracja sesji nwm jak to działa dokładnie
// TODO: check this
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

// wiadomości typu Flash
app.use(flash());

// przekierowanie obsługi ścieżek do innego pliku
app.use('/', routes);


module.exports = app;