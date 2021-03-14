const express = require('express');
const router = express.Router();

const SpotifyTrackController = require('../controllers/SpotifyTrackController');

router.get('/playlist/:id', SpotifyTrackController.playlist);

module.exports = router;