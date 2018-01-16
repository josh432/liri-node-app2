require("dotenv").config();
//var spotify = new Spotify(keys.spotify);
var colors = require('colors');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var fs= require('fs');
var request = require('request');
var filename = './log.txt';
var log = require('simple-node-logger').createSimpleFileLogger( filename );
log.setLevel('all');

var action = process.argv[2];
var argument = process.argv[3];

//controller function

doSomething(action, argument);

function doSomething(action, argument) {
	switch (action) {
		case "my-tweets":
			getMyTweets();
			break;

		case "spotify-this-song":
			if (argument == "" || argument == undefined) {
				spotifyThisSong("Ace of Base");
			}else{
				spotifyThisSong(argument);
			}
			break;

		case "movie-this":
			if (argument == "" || argument == undefined) {
				getMovie("Mr. Nobody");
			}else{
				getMovie(argument);
			}
			break;

		case "do-what-it-says":
			doWhatItSays();
			break;

		default:
			console.log("Your choices are: my-tweets, spotify-this-song, movie-this, do-what-it-says");
	}

}

//Twitter function

function getMyTweets() {
	var client = new Twitter(keys.twitter);
	var params = {screen_name: '@wikidybtch', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

	  	// Loops through tweets and prints out tweet text and creation date.
	  	for (var i = 0; i < tweets.length; i++) {
	  		var tweetText = tweets[i].text;
	  		log.info("Tweet Text: " + tweetText);
	  		console.log("Tweet Text: " + tweetText.red)
	  		var tweetCreationDate = tweets[i].created_at;
	  		log.info("Tweet Creation Date: " + tweetCreationDate);
	  		console.log("Tweet Creation Date: " + tweetCreationDate.yellow)
	  	}
	  } else {
	  	log.info(error);
	  }
	});
}

//Spotify function
function spotifyThisSong(argument) {
			var spotify = new Spotify(keys.spotify);
		   spotify.search({ type: 'track', query: argument }, function(err, data) {
 				 if (err) {
    			return console.log('Error occurred: ' + err);
  }

  var artistsArray = data.tracks.items[0].album.artists;
  var artistsNames = [];
  for (var i = 0; i < artistsArray.length; i++) {
			artistsNames.push(artistsArray[i].name);
		}

		var artists = artistsNames.join(", ");
 
console.log("Artist(s): " + artists);
log.info("Artist(s): " + artists);
console.log("Song: " + data.tracks.items[0].name);
log.info("Song: " + data.tracks.items[0].name);
console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
log.info("Spotify Preview URL: " + data.tracks.items[0].preview_url)
console.log("Album Name: " + data.tracks.items[0].album.name);
log.info("Album Name: " + data.tracks.items[0].album.name);
});
}

	 



	

//movie function
function getMovie(argument) {
// Runs a request to the OMDB API with the movie specified.
var queryUrl = "https://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy&r=json&tomatoes=true";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers movie info.
	    var movie = JSON.parse(body);

	    // Prints out movie info.

 
      console.log("Movie Title: " + movie.Title);
      log.info("Movie Title: " + movie.Title);
	    console.log("Release Year: " + movie.Year);
	    log.info("Release Year: " + movie.Year);
	    console.log("IMDB Rating: " + movie.imdbRating);
	    log.info("IMDB Rating: " + movie.imdbRating);
	    console.log("Country Produced In: " + movie.Country);
	    log.info("Country Produced In: " + movie.Country);
	    console.log("Language: " + movie.Language);
	    log.info("Language: " + movie.Language);
			console.log("Plot: " + movie.Plot);
			log.info("Plot: " + movie.Plot);
	    console.log("Actors: " + movie.Actors);
	    log.info("Actors: " + movie.Actors);
	   	console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
	   	log.info("Rotten Tomatoes Rating: " + movie.tomatoRating);
      console.log("Rotten Tomatoes URL: " + movie.tomatoURL);
      log.info("Rotten Tomatoes URL: " + movie.tomatoURL);
	   
	  }
	});
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf-8", function(err, data){
			if (err) {
		console.log("error reading file:", error);
	}else {
		var dataArray = data.split(',');
	 	action = dataArray[0];
		argument = dataArray[1];
		doSomething(action, argument);

		}
	})
}
