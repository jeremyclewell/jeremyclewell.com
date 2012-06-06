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
var mainScroll;

Handlebars.registerHelper("each_with_comma", function(array, fn) {
	var buffer = "";
	for (var i = 0, j = array.length; i < j; i++) {
		var item = array[i];
		if (i != 0) {
			buffer += ', ';
		}
		buffer += '<a href="" title="' + item.title + '">' + item.title + '</a>';
		buffer += fn(item);
	}
	return buffer;
});

function getURLParameter(name, src) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(src)||[,""])[1].replace(/\+/g, '%20'))||null;
}

//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

// var History = window.History;

// // Bind to StateChange Event
// History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
//     var State = History.getState(); // Note: We are using History.getState() instead of event.state
//     History.log(State.data, State.title, State.url);
//     var blogID = getURLParameter("blog", State.url);
//     if (blogID) {

//     }
// })

$(document).ready(function(){
		$("#blogNav").css("display", "none");
		$("#portfolioNav").css("display", "none");	
		$(".headerTools").css("display", "none");	

	
	function scroll() {
				blogMenu = new iScroll('blogNav', { hideScrollbar: false});
				portfolioMenu = new iScroll('portfolioNav', { hideScrollbar: false});
				mainScroll = new iScroll('wrapper', { hideScrollbar: false});
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


	$("#heroImg").live("click", function(evt) {
	//	$("#content").toggleClass("rotate");
	});
	
	$("section>header").click(function(evt) {
		

		var thisObj = this;
		if ($(evt.target).hasClass("menuButton")) {
			if (this.parentNode["id"] == "blog") {
				if ($("#blogNav").css("display") == "block") {
					$("#blogNav").fadeOut("fast");
					return;
				} else {
					$("#blogNav").fadeIn("fast");
					blogMenu.refresh();
					return;
				}
			} else if (this.parentNode["id"] == "portfolio") {
				if ($("#portfolioNav").css("display") == "block") {
					$("#portfolioNav").fadeOut("fast");
					return;
				} else {
					$("#portfolioNav").fadeIn("fast");
					portfolioMenu.refresh();
					return;
				}
			}
		}
		
		if ($(evt.target).hasClass("prevButton")) {
			if (this.parentNode["id"] == "blog") {
				if ($(evt.target).attr("data-href") == "") return;
				var request = $(evt.target).attr("data-href") + '&json=1&date_format=m/d/y&callback=?';
				blogRequest(request);
				return;
			} else if (this.parentNode["id"] == "portfolio") {
				if ($(evt.target).attr("data-href") == "") return;
				var request = $(evt.target).attr("data-href") + '&json=1&date_format=m/d/y&callback=?';
				portfolioRequest(request);
				return;
			}
		}
		
		if ($(evt.target).hasClass("nextButton")) {
			if (this.parentNode["id"] == "blog") {
				if ($(evt.target).attr("data-href") == "") return;
				var request = $(evt.target).attr("data-href") + '&json=1&date_format=m/d/y&callback=?';
				blogRequest(request);
				return;
			} else if (this.parentNode["id"] == "portfolio") {
				if ($(evt.target).attr("data-href") == "") return;
				var request = $(evt.target).attr("data-href") + '&json=1&date_format=m/d/y&callback=?';
				portfolioRequest(request);
				return;
			}
		}

		if ($(evt.target).hasClass("searchButton")) {
			if (this.parentNode["id"] == "blog") {
				if ($("#blogSearch").css("display") == "block") {
					$("#blogSearch").fadeOut("fast");
					return;
				} else {
					$("#blogSearch").fadeIn("fast");
					return;
				}
			} else if (this.parentNode["id"] == "portfolio") {
				if ($("#portfolioSearch").css("display") == "block") {
					$("#portfolioSearch").fadeOut("fast");
					return;
				} else {
					$("#portfolioSearch").fadeIn("fast");
					return;
				}
			}
		}
		
		state = (state == this.parentNode["id"]) ? "none" : this.parentNode["id"];
		
		//console.log(state);
		if (state == "blog") {
			$("#blog header div.headerTools").fadeIn("fast");
			$("#portfolio header div.headerTools").fadeOut("fast");
			if ($("#blog .content article").html() == "") blogRequest('http://blog.jeremyclewell.com/?json=get_post&post_type=blog_post&date_format=m/d/y&post_id=' + $("#blogNav li a").first().attr("data-postId") + '&callback=?');
		} else if (state == "portfolio") {
			$("#portfolio header div.headerTools").fadeIn("fast");			
			$("#blog header div.headerTools").fadeOut("fast");
			if ($("#portfolio .content article").html() == "") portfolioRequest('http://blog.jeremyclewell.com/?json=get_post&post_type=portfolio_entry&date_format=m/d/y&post_id=' + $("#portfolioNav li a").first().attr("data-postId") + '&callback=?');
		} else {
			$("#blog header div.headerTools").fadeOut("fast");
			$("#portfolio header div.headerTools").fadeOut("fast");
		}

//		if (evt.target != this) return false;

		
		if ($("#blogNav").css("display") == "block") {
			$("#blogNav").fadeOut("_default", function () {
				$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
			});
		} else if ($("#blogSearch").css("display") == "block") {
			$("#blogSearch").fadeOut("_default", function () {
				$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
			});
		} else if ($("#portfolioNav").css("display") == "block") {
			$("#portfolioNav").fadeOut("_default", function () {
				$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
			});
		} else if ($("#portfolioSearch").css("display") == "block") {
			$("#portfolioSearch").fadeOut("_default", function () {
				$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
			});
		} else if (evt.target.tagName == "IMG") {
		} else {
			$(thisObj).next(".content").slideToggle(500).parent("section").siblings("section").children(".content").slideUp(500);
		}

		blogMenu.refresh();
		
		

		// TODO - implement scrollTo
		//$(this).scrollTo($(this));
//       	$(this).siblings().css({backgroundImage:"url(lezzzft.png)"});
	});

	$("section div.content article").live("click", function(evt) {
		$("#blogNav").fadeOut("_default");
		$("#portfolioNav").fadeOut("_default");
			$("#blogSearch").fadeOut("_default");
			$("#portfolioSearch").fadeOut("_default");
	});
	
	
	
	var blogNavTemplate = Handlebars.compile($("#blog-nav-template").html());
	var blogTemplate = Handlebars.compile($("#blog-template").html());
	var portfolioNavTemplate = Handlebars.compile($("#portfolio-nav-template").html());
	var portfolioTemplate = Handlebars.compile($("#portfolio-template").html());

	$.getJSON('http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=blog_post&include=date,title,id,tags,excerpt&count=100&date_format=m/d/y&callback=?', function(data) {

		$("#blogNav ul").html(blogNavTemplate(data));

	});
	
	$("#blogNav li").live("click", function(evt) {

		if ($(evt.target).hasClass("tag")) return false;
		var request = 'http://blog.jeremyclewell.com/?json=get_post&post_type=blog_post&date_format=m/d/y&post_id=' + $($(this).find("a")).attr("data-postId") + '&callback=?';
		blogRequest(request);	
		$("#blogNav").fadeOut("fast");
	});

	$.getJSON('http://blog.jeremyclewell.com/?json=get_recent_posts&post_type=portfolio_entry&include=date,title,id,tags,excerpt&count=100&date_format=m/d/y&callback=?', function(data) {
		
		$("#portfolioNav ul").html(portfolioNavTemplate(data));
		
	});
	
	$("#portfolioNav li").live("click", function(evt) {

		if ($(evt.target).hasClass("tag")) return false;
		var request = 'http://blog.jeremyclewell.com/?json=get_post&post_type=portfolio_entry&date_format=m/d/y&custom_fields=prodlink&post_id=' + $($(this).find("a")).attr("data-postId") + '&callback=?';
		portfolioRequest(request);	
		$("#portfolioNav").fadeOut("fast");
		
	});
	
	if (!$.support.opacity) {
		$("#browseHappy").css("visibility", "visible");
		$("#browseHappy").css("display", "block");
	}

	$(document).ready(function(evt){
		$("#header header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
		
		$("#modalWindow").animate({opacity: 0}, 200, function() {
			$("#modalWindow").css("visibility", "hidden");
		});
	});
	



	function blogRequest(url) {
		$("#blogNav").fadeOut("fast");
		$("#modalWindow").css("visibility", "visible");
		$("#modalWindow").animate({opacity: 1}, 200, function() {
				$.getJSON(url, function(data) {
					if (data["next_url"]) {
							$("#blog .prevButton").css("opacity", "1");
							$("#blog .prevButton").attr("data-href", data["next_url"]);
					} else {
						$("#blog .prevButton").css("opacity", "0.5");
						$("#blog .prevButton").attr("data-href", "");
					}
					if (data["previous_url"]) {
							$("#blog .nextButton").css("opacity", "1");
							$("#blog .nextButton").attr("data-href", data["previous_url"]);
					} else {
						$("#blog .nextButton").css("opacity", "0.5");
						$("#blog .nextButton").attr("data-href", "");
					}					
						$("#blog .content article").html(blogTemplate(data["post"]));	
						$("#modalWindow").animate({opacity: 0}, 300, function() {
							$("#modalWindow").css("visibility", "hidden");
						});
	//	    		History.pushState(null, blogPosts[blogPageIndex * 5 + $(thisObj).index()].title, "?blog=" + blogPosts[blogPageIndex * 5 + $(thisObj).index()].id);
				//	});
				});
		});
	}
	
	function portfolioRequest(url) {
		$("#portfolioNav").fadeOut("fast");
		$("#modalWindow").css("visibility", "visible");
		$("#modalWindow").animate({opacity: 1}, 200, function() {
			$.getJSON(url, function(data) {
				if (data["next_url"]) {
						$("#portfolio .prevButton").css("opacity", "1");
						$("#portfolio .prevButton").attr("data-href", data["next_url"]);
				} else {
					$("#portfolio .prevButton").css("opacity", "0.5");
					$("#portfolio .prevButton").attr("data-href", "");
				}
				if (data["previous_url"]) {
						$("#portfolio .nextButton").css("opacity", "1");
						$("#portfolio .nextButton").attr("data-href", data["previous_url"]);
				} else {
					$("#portfolio .nextButton").css("opacity", "0.5");
					$("#portfolio .nextButton").attr("data-href", "");
				}					
					$("#portfolio .content article").html(portfolioTemplate(data["post"]));	
					$("#modalWindow").animate({opacity: 0}, 300, function() {
						$("#modalWindow").css("visibility", "hidden");
					});
//	    		History.pushState(null, blogPosts[blogPageIndex * 5 + $(thisObj).index()].title, "?blog=" + blogPosts[blogPageIndex * 5 + $(thisObj).index()].id);
			//	});
			});
		});
	}
	
	
});

/*





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


	var portfolioID = getURLParameter("portfolio", location.search);
	if (portfolioID) {
		$.getJSON("http://blog.jeremyclewell.com/?json=get_post&post_type=portfolio_entry&post_id=" + portfolioID, function(data) {
			$("#portfolio .content article").html(portfolioTemplate(data["post"]));	
			$("#portfolio header").next(".content").slideToggle(300).parent("section").siblings("section").children(".content").slideUp(300);
		});
	} else {
		$("#portfolio .content article").html(portfolioTemplate(portfolioEntries[0]));
	}
*/