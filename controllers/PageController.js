exports.index = (req, res) => {
    res.render('index');
};

exports.login = (req, res) => {
    res.render('login');
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