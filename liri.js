require("dotenv").config();

var keysFile = require("./keys.js");
var bandsintown = require('bandsintown')(APP_ID);
var spotify = new Spotify(keys.spotify);
var request = require('request');


//Commands for Liri to accomplish
// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

//Global variables
//input for user to type a string word
var inputString = process.argv;
