exports.index = (req, res) => {
    res.render('index');
};

exports.login = (req, res) => {
    res.render('login');
};

exports.register_form = (req, res) => {
    res.render('register-form');
};

exports.suggestion_song = (req, res) => {
    res.render('suggestion-song');
};

exports.vote_song = (req, res) => {
    res.render('vote-song');
};