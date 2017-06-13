// Initialize Firebase
var config = {
  apiKey: "AIzaSyDwcSHlUcGR-WkLGizclGzfFnnig98aBew",
  authDomain: "perfect-date-82efd.firebaseapp.com",
  databaseURL: "https://perfect-date-82efd.firebaseio.com",
  projectId: "perfect-date-82efd",
  storageBucket: "perfect-date-82efd.appspot.com",
  messagingSenderId: "942714245613"
};
firebase.initializeApp(config);

var database = firebase.database

//when click on movie, go to fandango and pull movies
	// go to yelp and pull restaurants
//when click on events, go to eventbrite and pull events
	// go to yelp and pull restaurants

// ajax
$(window).on("load", function() {
	var queryURL = "http://data.tmsapi.com/v1.1/movies/showings" + "?startDate=2017-06-13&zip=44131" + "&api_key=6n4cata848e7z3fha7nkgb77";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		console.log(response[0].title);

		for (var i = 0; i < response.length; i++) {
			var subsection = $("<div>");
			var title = $("<p>");
			var times = $("<p>");
			title.html(response[i].title);
			for (var j = 0; j < response[i].showtimes.length; j++) {
				times.append(response[i].showtimes[j].dateTime + ", ");
			}
			title.append(times);
			subsection.append(title);
			$("#movieEventHolder").append(subsection);

		};
	})

});

