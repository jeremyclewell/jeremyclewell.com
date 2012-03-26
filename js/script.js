/* Author:

*/


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
		$(this).next("article").slideToggle(300).parent("section").siblings("section").children("article").slideUp(300);
//       	$(this).siblings().css({backgroundImage:"url(lezzzft.png)"});
	});
	
	function subnavOver() {
		$(this).animate({"width": "200px"});
	}
	
	function subnavOff() {
		$(this).animate({"width": "100px"})
	}
	
//	$(".subnav li").hoverIntent(subnavOver, subnavOff);
	
	$(".blogTitle").mouseover(function(evt) {
		$($(this).parent().parent()).css({"width": "40%"});
		$($(this).parent().parent()).siblings().css({"width": "15%"});
	});
	
	
	$('#blogSlider').anythingSlider({
	  // Appearance
	  theme               : "default", // Theme name
	  expand              : false,     // If true, the entire slider will expand to fit the parent element
	  resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
	  vertical            : false,     // If true, all panels will slide vertically; they slide horizontally otherwise
	  showMultiple        : false,     // Set this value to a number and it will show that many slides at once
	  easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI

	  buildArrows         : true,      // If true, builds the forwards and backwards buttons
	  buildNavigation     : false,      // If true, builds a list of anchor links to link to each panel
	  buildStartStop      : false,      // If true, builds the start/stop button

	  appendForwardTo     : $("#blogNavForward"),      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendBackTo        : $("#blogNavBack"),      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
	  appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null

	  toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
	  toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times

	  startText           : "Start",   // Start button text
	  stopText            : "Stop",    // Stop button text
	  forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
	  backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
	  tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)

	  // Function
	  enableArrows        : true,      // if false, arrows will be visible, but not clickable.
	  enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
	  enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
	  enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.

	  // Navigation
	  startPanel          : 1,         // This sets the initial panel
	  changeBy            : 1,         // Amount to go forward or back when changing panels.
	  hashTags            : false,      // Should links change the hashtag in the URL?
	  infiniteSlides      : false,      // if false, the slider will not wrap & not clone any panels
	  navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
	  navigationSize      : false,     // Set this to the maximum number of visible navigation tabs; false to disable

	  // Slideshow options
	  autoPlay            : false,     // If true, the slideshow will start running; replaces "startStopped" option
	  autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
	  autoPlayDelayed     : false,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
	  pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
	  stopAtEnd           : true,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
	  playRtl             : false,     // If true, the slideshow will move right-to-left

	  // Times
	  delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
	  resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
	  animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
	  delayBeforeAnimate  : 0,         // How long to pause slide animation before going to the desired slide (used if you want your "out" FX to show).

	  // Callbacks
	  onBeforeInitialize  : function(e, slider) {}, // Callback before the plugin initializes
	  onInitialized       : function(e, slider) {}, // Callback when the plugin finished initializing
	  onShowStart         : function(e, slider) {}, // Callback on slideshow start
	  onShowStop          : function(e, slider) {}, // Callback after slideshow stops
	  onShowPause         : function(e, slider) {}, // Callback when slideshow pauses
	  onShowUnpause       : function(e, slider) {}, // Callback when slideshow unpauses - may not trigger properly if user clicks on any controls
	  onSlideInit         : function(e, slider) {}, // Callback when slide initiates, before control animation
	  onSlideBegin        : function(e, slider) {}, // Callback before slide animates
	  onSlideComplete     : function(slider) {},    // Callback when slide completes; this is the only callback without an event "e" variable

	  // Interactivity
	  clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
	  clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
	  clickControls       : "click focusin", // Events used to activate navigation control functionality
	  clickSlideshow      : "click",         // Event used to activate slideshow play/stop button

	  // Video
	  resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
	  addWmodeToObject    : "opaque",  // If your slider has an embedded object, the script will automatically add a wmode parameter with this setting
	  isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension
	});
	
	
});







