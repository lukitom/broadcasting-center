const { json } = require('body-parser');
const request = require('request'); // "Request" library
const TrackModel = require('../database/models/TrackModel');

exports.playlist = (req, res) => {
    //#region uzyskanie tokena do zapytanań do api spotify
    var client_id = process.env.CLIENT_ID; // Your client id
    var client_secret = process.env.CLIENT_SECRET; // Your client secret

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
    //#endregion

    // ! TODO: change this library to e.g. axios
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const token = body.access_token;

            // console.log() received auth token
            // console.log(token);

            var options = {
            url: `https://api.spotify.com/v1/playlists/${req.params.id}/tracks?market=PL`,              // download tracks from playlist Id received from user
            // url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=PL',     // download tracks from playlist Id written in this line
            // url: 'https://api.spotify.com/v1/tracks/6tDDoYIxWvMLTdKpjFkc1B?market=PL',               // download one track with Id written in this line
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };
            request.get(options, async function(error, response, body) {
            // #region wiele utworów - playlista
                var found = 0;
                for(let i = 0; i < body.total; i++){
                    if (body.items[i].track.explicit) continue
                    let temp_artist =[];
                    body.items[i].track.artists.forEach(element => {
                        temp_artist.push(element.name);
                    });
                    const newTrack ={
                        title: body.items[i].track.name,
                        artist: temp_artist,
                        _id: body.items[i].track.id,
                        prewiewURL: body.items[i].track.preview_url,
                        uri: body.items[i].track.uri
                    };

                    //#region aktualizowanie jeśli znajdzie, a jeśli nie ma to dodaje nowy dokument
                    await TrackModel.findOneAndUpdate({ _id: newTrack._id }, newTrack, { upsert: true })
                        .then(() => {
                            found++;
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                    // #endregion
                }
                console.log(`Found ${found} tracks.`);
                // #endregion

                // #region dodawanie pojedynczej piosenki bez sprawdzenia czy istnieje
                // let temp_artist =[];
                // body.artists.forEach(element => {
                //     temp_artist.push(element.name);
                // });

                // const newTrack = new TrackModel({
                //     title: body.name,
                //     artist: temp_artist,
                //     _id: body.id,
                //     prewiewURL: body.preview_url,
                //     uri: body.uri
                // });
                // console.log(newTrack);

                // newTrack.save()
                //     .then(() => {
                //         res.redirect('/');
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
                // #endregion

                res.redirect('/');
            });
        }
    });
};

exports.find = async (req, res) => {
    //#region uzyskanie tokena do zapytanań do api spotify
    var client_id = process.env.CLIENT_ID; // Your client id
    var client_secret = process.env.CLIENT_SECRET; // Your client secret

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
    //#endregion

    const { search, type } = req.query;
    // console.log(titleSearch);

    request.post(authOptions, function(err, response, body){
        if (!err && response.statusCode === 200){
            const token = body.access_token;

            var options = {
                url: `https://api.spotify.com/v1/search?q=${search}&type=${type}&market=PL`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };

            if(type === 'track'){
                request.get(options, async function(err, response, body){
                if (err){
                    res.status(500).json({ error: err.message });
                }

                if(body.tracks.items){
                    var result = [];

                    for(let i = 0; i < body.tracks.items.length; i++){
                        if (body.tracks.items[i].explicit) continue

                        let temp_artist = [];
                        body.tracks.items[i].artists.forEach(element => {
                            temp_artist.push(element.name);
                        });

                        const newTrack = {
                            title: body.tracks.items[i].name,
                            artist: temp_artist,
                            _id: body.tracks.items[i].id,
                            prewiewURL: body.tracks.items[i].preview_url,
                            uri: body.tracks.items[i].uri
                        };

                        result.push(newTrack);
                    }

                    if(body.tracks.items.length == 0){
                        res.status(200).json({result: null});
                    }
                    else{
                        res.status(200).json({"result": result});
                    }

                }else{
                    res.status(404).json({result: null});
                }
            });

            }

            if (type === 'playlist') {
                request.get(options, async function (err, response, body) {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    }

                    // ! TODO: if czy jest cokolwiek
                    if (body.playlists.items) {
                        var result = [];

                        // iterowanie po playlistach
                        for (let i = 0; i < body.playlists.items.length; i++) {
                            const newPlaylist = {
                                name: body.playlists.items[i].name,
                                id: body.playlists.items[i].id,
                            }

                            result.push(newPlaylist);
                        }

                        res.status(200).json(result);
                    } else {
                        res.status(404).json({ result: null });
                    }
                });
            }

        } else {
            res.status(500).json({ err: err.message });
        }
    });
};