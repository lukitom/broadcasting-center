exports.index = async (req, res) => {
    await res.render('index',{
        playlista: [
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
        ]
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
    res.render('voteSong');
};