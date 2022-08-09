const PlayModel = require('../database/models/PlayModel');
const moment = require('moment');

const index = async (req, res) => {
    const User = {
        logged: false
    }
    // przypisanie do obiektu User czy użytkownik jest zalogowany
    if (req.session.passport && req.session.passport.user) {
        User.logged = req.session.passport.user._id;
        User.admin = (req.session.passport.user.permission == 'admin') ? true : false;
    }

    const filters = {
        date: {
            $gte: moment().subtract(5, 'days').format('L'),
            $lt: moment().add(2, 'days').format('L')
        }
    }

    var playlista = [];
    var odsluchane = [];

    await PlayModel.find(filters, null, {sort: { date: 1}}, async (err, result) => {
        if(err) console.error(err);

        let dateTemp;

        await result.forEach(async (song) => {
            let date1 = new Date(song.date);
            let date2 = new Date(moment().format('L'));
            let changeDate;

            if(dateTemp != moment(date1).format('L')) {
                changeDate = true;
            }else{
                changeDate = false;
            }
            dateTemp = moment(date1).format('L');

            if (date1 >= date2) {
                if(changeDate){
                    playlista.push({ date: moment(date1).format('L') })
                }
                await playlista.push(song);
            } else {
                // ! TODO: poprawić kolejność wyświetlania 
                if (changeDate) {
                    odsluchane.unshift({ date: moment(date1).format('L') })
                }
                await odsluchane.unshift(song);
            }
        });
        await odsluchane.reverse();

        await res.render('index', {
            playlista,
            User,
            odsluchane
        });
    }).clone();
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

const logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
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