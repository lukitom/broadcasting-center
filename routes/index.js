const express = require('express');
const router = express.Router();

const PageConstroller = require('../controllers/PageController')
const LoginConstroller = require('../controllers/LoginController')
const RegisterController = require('../controllers/RegisterController')
const SpotifyTrackController = require('../controllers/SpotifyTrackController')

// const isAuthenticate = require('../middleware/authenticate').isAuthenticate;
const { ensureAutheticated, canRegisterLogin } = require('../middleware/authenticate');

// ogsługa konkretnych podstron
router.get('/', PageConstroller.index);
router.get('/index', PageConstroller.index);
router.get('/login', canRegisterLogin, PageConstroller.login);
router.get('/register', canRegisterLogin, PageConstroller.register);
router.get('/suggestionSong', ensureAutheticated, PageConstroller.suggestionSong);
router.get('/voteSong', ensureAutheticated, PageConstroller.voteSong);
router.get('/logOut', PageConstroller.logOut);

router.get('/test', SpotifyTrackController.test);

router.post('/login', canRegisterLogin, LoginConstroller.loginSystem);
router.post('/register', canRegisterLogin, RegisterController.registerSystem);

module.exports = router;