var express = require('express');
const PORT = process.env.PORT || 5000;
var app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
const SpotifyWebApi = require('spotify-web-api-node');
app.post('/', function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    let myJson = request.body;


    var code = myJson.m1;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:19006/callback',
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
        clientSecret: '8462bfbfae2e4bffa2ed81ff7b3d5ce8',
    })

    spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('Trefresh token' + data.body['refresh_token']);
            var result = { 'refresh_token': data.body['refresh_token'], "access_token": data.body['access_token'], "expires_in": data.body['expires_in']}
            response.send(result);
            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
        },
        function (err) {
            console.log('Something went wrong!', err);
        }
    );

});
app.post('/category', function (request, response) {
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:19006/callback',
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
        clientSecret: '8462bfbfae2e4bffa2ed81ff7b3d5ce8',
    })
spotifyApi.getCategory('party', {
    country: 'SE',
    locale: 'sv_SE'
})
    .then(function (data) {
        console.log(data.body);
    }, function (err) {
        console.log("Something went wrong in cata!", err);
    });
});
app.post('/refresh', function (request, response) {
    let myJson = request.body;
    var code = myJson.m1;
    console.log(code);
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:19006/callback',
        clientId: '6d21f19fce214d8b81e9bab21dc39adc',
        clientSecret: '8462bfbfae2e4bffa2ed81ff7b3d5ce8',
        refresh_token : code
    })
  
    

    spotifyApi.refreshAccessToken().then(
        function (data) {

            console.log('The access token has been refreshed!');

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
            console.log('Could not refresh access token', err);
        }
    );

});
app.listen(PORT);