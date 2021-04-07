const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const PlayModel = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: Array
  },
  id: {
    type: String,
    required: true
  },
  prewiewURL: {
    type: String
  },
  uri: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: moment().add(1, 'day').format('L')
  }
});

module.exports = mongoose.model('Play', PlayModel);