// For highlight, add text and enlarge image when hovering

var logo = $("#headerLogo");

var leftImage = $("#leftImage");
var rightImage = $("#rightImage");
var button = $("button");
var button = $("#perfectButton");
var buttonText = $(".textAbovePerfectButton");

//var movieChoice = $(".movieChoice");
var restaurant = $(".restaurant");


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
restaurant.hover(function() {
	// Increase scale
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255, 51,0.7)", repeat: -1, yoyo: true, ease: Linear.easeNone});
	},
	function() {// Back to normal
		TweenMax.to($(this), 0.15, {scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)"});
});// End left hover

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
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true, onComplete: hideOpeningPage});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
	TweenMax.to(logo, 1.5, {x: -725, y: -290, rotation: 360, scale:0.25});// Moves logo
	TweenMax.to([perfectButton, buttonText], 1, {autoAlpha: 0});// Removes button and text
};

//hide opening page div onComplete
function hideOpeningPage() {
	$("#openingPage").hide();// hides opening page
	console.log(hideOpeningPage);
}

// Click on left image - both images move off page
leftImage.click(click);

// Click on right image - both images move off page
rightImage.click(click);

// Click on button animation
button.click(click); 

$(document).on("mouseenter", ".restaurant", function(){
	TweenMax.to(restaurant, 1.5, {rotation: 100});
});

// Restaurant
/*restaurant.hover(function(){
	TweenMax.to(restaurant, 1.5, {rotation: 100});
});*/

// Movie choice animation
/*$(".movieChoice1").click(function(){
	TweenMax.to($(".movieChoice"), 1, {rotation: 90});
});*/


/*movieChoice.click(function(){
	TweenMax.to($(this), 1, {scale: 1.5});
});*/

/*

{textShadow:"2px 2px 15px white", color: "red"}

movieChoice.click(function() {
	TweenMax.from(restaurantDiv, 2, {//slide from offpage to onpage});
});
*/
