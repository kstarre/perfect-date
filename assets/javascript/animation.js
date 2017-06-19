// For highlight, add text and enlarge image when hovering

var logo = $("#headerLogo");

var movieImage = $("#movieImage");
var eventImage = $("#eventImage");
var button = $("button");
var button = $("#perfectButton");
var buttonText = $(".textAbovePerfectButton");

var restaurantChoice = $(".restaurant");
var userChoice = $(".userChoice");
var restaurantDiv = $("#food");


// On load for site
TweenMax.from(logo, 1.25, {ease: Back.easeOut.config(2), x: -1000});


// Image enlarge on hover
movieImage.hover(function() {
	// Increase scale
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255, 51,0.7)", repeat: -1, yoyo: true, ease: Linear.easeNone});
	},
	function() {// Back to normal
		TweenMax.to($(this), 0.15, {scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)"});
});// End left hover

// Image enlarge on hover
eventImage.hover(function() {
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255,51,0.7)",
	    repeat: -1, yoyo: true, ease: Linear.easeNone});
	},
	function() {// back to normal
		TweenMax.to($(this), 0.15, {scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)"});
});// End right hover

// Click and move function
function click() {
	TweenMax.to(movieImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true, onComplete: hideOpeningPage, onStart: hideRestaurantDiv});
	TweenMax.to(eventImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
	TweenMax.to(logo, 1, {x: -725, y: -290, rotation: 360, scale:0.25});// Moves logo
	TweenMax.to([perfectButton, buttonText], 1, {autoAlpha: 0});// Removes button and text
};

// Hide opening page div onComplete
function hideOpeningPage() {
	$("#openingPage").hide();// hides opening page
	console.log(hideOpeningPage);
};

function hideRestaurantDiv() {
	$("#food").hide();
	console.log(hideRestaurantDiv);
};

// Click on left image - both images move off page
movieImage.click(click);

// Click on right image - both images move off page
eventImage.click(click);

// Click on button animation
button.click(click); 

// Movie hover
userChoice.hover(function(){
	TweenMax.to($(this), 1, {scale:1.2,});
	},
	function(){
		TweenMax.to($(this), 1, {scale:1});
});

function showRestaurantDiv() {
	$('#food').show();
	console.log(showRestaurantDiv);
};

//$(document).on("click", ".userChoice", function() {


userChoice.click(function(){
	TweenMax.from(restaurantDiv, 1.5, {onStart: showRestaurantDiv, autoAlpha: 0});
});

// Restaurant hover
restaurantChoice.hover(function(){
	TweenMax.to($(this), 1, {scale:1.2,});
	},
	function(){
		TweenMax.to($(this), 1, {scale:1});
});

