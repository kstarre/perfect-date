$(document).ready(function() {
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

	// KS gracenote API 6n4cata848e7z3fha7nkgb77
	// NS gracenote API zephc9snecc3dpg2eh66m4ng

	var movieObject; 

	// Gracenote API
	$("#test").on("click", function() {
		var date = moment().format("YYYY-MM-DD");
		var location = 44131;
		var apiKey = "zephc9snecc3dpg2eh66m4ng";
		var gracenoteQueryURL = "http://data.tmsapi.com/v1.1/movies/showings" + "?startDate=" + date + "&zip=" + location + "&api_key=" + apiKey;
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
				var title = $("<div>");
				var timeTable = $("<table>");
				var goBack = $("<button>");
				subsection.addClass("panel panel-default");
				title.addClass("panel heading");
				timeTable.addClass("table");
				goBack.html("Want a different movie?");
				goBack.attr("id", "goBackButton");
				title.html(movieObject[i].title);
				subsection.append(title);
				for (var j = 0; j < movieObject[i].showtimes.length; j++) {
					var tableRow = $("<tr>");
					var time = $("<td>");
					var theater = $("<td>");
					time.html(moment(movieObject[i].showtimes[j].dateTime).format("h:mm A"));
					theater.html(movieObject[i].showtimes[j].theatre.name);
					tableRow.append(time);
					tableRow.append(theater);
					timeTable.append(tableRow);
				};
				subsection.append(timeTable);
				$("#movieEventHolder").html(subsection);
				$("#movieEventHolder").append(goBack);
				database.ref('/movieList').push( {
					movie: movieObject[i].title
				});
			}
		};
	});

	$(document).on("click", "#goBackButton", function() {
		$("#movieEventHolder").empty();
		for(var i = 0; i < movieObject.length; i++) {
			var subsection = $("<div>");
			var title = $("<p>");
			subsection.addClass("movieChoice");
			subsection.attr("data-name", movieObject[i].title);
			title.html(movieObject[i].title);
			subsection.append(title);
			$("#movieEventHolder").append(subsection);
		};
	});




	// Event Brite API
	$("#rightImage").on("click", function() { 
		var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=WJ5ZSOV6TV56IC44E7EJ&location.address=Cleveland";

		  $.ajax({
		    url: queryURL,
		    method: "GET"

		  }).done(function (event) {
		    //full object
		    console.log(event);
		  });
	});
});