// For highlight, add text and enlarge image when hovering

var logo = $("#logo");

var leftImage = $("#leftImage");
var rightImage = $("#rightImage");
var movie = "Movies";
var event = "Events";

// On load for site
TweenMax.from(logo, 2, {ease: Back.easeIn.config(2), x: -500});


// Image enlarge on hover
leftImage.hover(function() {
	// Upscale
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(0,255,0,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(0,255,0,0.7)",
	    repeat: -1, yoyo: true, ease: Linear.easeNone});
},
function() {
	TweenMax.to($(this), 0.15, {scale: 1});
	// need to stop box shadow
});

rightImage.hover(function() {
	TweenMax.to($(this), 0.3, {scale: 1.1});
	// Box shadow
	TweenMax.fromTo($(this), 0.7, {boxShadow: "0px 0px 0px 0px rgba(0,255,0,0.3)"}, {boxShadow: "0px 0px 20px 10px rgba(0,255,0,0.7)",
	    repeat: -1, yoyo: true, ease: Linear.easeNone});
},
function() {
	TweenMax.to($(this), 0.15, {scale: 1});
	// need to stop box shadow
});

// Click on left image - both images move off page
leftImage.click(function(){
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
});

// Click on right image - both images move off page
rightImage.click(function(){
	TweenMax.to(leftImage, 1, {x:-1200, ease:Linear.easeNone, rotation: 360, force3D:true});
	TweenMax.to(rightImage, 1, {x:1200, ease:Linear.easeNone, rotation: -360, force3D:true});
});

