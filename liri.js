require("dotenv").config();

//Gets data from keys file (spotify keys)
var keys = require("./keys.js");

//npm request for bandsintown
// var bandsintown = require('bandsintown')(APP_ID);

//npm request for Spotify object in keys file
// var spotify = new Spotify(keys.spotify);

//includes the request npm package
var request = require('request');

//npm for Spotify
// var Spotify = require('node-spotify-api');

// Global Variables for user inputs!!

//This sets up how a user can input a name that has more than one word
//Empty variable for storing the  name
var liri = "";

// //All of the args will be stored in an array
var nodeArgs = process.argv;

//This is what the user will type in to let liri know what to do (see below)
var command = process.argv[2];

// //Loop through the words entered in the node Arg and add +'s to store together
for (var i = 3; i < nodeArgs.length; i++)  {
    if (i > 3 && i < nodeArgs.length) {
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
      getConcert();
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
      console.log("Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says");
    break;
  }




//Commands for Liri to accomplish
// * `concert-this`
function getConcert() {

}

// * `spotify-this-song`
function getSong(){
    spotify.search({ type: 'track', query: liri }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });

  }

// * `movie-this`
function getMovie(liri) {
    var queryUrl = "http://www.omdbapi.com/?t=" + liri + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
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
       
   
      }
    });
    
}

//Do What it says (aka play the Backstreet Boys from random.txt)

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      getSong(txt[1]);
    });
  }
