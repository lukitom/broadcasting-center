const express = require('express');
const router = express.Router();

const PageConstroller = require('../controllers/PageController');
const LoginConstroller = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const VoteSongController = require('../controllers/VoteSongController');

// const isAuthenticate = require('../middleware/authenticate').isAuthenticate;
const { ensureAutheticated, canRegisterLogin } = require('../middleware/authenticate');

// ogsługa konkretnych podstron
router.get('/', PageConstroller.index);
router.get('/index', PageConstroller.index);
router.get('/login', canRegisterLogin, PageConstroller.login);
router.get('/register', canRegisterLogin, PageConstroller.register);
router.get('/suggestionSong',/* ensureAutheticated,*/ PageConstroller.suggestionSong);
router.get('/voteSong',/* ensureAutheticated,*/ PageConstroller.voteSong);
router.get('/logOut', PageConstroller.logOut);
/*router.post('/test',(req, res) => {
    console.log(req.params);
    res.status(200).json(
        {id: req.params}
        
    );
});*/
// router.post('/test', (req, res, next) => {
//     //res.status(200).json(["Tony","Lisa","Michael","Ginger","Food"]);
//     res.json({ username: 'Flavio' })
//    });

router.post('/login', canRegisterLogin, LoginConstroller.loginSystem);
router.post('/register', canRegisterLogin, RegisterController.registerSystem);

router.post('/suggestionSong', ensureAutheticated, VoteSongController.addVoteSong);
router.get('/voteSong/:id', ensureAutheticated, VoteSongController.vote)

module.exports = router;