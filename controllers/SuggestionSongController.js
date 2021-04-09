const TrackModel = require('../database/models/TrackModel');
const PlayModel = require('../database/models/PlayModel');
const moment = require('moment');

// Adding new song to the next day
const addSong = async (req, res) => {
  var resultOurDatabase = null;
  var song = null;

  // Checking database, should find song (if it hadn't existed it was created)
  await TrackModel.findOne({ _id: req.params.id })
    .then((track) => {
      if(track != null) {
        resultOurDatabase = track;
        song = {
          title: resultOurDatabase.title,
          artist: resultOurDatabase.artist,
          id: resultOurDatabase._id,
          prewiewURL: resultOurDatabase.prewiewURL,
          uri: resultOurDatabase.uri
        };
      }
    })
    .catch((err) => {
      console.log(err);
      res.render('error');
    });

  // Add to the next day;
  if (song != null) {
    // if exist in our database then add to the playlist on the next day

    // TODO: zabezpieczyć czy jest już na ten dzień taka piosenka
    const filter = {
      id: resultOurDatabase._id,
      date: moment().add(1, 'day').format('L')
    }

    await PlayModel.findOneAndUpdate(filter, song, { upsert: true })
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
        res.render('error');
      });
  }

}

module.exports = {
  addSong
}