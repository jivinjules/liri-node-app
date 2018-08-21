require("dotenv").config();

//Gets data from keys file (spotify keys)
var keys = require('./keys.js');

//var request for file system to access random.txt
var fs = require('fs');

//var request for moment.js for concert date
var moment = require('moment');

//npm request for bandsintown
var bandsintown = require('bandsintown')(APP_ID = 'codingbootcamp');

//includes the request npm package
var request = require('request');

//npm for Spotify
var Spotify = require('node-spotify-api');

///////////// GLOBAL VARIABLES FOR USER INPUT//////////

//This sets up how a user can input a name that has more than one word
//Empty variable for storing the name
var liri = "";

// //All of the args will be stored in an array
var nodeArgs = process.argv;

//This is what the user will type in to let liri know what to do (see below)
var command = process.argv[2];

// //Loop through the words entered in the node Arg and add +'s to store together
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        liri = liri + "+" + nodeArgs[i];
    } else {
        liri += nodeArgs[i];
    }
}

//switch case for different Liri Commands. I had to google switch/case.
//The command is the var command above (aka "line 25")

//bandsintown
switch (command) {
    case "concert-this":
        getConcert();
        break;

    //spotify
    case "spotify-this-song":
        if (liri) {
            getSong(liri);
        } else {
            getSong("The Sign Ace of Base");
        }
        break;

    //OMDB
    case "movie-this":
        if (liri) {
            getMovie(liri)
        } else {
            getMovie("Mr. Nobody")
        }
        break;

    //The do-what-it-says links to I Want It That Way inside random.txt
    //I personally would've picked *NSync instead of Backstreet Boys
    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says");
        break;
}

//Commands for Liri to accomplish
// * `concert-this`
function getConcert() {
    var query = "https://rest.bandsintown.com/artists/" + liri + "/events?app_id=codingbootcamp"
    bandsintown

    request(query, function (error, response, body) {
        if (error) {
            console.log("Error! Try again");
        } else {
     
            //This loops through all the concerts listed    
            for (let i = 0; i < JSON.parse(body).length; i++) {
                //This prints out the concert information and puts date in correct format
                console.log('Venue Name: ' + JSON.parse(body)[i].venue.name);
                console.log('Venue Location: ' + JSON.parse(body)[i].venue.city);
                console.log('Concert Date: ' + moment(JSON.parse(body)[i].datetime).format('MM/DD/YYYY'));
            }
        };
    });
}

// * `spotify-this-song`
function getSong(liri) {
    //constructor data for spotify
    var spotify = new Spotify(keys.spotify);

    //query for spotify search and console log the results
    spotify.search({ type: 'track', query: liri }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            //var to cut down typing for spotify
            var song = data.tracks.items[0];

            console.log("Artist(s): " + song.artists[0].name);
            console.log("Song Name: " + song.name);
            console.log("Preview Link: " + song.preview_url);
            console.log("Album Name: " + song.album.name);
        }

    });

}

// * `movie-this`
function getMovie(liri) {
    var queryUrl = "http://www.omdbapi.com/?t=" + liri + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the info
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMdB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            console.log(error);
        }
    });

}

//Do What it says (aka play the Backstreet Boys from random.txt)

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');

        getSong(txt[1]);
    });
}
