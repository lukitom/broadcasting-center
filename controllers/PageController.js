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
    }

    res.render('suggestionSong', {
        User
    });
};

exports.voteSong = (req, res) => {
    const User = {
        logged: false,
    };

    if (req.session.passport) {
        User.logged = req.session.passport.user;
    }

    res.render('voteSong', {
        User
    });
};

exports.logOut = (req, res) => {
    req.logout()
    res.redirect('/login');
};

// logowanie i rejestracja
exports.login = async (req, res) => {
    const User = {
        logged: false,
    };
    await res.render('login', {
        User
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