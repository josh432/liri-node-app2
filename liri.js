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
			if (argument == "") {
				lookUpThisSong();
			}else{
				spotifyThisSong(argument);
			}
			break;

		case "movie-this":
			if (argument == "") {
				getMovie("Mr. Nobody");
			}else{
				getMovie(argument);
			}
			break;

		case "do-what-it-says":
			dowhatItSays();
			break;

		default:
			console.log("Your choices are my-tweets, spotify-this-song, movie-this, do-what-it-says");
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
	  		console.log("Tweet Text: " + tweetText.red);
	  		var tweetCreationDate = tweets[i].created_at;
	  		console.log("Tweet Creation Date: " + tweetCreationDate.yellow);
	  	}
	  } else {
	  	console.log(error);
	  }
	});
}

//Spotify function





	

//movie function
function getMovie(argument) {
// Runs a request to the OMDB API with the movie specified.
var queryUrl = "https://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
	  // If the request is successful...
	  if (!error && response.statusCode === 200) {
	    
	    // Parses the body of the site and recovers movie info.
	    var movie = JSON.parse(body);

	    // Prints out movie info.
	    console.log("Movie Title: " + movie.Title);
	    console.log("Release Year: " + movie.Year);
	    console.log("IMDB Rating: " + movie.imdbRating);
	    console.log("Country Produced In: " + movie.Country);
	    console.log("Language: " + movie.Language);
	    console.log("Plot: " + movie.Plot);
	    console.log("Actors: " + movie.Actors);
	   // console.log("Rotten Tomatoes Rating: " + movie.Value);
	   
	  }
	});
}
