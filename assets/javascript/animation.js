// For highlight, add text and enlarge image when hovering

var logo = $("#headerLogo");

var leftImage = $("#leftImage");
var rightImage = $("#rightImage");
var button = $("button");
var button = $("#perfectButton");
var buttonText = $(".textAbovePerfectButton");

var restaurantChoice = $(".restaurant");
var movieChoice = $(".movieChoice");
var restaurantDiv = $("#food");


// On load for site
TweenMax.from(logo, 1.25, {ease: Back.easeOut.config(2), x: -1000});


// Image enlarge on hover
leftImage.hover(function() {
	// Increase scale
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255, 51,0.7)", repeat: -1, yoyo: true, ease: Linear.easeNone});
	},
	function() {// Back to normal
		TweenMax.to($(this), 0.15, {scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)"});
});// End left hover

// Image enlarge on hover
rightImage.hover(function() {
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
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true, onComplete: hideOpeningPage, onStart: hideRestaurantDiv});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
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
leftImage.click(click);

// Click on right image - both images move off page
rightImage.click(click);

// Click on button animation
button.click(click); 

// Movie hover
movieChoice.hover(function(){
	TweenMax.to($(this), 1, {scale:1.2,});
	},
	function(){
		TweenMax.to($(this), 1, {scale:1});
});

function showRestaurantDiv() {
	$('#food').show();
	console.log(showRestaurantDiv);
};

movieChoice.click(function(){
	TweenMax.from(restaurantDiv, 1.5, {autoAlpha: 0, onStart: showRestaurantDiv});
});

// Restaurant hover
restaurantChoice.hover(function(){
	TweenMax.to($(this), 1, {scale:1.2,});
	},
	function(){
		TweenMax.to($(this), 1, {scale:1});
});

