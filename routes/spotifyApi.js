const express = require('express');
const router = express.Router();

const SpotifyTrackController = require('../controllers/SpotifyTrackController');
const { ensureAuthenticated } = require('../middleware/authenticate');

router.get('/playlist/:id', ensureAuthenticated, SpotifyTrackController.playlist);
router.get('/addSong/:id', ensureAuthenticated, SpotifyTrackController.addSong);

module.exports = router;
