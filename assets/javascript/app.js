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
	// KS google places API AIzaSyBsKJtUzYMWM6ZpYy_eVpnfRbE4gWQY-d8

	var location = 44131;
	var latLong = {lat: 41.478044, lng: -81.684132};
	var movieObject; 
	var map;
	var infowindow;

	function initMap() {
	       map = new google.maps.Map(document.getElementById('mapHolder'), {
	         center: latLong,
	         zoom: 15
	       });

	       infowindow = new google.maps.InfoWindow();
	       var service = new google.maps.places.PlacesService(map);
	       service.nearbySearch({
	         location: latLong,
	         radius: 1000,
	         type: ['restaurant']
	       }, callback);
	}

	function callback(results, status) {
	    if (status === google.maps.places.PlacesServiceStatus.OK) {
	       	console.log(results);
	       	$("#food").html(results[i].name);
/*	       	for(var i = 0; i > 4; i++) {
	       		var subsection = $("<div>");
	       		var restaurantName = $("<p>");
	       		subsection.attr("id", "restaurantResult");
	       		restaurantName.html(results[i].name);
	       		subsection.html(restaurantName);
	       		$("#food").append(subsection);*/
	       	};
	    }
	}

	$(window).load(initMap());
	
	// Gracenote API
	$("#movieImage").on("click", function() {
		var date = moment().format("YYYY-MM-DD");
		var apiKey = "6n4cata848e7z3fha7nkgb77";
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
				subsection.addClass("userChoice");
				subsection.attr("data-name", gracenoteResponse[i].title);
				title.html(gracenoteResponse[i].title);
				subsection.append(title);
				$("#movieEventHolder").append(subsection);
			};
		});
	});

	$(document).on("click", ".userChoice", function() {
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
};