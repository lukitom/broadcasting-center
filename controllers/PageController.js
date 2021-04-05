const index = async (req, res) => {
    const playlista = [
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        }
    ];

    const odsluchane = [
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        },
        {
            title: "jakiś tytuł",
            artist: "jakiś autor",
            trackId: "id utworu",
            prewiewURL: "Url do 30 sekundowej próbki utworu",
            uri: "link do strony internetowej spotify"
        }
    ];

    const User = {
        logged: false
    }
    // przypisanie do obiektu User czy użytkownik jest zalogowany
    if(req.session.passport && req.session.passport.user){
        User.logged = req.session.passport.user._id;
        User.admin = (req.session.passport.user.permission == 'admin') ? true : false;
    }

// ! TODO: dokończyć przesyłanie danych do templatki z passport
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