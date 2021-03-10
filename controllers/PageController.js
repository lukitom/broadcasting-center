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
    if(req.session.userId){
        User.logged = true;
    }

    await res.render('index',{
        playlista,
        User,
        odsluchane
    });
};

exports.login = async (req, res) => {
    await res.render('login');
};

exports.registerSorm = (req, res) => {
    res.render('registerForm');
};

exports.suggestionSong = (req, res) => {
    res.render('suggestionSong');
};

exports.voteSong = (req, res) => {
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
    
    res.render('voteSong', {
        playlista
    });
};

exports.logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};