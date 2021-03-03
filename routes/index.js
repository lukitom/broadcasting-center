const express = require('express');
const router = express.Router();

const PageConstroller = require('../controllers/PageController')
const LoginConstroller = require('../controllers/LoginController')
const RegisterController = require('../controllers/RegisterController')

const isAuthenticate = require('../middleware/authenticate').isAuthenticate;

// ogsługa konkretnych podstron
router.get('/', PageConstroller.index);
router.get('/index', PageConstroller.index);
router.get('/login', PageConstroller.login);
router.get('/registerForm', PageConstroller.registerSorm);
router.get('/suggestionSong', isAuthenticate, PageConstroller.suggestionSong);
router.get('/voteSong', isAuthenticate, PageConstroller.voteSong);
router.get('/logOut', PageConstroller.logOut);


router.post('/login', LoginConstroller.loginSystem);
router.post('/register', RegisterController.registerSystem);

module.exports = router;