const request = require('request'); // "Request" library
const TrackModel = require('../database/models/TrackModel');


exports.test = (req, res) => {
    var client_id = your_spotify_client_id; // Your client id
    var client_secret = your_spotify_secret_key; // Your secret

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        //console.log(token);
        var options = {
        url: 'https://api.spotify.com/v1/tracks/4MzXwWMhyBbmu6hOcLVD49;',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
        };
        request.get(options, function(error, response, body) {
        //res.status(200).json(body);
        let temp_artist =[];
        body.artists.forEach(element => {
            temp_artist.push(element.name);
        });
        const newTrack = new TrackModel({
            title: body.name,
            artist: temp_artist,
            _id: body.id,
            prewiewURL: body.preview_url,
            uri: body.uri
        });
        console.log(newTrack);

        newTrack.save()
            .then(() => {
                // req.flash('success_msg', 'Rejestracja się powiodła. Możesz się zalogować.')
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
            })

        res.redirect('/');
        });
    }
    });
};