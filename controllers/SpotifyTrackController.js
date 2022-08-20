const request = require('request');
const TrackModel = require('../database/models/TrackModel');
const { login } = require('../services/SpotifyService');

// Adding new Song not explicit to database from playlist id
const playlist = async (req, res) => {
    const token = await login().catch(err => {
        res.status(500).json({ err: err.message })
    })

    const options = {
        url: `https://api.spotify.com/v1/playlists/${req.params.id}/tracks?market=PL`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };

    request.get(options, async (error, response, body) => {
        let found = 0

        for(let i = 0; i < body.total; i++) {
            if (body.items[i].track.explicit) continue

            let temp_artist = []
            body.items[i].track.artists.forEach(element => {
                temp_artist.push(element.name);
            })

            const newTrack = {
                title: body.items[i].track.name,
                artist: temp_artist,
                _id: body.items[i].track.id,
                prewiewURL: body.items[i].track.preview_url,
                uri: body.items[i].track.uri
            }

            await TrackModel.findOneAndUpdate({ _id: newTrack._id }, newTrack, { upsert: true })
                .catch(err => {
                    console.log(err.message)
                })

            found++
        }

        console.log(`Found ${found} tracks.`)

        res.redirect('/adminPanel')
    })

}

// Searching track by title or playlist by playlist name
const find = async (req, res) => {
    const token = await login().catch(err => {
        res.status(500).json({ err: err.message })
    })
    const { search, type } = req.query

    const options = {
        url: `https://api.spotify.com/v1/search?q=${search}&type=${type}&market=PL`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };

    if(type === 'track') {
        request.get(options, async (err, response, body) => {
            if (err) {
                res.status(500).json({ error: err.message })
            }

            if (body.tracks.items) {
                const result = [];

                for (let i = 0; i < body.tracks.items.length; i++) {
                    if (body.tracks.items[i].explicit) continue

                    let temp_artist = [];
                    body.tracks.items[i].artists.forEach(element => {
                        temp_artist.push(element.name)
                    })

                    const newTrack = {
                        title: body.tracks.items[i].name,
                        artist: temp_artist,
                        _id: body.tracks.items[i].id,
                        prewiewURL: body.tracks.items[i].preview_url,
                        uri: body.tracks.items[i].uri
                    }

                    result.push(newTrack)
                }

                if (body.tracks.items.length === 0) {
                    res.status(200).json({ result: null })
                } else {
                    res.status(200).json({ result })
                }

            } else {
                res.status(404).json({result: null})
            }
        })
    }

    if (type === 'playlist') {
        request.get(options, async (err, response, body) => {
            if (err) {
                res.status(500).json({ error: err.message })
            }

            // ! TODO: if czy jest cokolwiek
            if (body.playlists.items) {
                const result = []

                for (let i = 0; i < body.playlists.items.length; i++) {
                    const newPlaylist = {
                        name: body.playlists.items[i].name,
                        id: body.playlists.items[i].id,
                    }

                    result.push(newPlaylist)
                }

                res.status(200).json({ result })
            } else {
                res.status(404).json({ result: null })
            }
        })
    }
}

// Adding / Update song in our database
const addSong = async (req, res) => {
    const token = await login().catch(err => {
        res.status(500).json({ err: err.message })
    })

    const SongId = req.params.id;

    const options = {
        url: `https://api.spotify.com/v1/tracks/${SongId}`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };

    request.get(options, async (err, response, body) => {
        if(err) return res.status(500).json({ err: err.message })

        if(body.explicit) return res.status(403).json({ err: "Song is explicit" })

        const artists = []
        body.artists.forEach(element => {
            artists.push(element.name)
        })

        const song = new TrackModel({
            title: body.name,
            artist: artists,
            _id: body.id,
            prewiewURL: body.preview_url,
            uri: body.uri
        })

        await TrackModel.findOneAndUpdate({ _id: song._id }, song, { upsert: true })
          .catch(err => {
              console.log(err)
          })

        res.redirect(`/suggestionSong/${SongId}`)
    })

}

module.exports = {
    playlist,
    find,
    addSong,
}
