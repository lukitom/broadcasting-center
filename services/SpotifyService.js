const request = require("request")

const login = () => {
  const client_id = process.env.CLIENT_ID
  const client_secret = process.env.CLIENT_SECRET

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    request.post(authOptions, (err, response, body) => {
      if (!err && response.statusCode === 200){
        const token = body.access_token
        console.log(`spotifyAuthentication: ${token}`)
        resolve(token)
      }
      if (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  login
}