$(document).ready(function() {
	// KS - Initialize Firebase
	var config = {
	  apiKey: "AIzaSyDwcSHlUcGR-WkLGizclGzfFnnig98aBew",
	  authDomain: "perfect-date-82efd.firebaseapp.com",
	  databaseURL: "https://perfect-date-82efd.firebaseio.com",
	  projectId: "perfect-date-82efd",
	  storageBucket: "perfect-date-82efd.appspot.com",
	  messagingSenderId: "942714245613"
	};
	firebase.initializeApp(config);

	// KS gracenote API 6n4cata848e7z3fha7nkgb77
	// NS gracenote API zephc9snecc3dpg2eh66m4ng
	// NM gracenote API mwe8tdv7qxnfckf89bjmeyab
	// KS google places API AIzaSyBsKJtUzYMWM6ZpYy_eVpnfRbE4gWQY-d8

	var movieChosen;
	var database = firebase.database();
	var location = 44131;
	var mapCenter;
	// = {lat: 41.478044, lng: -81.684132};
	var movieObject;
	var restaurantObject;
	var eventObject;
	var map;
	var service;
	var infowindow;
	var marker;




	function initMap() {
		mapCenter = new google.maps.LatLng(41.478044,-81.684132);
		map = new google.maps.Map(document.getElementById("mapHolder"), {
			center: mapCenter,
			zoom: 15
		});
		var request = {
			location: mapCenter,
			radius: '1000',
			type: ['restaurant']
		};

	    service = new google.maps.places.PlacesService(map);
	    service.nearbySearch(request, callback);

		//geolocation to capture position
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
<<<<<<< HEAD
				var posLat = position.coords.latitude;
				var	posLng = position.coords.longitude;
				console.log(posLat);
				console.log(posLng);
				//reverse geocoding to obtain zip code
				var zipCodeURL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + posLat + "," + posLng + "&sensor=true";
			  console.log(zipCodeURL);
				$.ajax({
					url: zipCodeURL,
					method: "GET"
				}).done(function(zipCodeResponse) {
					zipCodeObject = zipCodeResponse;
					console.log(zipCodeObject.results["0"].address_components[7].long_name);
					mapCenter = new google.maps.LatLng(posLat,posLng);
					map = new google.maps.Map(document.getElementById("mapHolder"), {
						center: mapCenter,
						zoom: 15
					});
				});
=======
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				console.log(pos);
>>>>>>> bf1cf12a545053364e511fc5f5fcdebce2ab5926

			}, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
	};

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
													'Error: The Geolocation service failed.' :
													'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(map);
	};

	function callback(results, status) {
	    if (status === google.maps.places.PlacesServiceStatus.OK) {
	       	console.log(results);
	       	restaurantObject = results;
	       	for (var i = 0; i < 4; i++) {
	       		var subsection = $("<div>");
	       		var restaurantName = $("<p>");
	       		var restaurantPrice = $("<p>");
	       		var restaurantRating = $("<p>");
	       		subsection.attr("id", "restaurantResult");
	       		subsection.addClass("restaurant");
	       		subsection.attr("data-name", results[i].name);
	       		restaurantName.html(results[i].name);
	       		restaurantPrice.html("Price Level: " + results[i].price_level + " out of 4");
	       		restaurantRating.html("Rating: " + results[i].rating + " / 5.0");
	       		subsection.append(restaurantName);
	       		subsection.append(restaurantPrice);
	       		subsection.append(restaurantRating);
	       		$("#restaurantList").append(subsection);
	       	};
	    };
	};

	initMap();

	// Gracenote API for movies near a certain zipcode, for today...
	$("#movieImage").on("click", function() {
		var movieChosen = true;
		var date = moment().format("YYYY-MM-DD");
		var apiKey = "zephc9snecc3dpg2eh66m4ng";
		var gracenoteQueryURL = "http://data.tmsapi.com/v1.1/movies/showings" + "?startDate=" + date + "&zip=" + location + "&api_key=" + apiKey;
		$.ajax({
			url: gracenoteQueryURL,
			method: "GET"
		}).done(function(gracenoteResponse) {
			movieObject = gracenoteResponse;
			//console.log(movieObject);

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

	// Renders list of movies or  and data persistance for movies/ events...
	$(document).on("click", ".userChoice", function() {
		if (movieChosen) {
			for (var i = 0; i < movieObject.length; i++) {
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
		}
		else {
			for (var prop in eventObject.events) {
				if( $(this).attr("data-name") === eventObject.events[prop].name.html) {
					var subsection = $("<div>");
					var title = $("<div>");
					var description = $("<div>");
					var goBack = $("<button>");
					goBack.html("Want a different event?");
					goBack.attr("id", "goBackButton");
					title.html(eventObject.events[prop].name.html);
					description.html(eventObject.events[prop].description.html);
					subsection.append(title);
					subsection.append(description);
					$("#movieEventHolder").html(subsection);
					$("#movieEventHolder").append(goBack);
					database.ref('/eventList').push( {
						event: eventObject.events[prop].name.html
					});
				};
<<<<<<< HEAD
=======
			}
		}
	});

	// Allows user to return to movie list...
	$(document).on("click", "#goBackButton", function() {
		if (movieChosen) {
			$("#movieEventHolder").empty();
			for(var i = 0; i < movieObject.length; i++) {
				var subsection = $("<div>");
				var title = $("<p>");
				subsection.addClass("userChoice");
				subsection.attr("data-name", movieObject[i].title);
				title.html(movieObject[i].title);
				subsection.append(title);
				$("#movieEventHolder").append(subsection);
			};
		}
		else {
			$("#movieEventHolder").empty();
			var display = $("<div>");
			display.html("Displaying events in " + eventObject.location.augmented_location.city + ", " + eventObject.location.augmented_location.region);
			$("#movieEventHolder").html(display);
			for (var prop in eventObject.events) {
				//console.log( eventObject.events[prop].name.html );
				var subsection = $("<div>");
				var title = $("<div>");
				subsection.addClass("userChoice");
				subsection.attr("data-name", eventObject.events[prop].name.html);
				title.html(eventObject.events[prop].name.html);
				subsection.html(title);
				$("#movieEventHolder").append(subsection);
>>>>>>> bf1cf12a545053364e511fc5f5fcdebce2ab5926
			}
		}
	});

<<<<<<< HEAD
	// Allows user to return to movie list...
	$(document).on("click", "#goBackButton", function() {
		$("#movieEventHolder").empty();
		for(var i = 0; i < movieObject.length; i++) {
			var subsection = $("<div>");
			var title = $("<p>");
			subsection.addClass("userChoice");
			subsection.attr("data-name", movieObject[i].title);
			title.html(movieObject[i].title);
			subsection.append(title);
			$("#movieEventHolder").append(subsection);
		};
=======
	// Restaurant data persistance on click...
	$(document).on("click", ".restaurant", function() {
		for (var i = 0; i < restaurantObject.length; i++) {
			if ( $(this).attr("data-name") === restaurantObject[i].name) {
				var subsection = $("<div>");
	       		var restaurantName = $("<p>");
	       		var restaurantPrice = $("<p>");
	       		var restaurantRating = $("<p>");
	       		subsection.attr("id", "restaurantResult");
	       		subsection.addClass("restaurant");
	       		restaurantName.html(restaurantObject[i].name);
	       		restaurantPrice.html("Price Level: " + restaurantObject[i].price_level + " out of 4");
	       		restaurantRating.html("Rating: " + restaurantObject[i].rating + " / 5.0");
	       		subsection.append(restaurantName);
	       		subsection.append(restaurantPrice);
	       		subsection.append(restaurantRating);
	       		$("#restaurantList").html(subsection);
	       		database.ref('/restaurantList').push( {
	       			restaurant: restaurantObject[i].name,
	       			location: restaurantObject[i].vicinity
	       		});
			}
		}
>>>>>>> bf1cf12a545053364e511fc5f5fcdebce2ab5926
	});

	// Restaurant data persistance on click...
	$(document).on("click", ".restaurant", function() {
		for (var i = 0; i < restaurantObject.length; i++) {
			if ( $(this).attr("data-name") === restaurantObject[i].name) {
				var subsection = $("<div>");
	       		var restaurantName = $("<p>");
	       		var restaurantPrice = $("<p>");
	       		var restaurantRating = $("<p>");
	       		subsection.attr("id", "restaurantResult");
	       		subsection.addClass("restaurant");
	       		restaurantName.html(restaurantObject[i].name);
	       		restaurantPrice.html("Price Level: " + restaurantObject[i].price_level + " out of 4");
	       		restaurantRating.html("Rating: " + restaurantObject[i].rating + " / 5.0");
	       		subsection.append(restaurantName);
	       		subsection.append(restaurantPrice);
	       		subsection.append(restaurantRating);
	       		$("#restaurantList").html(subsection);
	       		database.ref('/restaurantList').push( {
	       			restaurant: restaurantObject[i].name,
	       			location: restaurantObject[i].vicinity
	       		});
			}
		}
	});

	// Event Brite API
	// Initial load of data when clicking event panel
	$("#eventImage").on("click", function() {
    	//var date = "&date_modified.keyword=this_week";
<<<<<<< HEAD

=======
>>>>>>> bf1cf12a545053364e511fc5f5fcdebce2ab5926
    	var movieChosen = false;
    	var apiKey = "&token=WJ5ZSOV6TV56IC44E7EJ";
    	var location = "?location.address=44144";
    	var eventBriteQueryURL = "https://www.eventbriteapi.com/v3/events/search/" + location + apiKey;
			console.log(eventBriteQueryURL);
    	$.ajax({
    		url: eventBriteQueryURL,
    		method: "GET"
    	}).done(function(eventBriteResponse) {
    		eventObject = eventBriteResponse;
    		console.log(eventObject);
    		var display = $("<div>");
    		display.html("Displaying events in " + eventObject.location.augmented_location.city + ", " + eventObject.location.augmented_location.region);
    		$("#movieEventHolder").html(display);
    		for (var prop in eventObject.events) {
    			//console.log( eventObject.events[prop].name.html );
    			var subsection = $("<div>");
    			var title = $("<div>");
    			subsection.addClass("userChoice");
    			subsection.attr("data-name", eventObject.events[prop].name.html);
    			title.html(eventObject.events[prop].name.html);
    			subsection.html(title);
    			$("#movieEventHolder").append(subsection);
    		}
		});
	});
	//location query function
	$('#zipCode').click(function(){
	    var zipCode = $('#enteredZipCode').val();
	    console.log(zipCode);
		//var enteredName = document.getElementById('enteredFormName').value.replace(' ', '+');
	    if (zipCode.length != 5) {
	    	$('#movieEventHolder').html("Invalid zip code");
	    }
	    else {
	    	var display = $("<div>");
	    	display.html("Displaying events around " + eventObject.location.augmented_location.city + ", " + eventObject.location.augmented_location.region);
		    $("#movieEventHolder").html(display);
		    //Ajax Request
		    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=WJ5ZSOV6TV56IC44E7EJ&location.address=" + zipCode;
		    $.ajax({
		    	url: queryURL,
		    	method: "GET"
		    }).done(function (event) {
		    	for (var prop in eventObject.events) {
		    		//console.log( eventObject.events[prop].name.html );
		    		var subsection = $("<div>");
		    		var title = $("<div>");
		    		subsection.addClass("userChoice");
		    		subsection.attr("data-name", eventObject.events[prop].name.html);
		    		title.html(eventObject.events[prop].name.html);
		    		subsection.html(title);
		    		$("#movieEventHolder").append(subsection);
		    	}
		    });
		};
	//closing if/else statement
	});

});
