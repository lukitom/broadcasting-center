const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const extendSchema = require('mongoose-extend-schema');
// const TrackModel = require('./TrackModel');

function date(){
  var date = new Date(Date.now());
  var myDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // console.log(myDate);
  return myDate;
}

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
    default: () => date()
  }
});

module.exports = mongoose.model('VoteSong', VoteSongModel);