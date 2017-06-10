// For highlight and enlarge image when hovering

// When clicking images
// Click on the left image - both images move off page
$("#leftImage").click(function(){
	TweenMax.to($("#leftImage"), 1, {x:"-600px", ease:Linear.easeNone, force3D:true});
	TweenMax.to($("#rightImage"), 1, {x:"1200px", ease:Linear.easeNone, force3D:true});
});

// Click on right image - both images move off page
$("#rightImage").click(function(){
	TweenMax.to($("#leftImage"), 1, {x:"-600px", ease:Linear.easeNone, force3D:true});
	TweenMax.to($("#rightImage"), 1, {x:"1200px", ease:Linear.easeNone, force3D:true});
});

