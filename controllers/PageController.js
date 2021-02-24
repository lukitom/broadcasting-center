exports.index = async (req, res) => {
    await res.render('index');
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