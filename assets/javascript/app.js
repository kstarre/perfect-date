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





var database = firebase.database

// Gracenote API and OMDB API
$(window).on("load", function() {

	var queryURL = "http://data.tmsapi.com/v1.1/movies/showings" + "?startDate=2017-06-13&zip=44131" + "&api_key=zephc9snecc3dpg2eh66m4ng";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {


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
	});

});
//Google Maps API


var map;
var marker;


function initialize() {

	var mapOptions = {
		center: new google.maps.LatLng(40.680898,-8.684059),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("mapHolder"), mapOptions);

}

google.maps.event.addDomListener(window, 'load', initialize);


function searchAddress() {

	var addressInput = $('#enteredZipCode').val();
  
	//this is what the variable to pass will be
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;

      createMarker(myResult);

      map.setCenter(myResult);

      map.setZoom(17);

		}
	});

}

function createMarker(latlng) {

  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker = '';
  }

  marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
}















// Event Brite API
$(document).ready(function(){
  $('#zipCode').click(function(){
     var zipCode = $('#enteredZipCode').val();
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
       var content =
       "<div id='#movieEventHolder' class='userChoice'>Displaying events around " + event.location.augmented_location.city + ", " + event.location.augmented_location.region + "<div><br>" +
       "<br><div id='#movieEventHolder' class='userChoice' >" + event.events[0].name.html + "</div><br><br>" +
       "<div id='#movieEventHolder' class='userChoice'>" + event.events[1].name.html + "</div><br><br>" +
       "<div id='#movieEventHolder' class='userChoice'>" + event.events[2].name.html + "</div><br><br>" +
       "<div id='#movieEventHolder' class='userChoice'>" + event.events[3].name.html + "</div><br><br>"
       ;
       $("#movieEventHolder").html(content);

     });

}
//closing if/else statement



	    });
    });
