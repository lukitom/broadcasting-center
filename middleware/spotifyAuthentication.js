const request = require('request'); // "Request" library

const login = async(req, res, next) => {
  //#region uzyskanie tokena do zapytanań do api spotify
  var client_id = process.env.CLIENT_ID; // Your client id
  var client_secret = process.env.CLIENT_SECRET; // Your client secret

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
    //#endregion

    var token = null;

    await request.post(authOptions, function (err, response, body) {
      if (!err && response.statusCode === 200){
        token = body.access_token;
        console.log(`spotifyAuthentication: ${token.access_token}`);
      }
    });

    req.session.spotify_token = token;
    next();
};

module.exports = {
  login
}