require("dotenv").config();

//Gets data from keys file (spotify keys)
var keysFile = require("./keys.js");

//npm request for bandsintown
// var bandsintown = require('bandsintown')(APP_ID);

//npm request for OMDB
var omdb

//npm request for Spotify object in keys file
var spotify = new Spotify(keys.spotify);

//includes the request npm package
var request = require('request');

//npm for Spotify
var Spotify = require('node-spotify-api');

// Global Variables for user inputs!!

//This sets up how a user can input a name that has more than one word
//Empty variable for storing the  name
var liri = "";

//All of the args will be stored in an array
var nodeArgs = process.argv;

//This is what the user will type in to let liri know what to do (see below)
var command = process.argv[2];

//Loop through the words entered in the node Arg and add +'s to store together
for (var i = 2; i < nodeArgs.length; i++)  {
    if (i > 2 && i < nodeArgs.length) {
        liri = liri + "+" + nodeArgs[i];
    } else {
        liri +=nodeArgs[i];
    }
}

//switch case for different Liri Commands
//The command is the var command above
//bandsintown
switch(command){
    case "concert-this":
      showConcerts();
    break;
  
    //spotify
    case "spotify-this-song":
      if(liri){
        getSong(liri);
      } else{
        getSong("The Sign");
      }
    break;
  
    //OMDB
    case "movie-this":
      if(liri){
        getMovie(liri)
      } else{
        getMovie("Mr. Nobody")
      }
    break;
  
    //The do-what-it-says to play I Want It That Way inside random.txt
    //I personally would've picked *NSync instead of Backstreet Boys
    case "do-what-it-says":
      doWhatItSays();
    break;
  
    default:
      console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
    break;
  }




//Commands for Liri to accomplish
// * `concert-this`

// * `spotify-this-song`
function getSong (song){

  }

// * `movie-this`

//Do What it says (aka play the Backstreet Boys from random.txt)

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      getSong(txt[1]);
    });
  }
