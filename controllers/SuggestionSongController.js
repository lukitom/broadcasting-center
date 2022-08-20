const TrackModel = require('../database/models/TrackModel');
const PlayModel = require('../database/models/PlayModel');

// Adding new song to the next day
const addSong = async (req, res) => {
  var resultOurDatabase = null;

  // Checking database, should find song (if it hadn't existed it was created)
  await TrackModel.findOne({ _id: req.params.id }, (err, track) => {
      if(err) console.log(err);

      if(track != null) {
        resultOurDatabase = track;
      }
  }).clone();

  // Add to the next day;
  if (resultOurDatabase != null) {
    // if exist in our database then add to the playlist on the next day

    // TODO: zabezpieczyć czy jest już na ten dzień taka piosenka
    const song = new PlayModel({
      title: resultOurDatabase.title,
      artist: resultOurDatabase.artist,
      _id: resultOurDatabase._id,
      prewiewURL: resultOurDatabase.prewiewURL,
      uri: resultOurDatabase.uri
    });
    song.save()
      .then(() => {/*console.log('Dodano do poczekalni na następny dzień')*/})
      .catch(err => console.log(err));
  }

  res.redirect('/');
}

module.exports = {
  addSong
}