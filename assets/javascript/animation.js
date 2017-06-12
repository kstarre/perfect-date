// For highlight, add text and enlarge image when hovering

// When clicking images
// Click on the left image - both images move off page
var leftImage = $("#leftImage");
var rightImage = $("#rightImage");

leftImage.click(function(){
	TweenMax.to(leftImage, 1, {x:"-1200px", ease:Linear.easeNone, force3D:true});
	TweenMax.to(rightImage, 1, {x:"1200px", ease:Linear.easeNone, force3D:true});
});

// Click on right image - both images move off page
rightImage.click(function(){
	TweenMax.to(leftImage, 1, {x:"-1200px", ease:Linear.easeNone, force3D:true});
	TweenMax.to(rightImage, 1, {x:"1200px", ease:Linear.easeNone, force3D:true});
});

