const express = require('express');
const router = express.Router();

const PageConstroller = require('../controllers/PageController');
const LoginConstroller = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const VoteSongController = require('../controllers/VoteSongController');
const SuggestionSongController = require('../controllers/SuggestionSongController.js');

const { ensureAuthenticated, canRegisterLogin, isAdmin } = require('../middleware/authenticate');

// ogsługa konkretnych podstron
router.get('/', PageConstroller.index);
router.get('/index', PageConstroller.index);
router.get('/login', canRegisterLogin, PageConstroller.login);
router.get('/register', canRegisterLogin, PageConstroller.register);
router.get('/suggestionSong', ensureAuthenticated, PageConstroller.suggestionSong);
// router.get('/voteSong', ensureAuthenticated, VoteSongController.voteSong);
router.get('/logOut', ensureAuthenticated, PageConstroller.logOut);
router.get('/adminPanel', ensureAuthenticated, isAdmin, PageConstroller.adminPanel);


// Handling data from forms
router.post('/login', canRegisterLogin, LoginConstroller.loginSystem);
router.post('/register', canRegisterLogin, RegisterController.registerSystem);

// Creating new position to vote on the next day
// router.get('/suggestionSong/:id', ensureAuthenticated, VoteSongController.addVoteSong);

// Adding new song to the next day propositions
// ! TODO: dokończyć przekierowywanie i obsługę ścieżki
router.get('/suggestionSong/:id', ensureAuthenticated, SuggestionSongController.addSong);

// Collect vote for specific song
router.get('/voteSong/:id', ensureAuthenticated, VoteSongController.vote)

module.exports = router;