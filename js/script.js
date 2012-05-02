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

function getURLParameter(name, src) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(src)||[,""])[1].replace(/\+/g, '%20'))||null;
}

var History = window.History;

// Bind to StateChange Event
History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    History.log(State.data, State.title, State.url);
    var blogID = getURLParameter("blog", State.url);
    if (blogID) {

    }
});

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

	$(".imgWithHero").live("click", function(evt) {
	//	$("#content").toggleClass("rotate");
	//	$("#heroImg").attr("src", $(evt.currentTarget).attr("data-src"));
	});

	$("#heroImg").live("click", function(evt) {
		console.log("fbdhsjfbds");
	//	$("#content").toggleClass("rotate");
	});
	
	$("section header").click(function()
    {
		$(this).next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);

		// TODO - implement scrollTo
		//$(this).scrollTo($(this));
//       	$(this).siblings().css({backgroundImage:"url(lezzzft.png)"});
	});
	
	function subnavOver() {
		$($(this).parent().parent()).css({"width": "32%"});
		$($(this).parent().parent()).siblings().css({"width": "13%"});
	}
	
	function subnavOff() {
		
	}
	
	//$(".blogTitle").hoverIntent(subnavOver, subnavOff);
	
	// $(".title").live("mouseover", function(evt) {
	// 	$($(this).parent().parent()).css({"width": "32%"});
	// 	$($(this).parent().parent()).siblings().css({"width": "13%"});
	// 	$($(this).next().find("p")).css({"opacity": 1})
	// });

	$("#blogSlider").mouseout(function(evt) {
		// console.log(evt.target + this);
		// if(evt.target == this){
		// 	$(".sm li").css({"width": "17%"});
		// }
		
	});
	
	

	// $(".portfolioTitle").mouseover(function(evt) {
	// 	$($(this).parent().parent()).css({"width": "32%"});
	// 	$($(this).parent().parent()).siblings().css({"width": "13%"});
	// 	$($(this).next().find("p")).css({"opacity": 1})
	// });
	
	
	
	
	var blogNavTemplate = Handlebars.compile($("#blog-nav-template").html());
	var blogTemplate = Handlebars.compile($("#blog-template").html());
	var portfolioNavTemplate = Handlebars.compile($("#portfolio-nav-template").html());
	var portfolioTemplate = Handlebars.compile($("#portfolio-template").html());

	$.getJSON('http://blog.jeremyclewell.com/?json=get_recent_posts&date_format=m/d/y&post_type=blog_post&count=5&page=1&callback=?', function(data) {//http://blog.jeremyclewell.com/?json=get_recent_posts&date_format=m/d/y&post_type=blog_post&count=5&page=1&callback=?
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
	    		History.pushState(null, blogPosts[blogPageIndex * 5 + $(thisObj).index()].title, "?blog=" + blogPosts[blogPageIndex * 5 + $(thisObj).index()].id);
	    		//window.location.search = "blog=" + blogPosts[blogPageIndex * 5 + $(thisObj).index()].id;
	  		});
		});
		var blogID = getURLParameter("blog", location.search);
		if (blogID) {
	$("#blog header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
			$.getJSON("http://blog.jeremyclewell.com/?json=get_post&post_type=blog_post&post_id=" + blogID, function(data) {
				$("#blog .content article").html(blogTemplate(data["post"]));	
				$("#blog header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
			});
		} else {
			$("#blog .content article").html(blogTemplate(blogPosts[0]));	
		}
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
	    		History.pushState(null, portfolioEntries[portfolioIndex * 5 + $(thisObj).index()].title, "?portfolio=" + portfolioEntries[portfolioIndex * 5 + $(thisObj).index()].id);
	    		//window.location.search = "portfolio=" + portfolioEntries[portfolioIndex * 5 + $(thisObj).index()].id;
	  		});
		});

		var portfolioID = getURLParameter("portfolio", location.search);
		if (portfolioID) {
			$.getJSON("http://blog.jeremyclewell.com/?json=get_post&post_type=portfolio_entry&post_id=" + portfolioID, function(data) {
				$("#portfolio .content article").html(portfolioTemplate(data["post"]));	
				$("#portfolio header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
			});
		} else {
			$("#portfolio .content article").html(portfolioTemplate(portfolioEntries[0]));
		}

	//	$(".date").easydate();

	});

	$("#blogMobileNav li.prev").live("click", function(evt) {
			if (blogPageIndex > 0) {
				blogPageIndex--;
				$.getJSON("http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=blog_post&count=1&page=" + blogPageIndex + '&callback=?', function(data) {
					console.log(data);
					$("#blog .content article").html(blogTemplate(data["posts"][0]));	
				});
			}
		});

		$("#blogMobileNav li.next").live("click", function(evt) {
			if (blogPageIndex < blogTotal-1) {
				blogPageIndex++;
				$.getJSON("http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=blog_post&count=1&page=" + blogPageIndex + '&callback=?', function(data) {
					$("#blog .content article").html(blogTemplate(data["posts"][0]));	
				});
			}
		});

		$("#portfolioMobileNav li.prev").live("click", function(evt) {
			if (portfolioPageIndex > 0) {
				portfolioPageIndex--;
				$.getJSON("http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=portfolio_entry&count=1&page=" + portfolioPageIndex + '&callback=?', function(data) {
					$("#portfolio .content article").html(portfolioTemplate(data["posts"][0]));	
				});
			}
		});

		$("#portfolioMobileNav li.next").live("click", function(evt) {
			if (portfolioPageIndex < portfolioTotal - 1) {
				portfolioPageIndex++;
				$.getJSON("http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=portfolio_entry&count=1&page=" + portfolioPageIndex + '&callback=?', function(data) {
					$("#portfolio .content article").html(portfolioTemplate(data["posts"][0]));	
				});
			}
		});

	//$(document).ready(function(evt){
		$("#header header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
	//});
    

});