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

	var database = firebase.database();
	var location = 44131;
	var latLng;
	// = {lat: 41.478044, lng: -81.684132};
	var movieObject;
	var map;
	var service;
	var infowindow;
	var marker;

	function initMap() {
		latLng = new google.maps.LatLng(41.478044,-81.684132);
		map = new google.maps.Map(document.getElementById("mapHolder"), {
			center: latLng,
			zoom: 15
		});
		var request = {
			location: latLng,
			radius: '1000',
			type: ['restaurant']
		};

	    service = new google.maps.places.PlacesService(map);
	    service.nearbySearch(request, callback);

			//geolocation to capture position
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					console.log(pos);

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
	}

	function callback(results, status) {
	    if (status === google.maps.places.PlacesServiceStatus.OK) {
	       	console.log(results);
	       	for (var i = 0; i < 4; i++) {
	       		var subsection = $("<div>");
	       		var restaurantName = $("<p>");
	       		var restaurantPrice = $("<p>");
	       		var restaurantRating = $("<p>");
	       		subsection.attr("id", "restaurantResult");
	       		subsection.addClass("restaurant");
	       		restaurantName.html(results[i].name);
	       		restaurantPrice.html("Price Level: " + results[i].price_level + " out of 4");
	       		restaurantRating.html("Rating: " + results[i].rating + " / 5.0");
	       		subsection.append(restaurantName);
	       		subsection.append(restaurantPrice);
	       		subsection.append(restaurantRating);
	       		$("#restaurantList").append(subsection);
	       	};
		}
	};

	initMap();

	// Gracenote API
	$("#movieImage").on("click", function() {
		var date = moment().format("YYYY-MM-DD");
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
			subsection.addClass("userChoice");
			subsection.attr("data-name", movieObject[i].title);
			title.html(movieObject[i].title);
			subsection.append(title);
			$("#movieEventHolder").append(subsection);
		};
	});

	// Event Brite API
	// Initial load of data when clicking event panel
	$("#eventImage").on("click", function() {
    	//var date = "&date_modified.keyword=this_week";
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

    		var content = "<div>Displaying events around " + eventObject.location.augmented_location.city + ", " + eventObject.location.augmented_location.region + "</div><br>" + "<br><div class='userChoice' >" + eventObject.events[0].name.html + "</div><br><br>" + "<div class='userChoice'>" + eventObject.events[1].name.html + "</div><br><br>" + "<div class='userChoice'>" + eventObject.events[2].name.html + "</div><br><br>";
    		$("#movieEventHolder").html(content);
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
	    	$('#movieEventHolder').val("Displaying events around " + zipCode);
		    //Ajax Request
		    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=WJ5ZSOV6TV56IC44E7EJ&location.address=" + zipCode;

		    $.ajax({
		    	url: queryURL,
		    	method: "GET"
		    }).done(function (event) {
		    	//full object
		    	//console.log(event);
		    	//console.log(event.events[0].logo.url);
		    	//console.log (event.location.address);
		    	var content = "<div>Displaying events around " + event.location.augmented_location.city + ", " + event.location.augmented_location.region + "</div><br>" + "<br><div class='userChoice' >" + event.events[0].name.html + "</div><br><br>" + "<div class='userChoice'>" + event.events[1].name.html + "</div><br><br>" + "<div class='userChoice'>" + event.events[2].name.html + "</div><br><br>" + "<div class='userChoice'>" + event.events[3].name.html + "</div><br><br>";
		    	$("#movieEventHolder").html(content);
		    });
		};
	//closing if/else statement
	});
});
