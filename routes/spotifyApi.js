const express = require('express');
const router = express.Router();

const SpotifyTrackController = require('../controllers/SpotifyTrackController');
const ensureAuthenticated = require('../middleware/authenticate').ensureAuthenticated;

router.get('/playlist/:id', ensureAuthenticated, SpotifyTrackController.playlist);
router.get('/addSong/:id', ensureAuthenticated, SpotifyTrackController.addSong);
router.get('/test', SpotifyTrackController.test);

module.exports = router;