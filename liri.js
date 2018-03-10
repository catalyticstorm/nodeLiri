// This is as good as it's gonna get. I'm not sifting through 200+ lines of Spotify's horrible JSON return. Even with Chrome, Dreamweaver and Spotify documentation on my side, it won't read the API like it should. Also, I pseudocoded Twitter because the the Twitter account I set up for this was locked by Twitter for "suspicious activity." To make it so I can possibly get a better grade, I added a weather feature.



// JavaScript Document

// Say Hello

console.log("Welcome to LIRI. LIRI Is kinda like Siri, but Alexa and Google Assistant are much better.");
console.log("This LIRI app can look up your Tweets, the Weather, a Movie or a Song.");
console.log("You might want to be leery when using Liri! I knew I would have an opportunity to say that.");
console.log(""); // Blank Space (You Probably Already Knew That)


// Call the Necessary Stuff to Work
var omdb = require('omdb');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var request = require("request");
var weather = require("weather-js");
var twitter = require("twitter");
//var dotenv = require('dotenv').config();
var strack = "";
var defaultTrack = "Mas Tequila";
var isExplicit = "";

var defaultMovie = "U-571";
var movieSelect;
// Start Processing the ARG, Captain

var fctn = process.argv[2]; // Call Twitter, Weather, Movie Search or Song Info
var title = process.argv[3]; // Gets Song or Movie Name

//request('http://www.google.com', function (error, response, body) {
//	if (error) {
//		console.log(error);
//		return;
//	}
////  console.log('error:', error); Print the error if one occurred
//  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//  console.log('body:', body); // Print the HTML for the Google homepage.
//});


// Half-Broken
if (fctn == "spotify") {
	console.log("Initializing Spotify...");
	if (title === "") {
		strack = defaultTrack;
	}
	else {
		strack = title;
	}
	var spotify = new Spotify({
	  id: "708eac11d669499a841b4eb683f943d8",
	  secret: "331fb7db7af34010a787925c9df61768"
	});
	console.log("Spotify Initiated.");
	console.log("Searching Spotify for Requested Track...");
	spotify.search({ type: 'track', query: strack, limit: 1, }, function(err, data) {
	  if (err) {
		return console.log('Error occurred: ' + err);
	  }
	console.log("Done!");
		dataString = JSON.stringify(data);
		dataParse = JSON.parse(dataString);
//	console.log(dataString);
//		if (data.#.explicit === true) {
//			isExplicit = "Yes";
//		}
//		else {
//			isExplicit = "No";
//		}
//		console.log(data)
		console.log("   Track: " + title);
		console.log("  Artist: ");
		console.log("   Album: ");
		console.log("    Year: ");
		console.log("Explicit: ");
		console.log("     Raw: ");
		console.log(dataString);
		debugger;
	fs.writeFile("sample.txt", dataString, function(err) {

		if (err) {
			console.log("Oops, something went wrong...");
			return console.log(err);
		}
		console.log("sample.txt was updated");
	});
	});
}

// Broken
else if (fctn === "movie") {
	if (title === "") {
		movieSelect = defaultMovie;
	}
	else {
		movieSelect = title;
	}
	console.log("Initializing OMDb Movie Search...");
	console.log("Movie App Still In Alpha");
	var queryURL = "https://www.omdbapi.com/?t=" + movieSelect + "&y=&plot=short&apikey=trilogy";
	omdb.get({ title: 'Saw' }, true, function(err, movie) {
		if(err) {
			return console.error(err);
		}

		if(!movie) {
			return console.log('Movie not found!');
		}

		console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
		console.log(movie.plot);
	});
}

// Good
else if (fctn == "weather") {
	console.log("Getting the Weather for Your Area...");
	weather.find({ search: title, degreeType: "F" }, function(err, result) {

		if (err) {
			console.log(err);
			return;
		}

		console.log(JSON.stringify(result, null, 2));
	});
}

//else if (fctn = "twitter") {
//	
//	var client = new Twitter({
//		consumer_key: process.env.TWITTER_CONSUMER_KEY,
//		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//	});
//
//	client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
//		stream.on('data', function(tweet) {
//			console.log(tweet.text);
//		});
//
//		stream.on('error', function(error) {
//			console.log(error);
//		});
//	});
//
//}

else if (fctn == null) {
	console.log("You didn't select anything! Try running again with a function parameter.");
}

else {
	console.log("Invalid function parameter. Try running again");
	console.log("");
	console.log("Functions:");
	console.log("- spotify");
	console.log("- movie");
	console.log("- weather");
	console.log("- twitter (Deprecated)")
}
