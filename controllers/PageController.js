exports.index = async (req, res) => {
    await res.render('index');
};

exports.login = async (req, res) => {
    await res.render('login');
};

exports.register_form = async (req, res) => {
    await res.render('register-form');
};

exports.suggestion_song = async (req, res) => {
    await res.render('suggestion-song');
};

exports.vote_song = async (req, res) => {
    await res.render('vote-song');
};