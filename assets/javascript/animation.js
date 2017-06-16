// For highlight, add text and enlarge image when hovering

var logo = $("#headerLogo");

var leftImage = $("#leftImage");
var rightImage = $("#rightImage");
var movie = $("#movieText");
var event = $("#eventText");
var button = $("#perfectButton");
var buttonText = $(".textAbovePerfectButton");

var movieChoice = $(".movieChoice");

// On load for site
TweenMax.from(logo, 1.25, {ease: Back.easeOut.config(2), x: -1000});


// Image enlarge on hover
leftImage.hover(function() {
	// Increase scale
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255, 51,0.7)", repeat: -1, yoyo: true, ease: Linear.easeNone});
	TweenMax.fromTo(movie, 1, {autoAlpha: 0}, {x:-450, y:-800, scale: 1.2});
},
function() {// Back to normal
	TweenMax.to($(this), 0.15, {scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)"});
});

rightImage.hover(function() {
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255,51,0.7)",
	    repeat: -1, yoyo: true, ease: Linear.easeNone});
},
function() {// back to normal
	TweenMax.to($(this), 0.15, {scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)"});
});

// Click on left image - both images move off page
leftImage.click(function(){
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
	TweenMax.to(logo, 1.5, {x: -725, y: -290, scale:0.25});// Moves logo
	TweenMax.to([perfectButton, buttonText], 1, {autoAlpha: 0});// Removes button and text
});

// Click on right image - both images move off page
rightImage.click(function(){
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
	TweenMax.to(logo, 1.5, {x: -725, y: -290, scale:0.25});// Moves logo
	TweenMax.to([perfectButton, buttonText], 1, {autoAlpha: 0});// Removes button and text
});

// Movie choice animation
movieChoice.click(function() {
	TweenMax.to($(this), 2, {scale: 1.5});
});

/*

{textShadow:"2px 2px 15px white", color: "red"}

movieChoice.click(function() {
	TweenMax.from(restaurantDiv, 2, {//slide from offpage to onpage});
});
*/

//console.log(movieChoice);