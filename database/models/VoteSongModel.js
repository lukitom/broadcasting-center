const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const VoteSongModel = new Schema({
  trackId: {
    type: String,
    required: true
  },
  user: {
    type: Array
  },
  date: {
    type: Date,
    required: true,
    default: moment().add(1, 'day').format('L')
  }
});

module.exports = mongoose.model('VoteSong', VoteSongModel);