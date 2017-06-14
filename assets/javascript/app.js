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

//Event Brite API


<script>

var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=WJ5ZSOV6TV56IC44E7EJ&location.address=Cleveland";

  $.ajax({
    url: queryURL,
    method: "GET"

  }).done(function (event) {
    //full object
    console.log(event);

  });
