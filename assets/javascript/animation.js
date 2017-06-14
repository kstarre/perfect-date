// For highlight, add text and enlarge image when hovering

var logo = $("#headerLogo");

var leftImage = $("#leftImage");
var rightImage = $("#rightImage");
var movie = "Choose Movies";
var event = "Choose Events";

// On load for site
TweenMax.from(logo, 2, {ease: Back.easeOut.config(2), x: -1000});


// Image enlarge on hover
leftImage.hover(function() {
	// Increase scale
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(255,255,51,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(255,255, 51,0.7)", repeat: -1, yoyo: true, ease: Linear.easeNone});
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
	TweenMax.to(logo, 1.5, {x: -650, y: -200, scale:0.35});// Moves logo
});

// Click on right image - both images move off page
rightImage.click(function(){
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
	TweenMax.to(logo, 1.5, {x: -650, y: -200, scale:0.35});// Moves logo
});

