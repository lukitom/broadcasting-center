const { mongo } = require('mongoose');
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
            console.log(token);
            var options = {
            //url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=PL',
            url: 'https://api.spotify.com/v1/tracks/6tDDoYIxWvMLTdKpjFkc1B?market=PL',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };
            request.get(options, function(error, response, body) {
            //res.status(200).json(body);

            //#region wiele utworów - playlista 
        //     let tracks=[];
        //     for(i = 0; i < body.total; i++){
        //         if (body.items[i].track.explicit) continue
        //         let temp_artist =[];
        //         body.items[i].track.artists.forEach(element => {
        //             temp_artist.push(element.name);
        //         });
        //         let temp_track ={
        //             title: body.items[i].track.name,
        //             artist: temp_artist,
        //             track_id: body.items[i].track.id,
        //             prewiewURL: body.items[i].track.preview_url,
        //             uri: body.items[i].track.uri
        //         };
        //         tracks.push(temp_track);

        //         // TrackModel.findById(i, (err, res) => {
        //         //     if(err) console.log(error);
        //         //     if(!res) {
        //         //         const newTrack = new TrackModel({
        //         //             title: temp_track.title,
        //         //             artist: temp_track.artist,
        //         //             track_id: temp_track.track_id,
        //         //             prewiewURL: temp_track.prewiewURL,
        //         //             uri: temp_track.uri
        //         //         });
        //         //         newTrack.save()
        //         //             .then(() => {
        //         //                 console.log(newTrack.title)
        //         //             })
        //         //             .catch((err) => {
        //         //                 console.log(err);
        //         //             });
        //         //     }

        //         // })
        //     }
        //     console.log(tracks);
        //     TrackModel.insertMany(tracks);
        //     // tracks.forEach(track =>{
        //     //     TrackModel.find({track_id: track.track_id}, (err, res) => {
        //     //         if(err) console.log(error);
        //     //         if(!res) {
        //     //             const newTrack = new TrackModel({
        //     //                 title: track.title,
        //     //                 artist: track.artist,
        //     //                 track_id: track.track_id,
        //     //                 prewiewURL: track.prewiewURL,
        //     //                 uri: track.uri
        //     //             });
        //     //             newTrack.save()
        //     //                 .then(() => {
        //     //                     console.log(newTrack.title)
        //     //                 })
        //     //                 .catch((err) => {
        //     //                     console.log(err);
        //     //                 });
        //     //         }

        //     //     })
        //     // });

        // // for(i =0; i< tracks;i++)

        //#endregion




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