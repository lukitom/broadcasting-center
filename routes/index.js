const express = require('express');
const router = express.Router();

const PageConstroller = require('../controllers/PageController')
const LoginConstroller = require('../controllers/LoginController')

// ogsługa konkretnych podstron
router.get('/',  PageConstroller.index);
router.get('/index', PageConstroller.index);
router.get('/login', PageConstroller.login);
router.get('/register-form', PageConstroller.register_form);
router.get('/suggestion-song', PageConstroller.suggestion_song);
router.get('/vote-song', PageConstroller.vote_song);


router.post('/login-mechanism', LoginConstroller.login);

module.exports = router;