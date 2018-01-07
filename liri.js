require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs=require('fs');
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