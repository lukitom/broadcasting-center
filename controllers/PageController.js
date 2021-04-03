exports.index = async (req, res) => {
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
    if(req.session.passport){
        User.logged = req.session.passport.user;
        User.admin=true;
    }

// ! TODO: dokończyć przesyłanie danych do templatki z passport
    await res.render('index',{
        playlista,
        User,
        odsluchane
    });
};

exports.suggestionSong = (req, res) => {
    const User = {
        logged: false,
    };

    if (req.session.passport) {
        User.logged = req.session.passport.user;
        User.admin=true;
    }

    res.render('suggestionSong', {
        User
    });
};

exports.logOut = (req, res) => {
    req.logout()
    res.redirect('/login');
};

// logowanie i rejestracja
exports.login = async (req, res) => {
    const errors = req.flash().error || [];

    const User = {
        logged: false,
    };

    await res.render('login', {
        User,
        errors
    });
};

exports.register = (req, res) => {
    const User = {
        logged: false,
    };

    res.render('register', {
        User
    });
};

exports.adminPanel =(req,res) =>{
    const User = {
        logged: false
    };

    if (req.session.passport) {
        User.logged = req.session.passport.user;
        User.admin=true;//! TODO: sprawdzić czy admin
    }
    res.render('adminPanel',{
        User
    });
}