const PlayModel = require('../database/models/PlayModel');
const moment = require('moment');

const index = async (req, res) => {
    // ! TODO: zrobić pobieranie piosenek z bazy na konkretny dzień
    const filters = {
        date: {
            $gte: moment().subtract(5, 'days').format('L'),
            $lt: moment().add(2, 'days').format('L')
        }
    }

    var songs = [];

    await PlayModel.find(filters, null, {sort: { date: 1}}, (err, result) => {
        if(err) console.error(err);

        if(result){
            songs = result;
        }
    });

    var playlista = [];
    var odsluchane = [];
    await songs.forEach((song) => {
        let date1 = new Date(song.date);
        let date2 = new Date(moment().format('L'));

        if(date1 >= date2){
            playlista.push(song);
        }else{
            odsluchane.push(song);
        }
    });

    const User = {
        logged: false
    }
    // przypisanie do obiektu User czy użytkownik jest zalogowany
    if(req.session.passport && req.session.passport.user){
        User.logged = req.session.passport.user._id;
        User.admin = (req.session.passport.user.permission == 'admin') ? true : false;
    }

    await res.render('index',{
        playlista,
        User,
        odsluchane
    });
};

const suggestionSong = (req, res) => {
    const User = {
        logged: false,
    };

    if (req.session.passport.user) {
        User.logged = req.session.passport.user._id;
        User.admin = (req.session.passport.user.permission == 'admin') ? true : false;
    }

    res.render('suggestionSong', {
        User
    });
};

const logOut = (req, res) => {
    req.logout()
    res.redirect('/login');
};

// logowanie i rejestracja
const login = async (req, res) => {
    const errors = req.flash().error || [];

    const User = {
        logged: false,
    };

    await res.render('login', {
        User,
        errors
    });
};

const register = (req, res) => {
    const User = {
        logged: false,
    };

    res.render('register', {
        User
    });
};

const adminPanel =(req,res) =>{
    const User = {
        logged: false
    };

    if (req.session.passport.user) {
        User.logged = req.session.passport.user._id;
        User.admin = (req.session.passport.user.permission == 'admin') ? true : false;
    }
    res.render('adminPanel',{
        User
    });
}

module.exports = {
    index,
    suggestionSong,
    logOut,
    login,
    register,
    adminPanel
}