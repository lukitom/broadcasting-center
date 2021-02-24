const express = require('express');
const router = express.Router();

const PageConstroller = require('../controllers/PageController')
const LoginConstroller = require('../controllers/LoginController')
const RegisterController = require('../controllers/RegisterController')

// ogsługa konkretnych podstron
router.get('/', PageConstroller.index);
router.get('/index', PageConstroller.index);
router.get('/login', PageConstroller.login);
router.get('/registerForm', PageConstroller.registerSorm);
router.get('/suggestionSong', PageConstroller.suggestionSong);
router.get('/voteSong', PageConstroller.voteSong);


router.post('/loginMechanism', LoginConstroller.loginSystem);
router.post('/registerMechanism', RegisterController.registerSystem);

module.exports = router;