const express = require('express');
const router = express.Router();

const SpotifyTrackController = require('../controllers/SpotifyTrackController');

router.get('/find', SpotifyTrackController.find);

module.exports = router;