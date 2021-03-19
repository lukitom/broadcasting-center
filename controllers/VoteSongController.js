const VoteSongModel = require('../database/models/VoteSongModel');
const UserModel = require('../database/models/UserModel');
const TrackModel = require('../database/models/TrackModel');

exports.addVoteSong = async (req, res) => {

  const newVoteSong = new VoteSongModel({
    trackId: "7MAibcTli4IisCtbHKrGMh",
    user: [
      "60361365734b4d7ed874c8e2"
    ]
  });

  newVoteSong.save()
    .then(() => {
      console.log(newVoteSong);
    })
    .catch(err => {
      console.log(err);
    })
  res.redirect('/');
}

// ! TODO: pobieranie informacji z bazy o piosenkach z konkretnego dnia i przekazywanie ich
exports.voteSong = async(req, res) => {
  const User = {};

  if (req.session.passport) {
    User.logged = req.session.passport.user;
  }

  // ! TODO: przefiltrować do konkretnej daty
  // filter głosowanych piosenek
  const filterSong = {
    date: {
      $lt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      $gte: new Date(Date.now())
    }
  }

  let songsToVoteToday = null;
  let fullSongs = [];
  // uzyskanie tytułów głosowanych dzisiaj
  await VoteSongModel.find(filterSong, (err, result) => {
    if(err){
      console.log(err);
    }
    songsToVoteToday = result;
  });

  // uzyskanie pełnych informacji o piosenkach głosowanych dzisiaj
  for (let i = 0; i < songsToVoteToday.length; i++) {
    await TrackModel.findOne({ _id: songsToVoteToday[i].trackId }, (err, song) => {
      fullSongs.push(song);
    })
  }


  // !!! TODO: prawidłowe sprawdzanie czy użytkownik może głosować
  const filterUser = {
    $or: [
      { lastVoted: {
        $lt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }},
      { lastVoted: null }
    ],
    _id: req.session.passport.user
  };

  // let usersCanVote = [];
  await UserModel.find(filterUser, (err, result) => {
    if(err) console.log(err);
    if(result){
      // usersCanVote = result;
      // console.log(result);
      User.canVote = true;
    }
  });

  // console.log(User);

  res.render('voteSong', {
    User,
    fullSongs
  });
};


// ? TODO: sprawdzić czy dobrze, ale chyba tak
exports.vote = async (req, res) => {
  const filterSong = {
    trackId: req.params.id,
    date: {
      $lt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      $gte: new Date(Date.now())
    }
  };

  var resultSong;
  await VoteSongModel.findOne(filterSong, (err, result) => {
    if (err) console.log(err);
    if(result){
      resultSong = result;
    }
  });

  let users = resultSong.user
  users.push(req.session.passport.user);
  resultSong.user = users;

  await VoteSongModel.findOneAndUpdate(filterSong, resultSong);
  await UserModel.findOneAndUpdate({ _id: req.session.passport.user }, { lastVoted: new Date(Date.now())});

  res.redirect('/voteSong');
}