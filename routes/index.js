const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register-form', (req, res) => {
    res.render('register-form');
});

router.get('/suggestion-song', (req, res) => {
    res.render('suggestion-song');
});

router.get('/vote-song', (req, res) => {
    res.render('vote-song');
});

module.exports = router;