/* Author:

*/

var blogPosts = [];
var portfolioEntries = [];
var blogPageIndex = 0;
var blogCount = 5;
var blogTotal = 15;
var portfolioIndex = 0;
var portfolioCount = 5;
var portfolioTotal = 15;

$(document).ready(function(){

	
	// Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
	if ($.fn.mobileMenu) {
		$('ol#id').mobileMenu({
			switchWidth: 768,                   // width (in px to switch at)
			topOptionText: 'Choose a page',     // first option text
			indentString: '&nbsp;&nbsp;&nbsp;'  // string for indenting nested items
		});
	}

	// Run Mathias Bynens jQuery placeholder plugin (see plugins.js)
	if ($.fn.placeholder) {
		$('input, textarea').placeholder();		
	}
	
	$("section header").click(function()
    {
		$(this).next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
//       	$(this).siblings().css({backgroundImage:"url(lezzzft.png)"});
	});
	
	function subnavOver() {
		$($(this).parent().parent()).css({"width": "32%"});
		$($(this).parent().parent()).siblings().css({"width": "13%"});
	}
	
	function subnavOff() {
		
	}
	
	//$(".blogTitle").hoverIntent(subnavOver, subnavOff);
	
	$(".title").live("mouseover", function(evt) {
		$($(this).parent().parent()).css({"width": "32%"});
		$($(this).parent().parent()).siblings().css({"width": "13%"});
		$($(this).next().find("p")).css({"opacity": 1})
	});

	$("#blogSlider").mouseout(function(evt) {
		// console.log(evt.target + this);
		// if(evt.target == this){
		// 	$(".sm li").css({"width": "17%"});
		// }
		
	});
	
	

	$(".portfolioTitle").mouseover(function(evt) {
		$($(this).parent().parent()).css({"width": "32%"});
		$($(this).parent().parent()).siblings().css({"width": "13%"});
		$($(this).next().find("p")).css({"opacity": 1})
	});
	
	
	
	
	var blogNavTemplate = Handlebars.compile($("#blog-nav-template").html());
	var blogTemplate = Handlebars.compile($("#blog-template").html());
	var portfolioNavTemplate = Handlebars.compile($("#portfolio-nav-template").html());
	var portfolioTemplate = Handlebars.compile($("#portfolio-template").html());

	$.getJSON('page1.json', function(data) {//http://blog.jeremyclewell.com/?json=get_recent_posts&date_format=m/d/y&post_type=blog_post&count=5&page=1&callback=?
		var tempStructure = "";
		for (var i = 0; i < data.pages; i++) {
			tempStructure += "<li><ul class='sm'><div style='width: 100%'>";
			for (var j = 0; j < data.count; j++) {
				if ((j + ((i)*data.count)) < data.count_total) {
					tempStructure += "<li><div><img class='preloader' src='img/h/preloader_blog.gif'/></div></li>";
				}
			}
			tempStructure += "</div></ul></li>";
		}
		$("#blogSlider").html(tempStructure);
		$.each(data.posts, function(key, val) {
			$($("#blogSlider .sm")[blogPageIndex]).html(blogNavTemplate(data));
			blogPosts[key] = data.posts[key];
		});
		$('#blogSlider').anythingSlider({
			  buildArrows         : true,      // If true, builds the forwards and backwards buttons
			  buildNavigation     : false,      // If true, builds a list of anchor links to link to each panel
			  buildStartStop      : false,      // If true, builds the start/stop button
			  enableKeyboard      : false,      // if false, keyboard arrow keys will not work for this slider.
			  hashTags            : false,      // Should links change the hashtag in the URL?
			  infiniteSlides      : false,      // if false, the slider will not wrap & not clone any panels
			  stopAtEnd           : true,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
			  onSlideComplete     : function(slider) {
				blogPageIndex = slider.currentPage;
			  	if (blogPosts[blogPageIndex * 5] != undefined) return;
			  	var request = 'http://blog.jeremyclewell.com/?json=get_recent_posts&date_format=m/d/y&post_type=blog_post&count=5&page=' + slider.currentPage + '&callback=?';
			  	$.getJSON(request, function(data) {
			  		blogPageIndex = slider.currentPage;
					$.each(data.posts, function(key, val) {
						$($("#blogSlider .sm")[blogPageIndex-1]).html(blogNavTemplate(data));
						blogPosts[blogPageIndex * 5 + key] = data.posts[key];
					});
				});
			  } 
		});

		$("#blogSlider .sm li").live("click",  function(evt) {
			var thisObj = this;
			$("#blog .content article").animate({opacity: 0}, 200, function() {
	    		$("#blog .content article").html(blogTemplate(blogPosts[blogPageIndex * 5 + $(thisObj).index()]));
	    		$("#blog .content article").animate({opacity: 1}, 200);
	  		});
		});

		$("#blog .content article").html(blogTemplate(blogPosts[0]));

	});

	$.getJSON('http://blog.jeremyclewell.com/?json=get_recent_posts&date_format=m/d/y&post_type=portfolio_entry&count=5&page=1&callback=?', function(data) {
		var tempStructure = "";
		for (var i = 0; i < data.pages; i++) {
			tempStructure += "<li><ul class='sm'><div style='width: 100%'>";
			for (var j = 0; j < data.count; j++) {
				if ((j + ((i)*data.count)) < data.count_total) {
					tempStructure += "<li><div><img class='preloader' src='img/h/preloader_portfolio.gif'/></div></li>";
				}
			}
			tempStructure += "</div></ul></li>";		
		}
		$("#portfolioSlider").html(tempStructure);
		$.each(data.posts, function(key, val) {
			$($("#portfolioSlider .sm")[portfolioIndex]).html(portfolioNavTemplate(data));
			portfolioEntries[key] = data.posts[key];
		});
		$('#portfolioSlider').anythingSlider({
			  buildArrows         : true,      // If true, builds the forwards and backwards buttons
			  buildNavigation     : false,      // If true, builds a list of anchor links to link to each panel
			  buildStartStop      : false,      // If true, builds the start/stop button
			  enableKeyboard      : false,      // if false, keyboard arrow keys will not work for this slider.
			  hashTags            : false,      // Should links change the hashtag in the URL?
			  infiniteSlides      : false,      // if false, the slider will not wrap & not clone any panels
			  stopAtEnd           : true,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
			  onSlideComplete     : function(slider) {
				portfolioIndex = slider.currentPage;
				console.log("ola!");//portfolioEntries[portfolioIndex]);
			  	if (portfolioEntries[portfolioIndex * 5] != undefined) return;
			  	var request = 'http://blog.jeremyclewell.com/?json=get_recent_posts&date_format=m/d/y&post_type=portfolio_entry&count=5&page=' + slider.currentPage + '&callback=?';
			  	$.getJSON(request, function(data) {
			  		console.log(data);
					$.each(data.posts, function(key, val) {
						$($("#portfolioSlider .sm")[portfolioIndex-1]).html(portfolioNavTemplate(data));
						portfolioEntries[portfolioIndex * 5 + key] = data.posts[key];
					});
				});
			  } 
		});

		$("#portfolioSlider .sm li").live("click",  function(evt) {
			var thisObj = this;
			$("#portfolio .content article").animate({opacity: 0}, 200, function() {
	    		$("#portfolio .content article").html(portfolioTemplate(portfolioEntries[portfolioIndex * 5 + $(thisObj).index()]));
	    		$("#portfolio .content article").animate({opacity: 1}, 200);
	  		});
		});

		$("#portfolio .content article").html(portfolioTemplate(portfolioEntries[0]));

	});

	//$(document).ready(function(evt){
		$("#header header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
	//});
    

});




