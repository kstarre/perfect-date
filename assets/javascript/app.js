// Katie Starrett - Initialize Firebase
var config = {
  apiKey: "AIzaSyDwcSHlUcGR-WkLGizclGzfFnnig98aBew",
  authDomain: "perfect-date-82efd.firebaseapp.com",
  databaseURL: "https://perfect-date-82efd.firebaseio.com",
  projectId: "perfect-date-82efd",
  storageBucket: "perfect-date-82efd.appspot.com",
  messagingSenderId: "942714245613"
};
firebase.initializeApp(config);

var database = firebase.database();
// my gracenote 6n4cata848e7z3fha7nkgb77
// nick's gracenote API zephc9snecc3dpg2eh66m4ng
 
var movieObject = []; 
// Gracenote API and OMDB API
$("#movie-click").on("click", function() {
	var date = moment().format("YYYY-MM-DD");
	var location = 44131;
	var gracenoteQueryURL = "http://data.tmsapi.com/v1.1/movies/showings" + "?startDate=" + date + "&zip=" + location + "&api_key=zephc9snecc3dpg2eh66m4ng";
	$.ajax({
		url: gracenoteQueryURL,
		method: "GET"
	}).done(function(gracenoteResponse) {
		movieObject = gracenoteResponse;
		console.log(movieObject);

		for (var i = 0; i < gracenoteResponse.length; i++) {
			var subsection = $("<div>");
			var title = $("<p>");
			subsection.addClass("movieChoice");
			subsection.attr("data-name", gracenoteResponse[i].title);
			title.html(gracenoteResponse[i].title);
			subsection.append(title);
			$("#movieEventHolder").append(subsection);
		};
	});
});

$(document).on("click", ".movieChoice", function() {
	for(var i = 0; i < movieObject.length; i++) {	
		if( $(this).attr("data-name") === movieObject[i].title) {

			var subsection = $("<div>");
			var title = $("<p>");
			var times = $("<p>");
			var goBack = $("<button>");
			goBack.html("Want a different movie?");
			goBack.attr("id", "goBackButton")
			title.html(movieObject[i].title);
			subsection.append(title);
			for (var j = 0; j < movieObject[i].showtimes.length; j++) {
				times.append(movieObject[i].showtimes[j].dateTime + " ");
			};
			subsection.append(times);
			subsection.append(goBack);
			$("#movieEventHolder").html(subsection);
			database.ref().push( {
				movie: movieObject[i].title
			});
		}
	};
});

$(document).on("click", "#goBackButton", function(event) {
	event.preventDefault();
	for(var i = 0; i < movieObject.length; i++) {
		var subsection = $("<div>");
		var title = $("<p>");
		subsection.addClass("movieChoice");
		subsection.attr("data-name", movieObject[i].title);
		title.html(movieObject[i].title);
		subsection.append(title);
		$("#movieEventHolder").html(subsection);
	};
});






// Event Brite API
/*$("#event-click").on("click", function() { 
	var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=WJ5ZSOV6TV56IC44E7EJ&location.address=Cleveland";

	  $.ajax({
	    url: queryURL,
	    method: "GET"

	  }).done(function (event) {
	    //full object
	    console.log(event);
	  });
});*/
