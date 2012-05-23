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
var state = "header";

function getURLParameter(name, src) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(src)||[,""])[1].replace(/\+/g, '%20'))||null;
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

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
		$("#blogNav").css("display", "none");
		$("#portfolioNav").css("display", "none");	
		$(".headerTools").css("display", "none");	

	
	function scroll() {
				blogMenu = new iScroll('blogNav', { hideScrollbar: false});
				portfolioMenu = new iScroll('portfolioNav', { hideScrollbar: false});
	}
	var timeout = setTimeout(scroll, 200);
	
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
	//	$("#content").toggleClass("rotate");
	});
	
	$("section>header").click(function(evt) {
		blogMenu.refresh();
		portfolioMenu.refresh();
		var thisObj = this;
		if ($(evt.target).hasClass("menuButton")) {
			if (this.parentNode["id"] == "blog") {
				if ($("#blogNav").css("display") == "block") {
					$("#blogNav").fadeOut("fast");
					return;
				} else {
					$("#blogNav").fadeIn("fast");
					return;
				}
			} else if (this.parentNode["id"] == "portfolio") {
				if ($("#portfolioNav").css("display") == "block") {
					$("#portfolioNav").fadeOut("fast");
					return;
				} else {
					$("#portfolioNav").fadeIn("fast");
					return;
				}
			}
		}

		if ($(evt.target).hasClass("searchButton")) {
			if (this.parentNode["id"] == "blog") {
				if ($("#blogNav").css("display") == "block") {
					$("#blogNav").fadeOut("fast");
					return;
				} else {
					$("#blogNav").fadeIn("fast");
					return;
				}
			} else if (this.parentNode["id"] == "portfolio") {
				if ($("#portfolioNav").css("display") == "block") {
					$("#portfolioNav").fadeOut("fast");
					return;
				} else {
					$("#portfolioNav").fadeIn("fast");
					return;
				}
			}
		}
		
		state = (state == this.parentNode["id"]) ? "none" : this.parentNode["id"];
		
		//console.log(state);
		if (state == "blog") {
			$("#blog header div.headerTools").fadeIn("fast");
			$("#portfolio header div.headerTools").fadeOut("fast");
		} else if (state == "portfolio") {
			$("#portfolio header div.headerTools").fadeIn("fast");			
			$("#blog header div.headerTools").fadeOut("fast");
		} else {
			$("#blog header div.headerTools").fadeOut("fast");
			$("#portfolio header div.headerTools").fadeOut("fast");
		}

//		if (evt.target != this) return false;

		
		if ($("#blogNav").css("display") == "block") {
			$("#blogNav").fadeOut("_default", function () {
				$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
			});
		} else if ($("#portfolioNav").css("display") == "block") {
			$("#portfolioNav").fadeOut("_default", function () {
				$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
			});
		} else {
			$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
		}

		blogMenu.refresh();
		
		

		// TODO - implement scrollTo
		//$(this).scrollTo($(this));
//       	$(this).siblings().css({backgroundImage:"url(lezzzft.png)"});
	});

	$("section div.content").live("click", function(evt) {
		$("#blogNav").fadeOut("_default");
		$("#portfolioNav").fadeOut("_default");
	});
	
	var blogNavTemplate = Handlebars.compile($("#blog-nav-template").html());
	var blogTemplate = Handlebars.compile($("#blog-template").html());
	var portfolioNavTemplate = Handlebars.compile($("#portfolio-nav-template").html());
	var portfolioTemplate = Handlebars.compile($("#portfolio-template").html());

	$.getJSON('http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=blog_post&include=date,title,id,tags&count=100&date_format=m/d/y&callback=?', function(data) {

		$("#blogNav ul").html(blogNavTemplate(data));

	 	
		$("#blogNav li").live("click", function(evt) {

			if ($(evt.target).hasClass("tag")) return false;
			var request = 'http://blog.jeremyclewell.com/?json=get_post&post_type=blog_post&date_format=m/d/y&post_id=' + $($(this).find("a")).attr("data-postId") + '&callback=?';
				$("#blog .content article").animate({opacity: 0}, 200, function() {
					$("#blog .content article").html("<p>Loading...</p>");
					$("#blog .content article").animate({opacity: 1}, 200, function() {
						$.getJSON(request, function(data) {
							$("#blog .content article").animate({opacity: 0}, 200, function() {
								$("#blog .content article").html(blogTemplate(data["post"]));	
								$("#blog .content article").animate({opacity: 1}, 200);
//	    		History.pushState(null, blogPosts[blogPageIndex * 5 + $(thisObj).index()].title, "?blog=" + blogPosts[blogPageIndex * 5 + $(thisObj).index()].id);
							});
						});
					});
				});
			
		});

		var blogID = getURLParameter("blog", location.search);
		// if (blogID) {
		// $("#blog header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
		// 		$.getJSON("http://blog.jeremyclewell.com/?json=get_post&post_type=blog_post&post_id=" + blogID, function(data) {
		// 			$("#blog .content article").html(blogTemplate(data["post"]));	
		// 			$("#blog header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
		// 		});
		// 	} else {
		// 		$("#blog .content article").html(blogTemplate(blogPosts[0]));	
		// 	}
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
		

		var portfolioID = getURLParameter("portfolio", location.search);
		if (portfolioID) {
			$.getJSON("http://blog.jeremyclewell.com/?json=get_post&post_type=portfolio_entry&post_id=" + portfolioID, function(data) {
				$("#portfolio .content article").html(portfolioTemplate(data["post"]));	
				$("#portfolio header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
			});
		} else {
			$("#portfolio .content article").html(portfolioTemplate(portfolioEntries[0]));
		}	
	
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