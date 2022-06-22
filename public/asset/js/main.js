/*
	Name: Impose
	Description: Responsive HTML5 Template
	Version: 1.0
	Author: pixelwars
*/

(function($) { "use strict"; 
	
	/* global variables */
	var $masonry_container;
	
	/* DOCUMENT READY */
	$(function() {
		
		
		// ------------------------------
		// MOBILE MENU
		var $menu = $('.nav-menu', '#primary-navigation');
		
		// add classes
		$menu.find('li').each(function() {
			if($(this).children('ul').length) {
				$(this).addClass('has-submenu');
				$(this).find('>a').after('<span class="submenu-toggle"></span>');
			}
		});
		
		var $submenuTrigger = $('.has-submenu > .submenu-toggle');
		// submenu link click event
		$submenuTrigger.on( "click", function() {
			$(this).parent().toggleClass('active');
			$(this).siblings('ul').toggleClass('active');
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// INTRO ROTATING WORDS
		
		var $intro_h = $('.intro h3', '#content');
		$intro_h.append('<span class="words-wrapper"></span>');
		$intro_h.find('strong').appendTo('.words-wrapper');
		$intro_h.find('strong').eq(0).addClass('is-visible');
		var rotate_classes = 'rotate-title ' + $('.intro').data('animation');
		$intro_h.addClass(rotate_classes);
		
		//set animation timing
		var animationDelay = 2500,
			//loading bar effect
			barAnimationDelay = 3800,
			barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
			//letters effect
			lettersDelay = 50,
			//type effect
			typeLettersDelay = 150,
			selectionDuration = 500,
			typeAnimationDelay = selectionDuration + 800,
			//clip effect 
			revealDuration = 600,
			revealAnimationDelay = 1500;
		
		initHeadline();
		
	
		function initHeadline() {
			//insert <i> element for each letter of a changing word
			singleLetters($('.rotate-title.letters').find('strong'));
			//initialise headline animation
			animateHeadline($('.intro h3'));
		}
	
		function singleLetters($words) {
			$words.each(function(){
				var word = $(this),
					letters = word.text().split(''),
					selected = word.hasClass('is-visible');
				for (var i in letters) {
					if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
					letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
				}
				var newLetters = letters.join('');
				word.html(newLetters).css('opacity', 1);
			});
		}
	
		function animateHeadline($headlines) {
			var duration = animationDelay;
			$headlines.each(function(){
				var headline = $(this);
				
				if(headline.hasClass('loading-bar')) {
					duration = barAnimationDelay;
					setTimeout(function(){ headline.find('.words-wrapper').addClass('is-loading') }, barWaiting);
				} else if (headline.hasClass('clip')){
					var spanWrapper = headline.find('.words-wrapper'),
						newWidth = spanWrapper.width() + 10
					spanWrapper.css('width', newWidth);
				} else if (!headline.hasClass('type') ) {
					//assign to .words-wrapper the width of its longest word
					var words = headline.find('.words-wrapper strong'),
						width = 0;
					words.each(function(){
						var wordWidth = $(this).width();
						if (wordWidth > width) width = wordWidth;
					});
					headline.find('.words-wrapper').css('width', width);
				};
	
				//trigger animation
				setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
			});
		}
	
		function hideWord($word) {
			var nextWord = takeNext($word);
			
			if($word.parents('.rotate-title').hasClass('type')) {
				var parentSpan = $word.parent('.words-wrapper');
				parentSpan.addClass('selected').removeClass('waiting');	
				setTimeout(function(){ 
					parentSpan.removeClass('selected'); 
					$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
				}, selectionDuration);
				setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
			
			} else if($word.parents('.rotate-title').hasClass('letters')) {
				var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
				hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
				showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
	
			}  else if($word.parents('.rotate-title').hasClass('clip')) {
				$word.parents('.words-wrapper').animate({ width : '2px' }, revealDuration, function(){
					switchWord($word, nextWord);
					showWord(nextWord);
				});
	
			} else if ($word.parents('.rotate-title').hasClass('loading-bar')){
				$word.parents('.words-wrapper').removeClass('is-loading');
				switchWord($word, nextWord);
				setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
				setTimeout(function(){ $word.parents('.words-wrapper').addClass('is-loading') }, barWaiting);
	
			} else {
				switchWord($word, nextWord);
				setTimeout(function(){ hideWord(nextWord) }, animationDelay);
			}
		}
	
		function showWord($word, $duration) {
			if($word.parents('.rotate-title').hasClass('type')) {
				showLetter($word.find('i').eq(0), $word, false, $duration);
				$word.addClass('is-visible').removeClass('is-hidden');
	
			}  else if($word.parents('.rotate-title').hasClass('clip')) {
				$word.parents('.words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
					setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
				});
			}
		}
	
		function hideLetter($letter, $word, $bool, $duration) {
			$letter.removeClass('in').addClass('out');
			
			if(!$letter.is(':last-child')) {
				setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
			} else if($bool) { 
				setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
			}
	
			if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
				var nextWord = takeNext($word);
				switchWord($word, nextWord);
			} 
		}
	
		function showLetter($letter, $word, $bool, $duration) {
			$letter.addClass('in').removeClass('out');
			
			if(!$letter.is(':last-child')) { 
				setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
			} else { 
				if($word.parents('.rotate-title').hasClass('type')) { setTimeout(function(){ $word.parents('.words-wrapper').addClass('waiting'); }, 200);}
				if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
			}
		}
	
		function takeNext($word) {
			return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
		}
	
		function takePrev($word) {
			return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
		}
	
		function switchWord($oldWord, $newWord) {
			$oldWord.removeClass('is-visible').addClass('is-hidden');
			$newWord.removeClass('is-hidden').addClass('is-visible');
		}
		// ------------------------------
		
		
		// ------------------------------
		// HOME LINK BOXES
		var intro_figure = $(".intro figure", "#content");
		if(intro_figure.length) {
			intro_figure.eq(0).before('<div class="figure-boxes"></div>');
			intro_figure.each(function() {
				$(this).wrap('<div class="figure-box"></div>');
				$(this).find('a').css('background-image', 'url(' + $(this).find('img').attr('src') + ')');
				$(this).append('<a class="figure-link" href="' + $(this).find('a').attr('href') + '"></a>' );
			});
			$('.intro .figure-box').appendTo('.figure-boxes');
		}
		// ------------------------------
	
		
	
		// ------------------------------
		// BLOG MINIMAL LAYOUT
		blogMinLayout();
		setPostTypes('.img-vertical');
		setPostTypes('.img-square');
		setPostTypes('.img-horizontal');
		
		function blogMinLayout() {
			
			$('.blog-irregular img').each(function(index, element) {
                var $img = $(this);
				var ratio = $img.attr('width') / $img.attr('height');
				var ratio_class = "";
				
				if((ratio < 1.33) & (ratio > 0.8)) {
					ratio_class = 'img-square'
				} else if(ratio < 0.8) {
					ratio_class = 'img-vertical'
				} else if(ratio > 1.33) {
					ratio_class = 'img-horizontal'
				} 
				
				$img.parents('.hentry').addClass(ratio_class);
            });		
		}
		
		function setPostTypes(el) {
			$(el).each(function(index, element) {
                var mod = index % 2;
				$(this).addClass('type-' + mod);
            });
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// HEADER SMALL MENU BORDER FIX 
		if(!($('.header-small .post-slider, .header-small .featured-top, .header-small .blog-bold, .header-small .blog-waterfall, .blog-creative.first-full').length)) {
			$('html').addClass('has-menu-border');
		}
		// ------------------------------
		

		// ------------------------------
		// Fitvids.js : fluid width video embeds
		$("body").fitVids({ customSelector: 'iframe[src*="facebook.com/plugins/video"], iframe[src*="facebook.com/video/embed"]' });
		// preserve 16:9 aspect ratio for soundcloud embeds
		$('iframe[src*="soundcloud.com"]').wrap('<div class="fluid-audio fluid-width-video-wrapper"></div>');
		$('.fluid-width-video-wrapper').wrap('<div class="media-wrap"></div>');
		// ------------------------------
			
		
		// ------------------------------
		// FluidBox : Zoomable Images
		$('.entry-content > p a, .wp-caption a').each(function(index, element) {
            if($(this).attr('href').match(/\.(jpeg|jpg|gif|png)$/) != null) {
				$(this).fluidbox();
				}
        });
        // ------------------------------
		
		
		// ------------------------------
		// GALLERY COLLAGE LAYOUT
		collage();
		
		var resizeTimer = null;
		$(window).bind('resize', function() {
			
			// hide all the images until we resize them
			// set the element you are scaling i.e. the first child nodes of ```.Collage``` to opacity 0
			$('.gallery figure').css("opacity", 0);
			// set a timer to re-apply the plugin
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(collage, 1200);
			collage();
		});
		// ------------------------------
		
		
		// ------------------------------
		// LIGHTBOX - applied to gallery post format
		if($(".lightbox, .gallery.link-to-file").length) {
			$('.media-box, .gallery.link-to-file').each(function(index, element) {
				var $media_box = $(this);
				$media_box.magnificPopup({
				  delegate: '.lightbox, .gallery-item a',
				  type: 'image',
				  image: {
					  markup: '<div class="mfp-figure">'+
								'<div class="mfp-close"></div>'+
								'<div class="mfp-img"></div>'+
							  '</div>' +
							  '<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
					
					  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
					  verticalFit: true, // Fits image in area vertically
					  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
					},
					gallery: {
					  enabled:true,
					  tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
					},
				  iframe: {
					 markup: '<div class="mfp-iframe-scaler">'+
								'<div class="mfp-close"></div>'+
								'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
								'<div class="mfp-title">Some caption</div>'+
							  '</div>'
				  },
				  mainClass: 'mfp-zoom-in',
				  tLoading: '',
				  removalDelay: 300, //delay removal by X to allow out-animation
				  callbacks: {
					markupParse: function(template, values, item) {
						  var title = "";
						  if(item.el.parents('.gallery-item').length) {
							  title = item.el.parents('.gallery-item').find('.gallery-caption').text();	  
						  } else {
							  title = item.el.attr('title') == undefined ? "" : item.el.attr('title');
							  }
						  //return title;
					 	values.title = title;
					},
					imageLoadComplete: function() {
					  var self = this;
					  setTimeout(function() {
						self.wrap.addClass('mfp-image-loaded');
					  }, 16);
					},
					close: function() {
					  this.wrap.removeClass('mfp-image-loaded');
					},
					beforeAppend: function() {
						var self = this;
						this.content.find('iframe').on('load', function() {
						  setTimeout(function() {
							self.wrap.addClass('mfp-image-loaded');
						  }, 16);
						});
					 }
				  },
				  closeBtnInside: false,
				  closeOnContentClick: true,
				  midClick: true
				});
			});	
		}
		// ------------------------------
		
		
		
		
		
		// ------------------------------
        // OWL-CAROUSEL
		var owl = $('.owl-carousel');
		if(owl.length) {
			owl.each(function(index, element) {
				//wait for images
				$(element).imagesLoaded( function() {
					
					//remove loading
					$(element).find('.loading').remove();
					
					var items = $(element).data('items');
					if (items === 1) {
						$(element).addClass('single-slide');
						}
					else if (items === 2) {
						$(element).addClass('two-slides');
						}
					$(element).owlCarousel({
						loop: 				$(element).data('loop'),
						center : 			$(element).data('center'),
						mouseDrag : 		$(element).data('mouse-drag'),
						dots : 				$(element).data('dots'),
						nav : 				$(element).data('nav'),
						autoplay : 			$(element).data('autoplay'),
						autoplaySpeed : 	$(element).data('autoplay-speed'),
						autoplayTimeout : 	$(element).data('autoplay-timeout'),
						autoplayHoverPause :true,
						navText : [],
						autoHeight: $(element).hasClass('post-slider') ? false : true,
						responsive:{
							0:		{ items: 1 },
							768:	{ items: items <= 2 ? items : 2 },
							1200:	{ items: items <= 3 ? items : 3 },
							1600:	{ items: items }
						},
						onInitialized : animate_blog
					});
				});
			});	
		}
		// ------------------------------


		
		
		// ------------------------------
        // FIXED NAV MENU	
		var previousScroll = 0, // previous scroll position
		menuOffset = 54, // height of menu (once scroll passed it, menu is hidden)
		detachPoint = 650, // point of detach (after scroll passed it, menu is fixed)
		hideShowOffset = 6; // scrolling value after which triggers hide/show menu
		var $navMenu = $('.site-navigation'),
			$html = $('html');
		
		// on scroll hide/show menu
		$(window).scroll(function() {
								
			if (!$html.hasClass('menu-expanded')) {
			var currentScroll = $(this).scrollTop(), // gets current scroll position
				scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling
			// if scrolled past menu
			if (currentScroll > menuOffset) {
			  // if scrolled past detach point add class to fix menu
			  if (currentScroll > detachPoint) {
				if (!$html.hasClass('menu-detached'))
				  $html.addClass('menu-detached');
			  }
			  // if scrolling faster than hideShowOffset hide/show menu
			  if (scrollDifference >= hideShowOffset) {
				if (currentScroll > previousScroll) {
				  // scrolling down; hide menu
				  if (!$html.hasClass('menu-invisible'))
					$html.addClass('menu-invisible');
				} else {
				  // scrolling up; show menu
				  if ($html.hasClass('menu-invisible'))
					$html.removeClass('menu-invisible');
				}
			  }
			} else {
			  // only remove “detached” class if user is at the top of document (menu jump fix)
			  if (currentScroll <= 0){
				$html.removeClass('menu-detached').removeClass('menu-invisible');
			  }
			}
			// if user is at the bottom of document show menu
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			  $html.removeClass('menu-invisible');
			}
			// replace previous scroll position with new one
			previousScroll = currentScroll;
		  }
				
		})// window.scroll
		
		
		// shows/hides navigation’s popover if class "expanded"
		$('.search-toggle').on('click', function(event) {
		  showHideNav();
		  event.preventDefault();
		});
			
		
		// checks if navigation’s popover is shown
		function showHideNav() {
		  if ($html.hasClass('menu-expanded')) {
			hideNav();
		  } else {
			showNav();
		  }
		}
		// shows the navigation’s popover
		function showNav() {
		  setTimeout(function() { $('.search-container input[type="search"]').trigger('focus'); },300);
		  $html.removeClass('menu-invisible').addClass('menu-expanded');
		  window.setTimeout(function(){$('body').addClass('no_scroll');}, 200); // Firefox hack. Hides scrollbar as soon as menu animation is done
		}
		// hides the navigation’s popover
		function hideNav() {
		  window.setTimeout(function(){$('body').removeClass('no_scroll');}, 10); // allow animations to start before removing class (Firefox)
		  $html.removeClass('menu-expanded');
		}
		// keyboard shortcuts
		$('body').keydown(function(e) {
		  // if ESC show/hide menu
		  if (e.keyCode === 27) {
			showHideNav();
			e.preventDefault();
		  }
		});
		// ------------------------------
		
		
		
		// ------------------------------
        // HEADER MOBILE MENU TOGGLE
        $('.menu-toggle').on( "click", function(e) {
            e.stopPropagation();
            $('html').toggleClass('is-menu-toggled-on');
        });
		// ------------------------------

	
        
        
		// ------------------------------
		// SOCIAL FEED WIDGET
		// https://github.com/pixel-industry/Social-Photo-Stream-jQuery-Plugin
		var socialFeed = $('.social-feed');
		if(socialFeed.length) {
			socialFeed.each(function() {
				$(this).socialstream({
					socialnetwork: $(this).data("social-network"),
					limit: $(this).data("limit"),
					username: $(this).data("username")
				});
			});	
		}
		// ------------------------------
		
		
		
		
        // ------------------------------
		// Selection Sharer
		if($('.is-selection-shareable').length) {	
			$('.single-post .entry-content p, .single-post .entry-content blockquote').selectionSharer();
		} 
        // ------------------------------
        
		

		
		// ------------------------------
		// remove click delay on touch devices
		FastClick.attach(document.body);
		// ------------------------------
		
	
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform, .mc4wp-form form').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') === "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
		


		
		// ------------------------------
		// MASONRY - ISOTOPE
		$masonry_container = $('.masonry');
		if($masonry_container.length) {
			$masonry_container.imagesLoaded(function() {
				$masonry_container.width($masonry_container.parent().width());
				// initialize isotope
				$masonry_container.isotope({
				  itemSelector : '.hentry',
				  layoutMode : $masonry_container.data('layout'),
				  transitionDuration: 0
				});
				
				setMasonry();
				setTimeout(function() { $masonry_container.isotope(); }, 20);	
				$(window).resize(function() {
					// hack : make container width fixed
					$masonry_container.width($masonry_container.parent().width());
					setMasonry();					
				});
			});
		}
		// ------------------------------
		
		
		
		
    });
    // DOCUMENT READY
	
	
	
	// WINDOW ONLOAD
	window.onload = function() {
		
		/* GALLERY COLLAGE LAYOUT */
		collage();

		// ON SCROLL ANIMATIONS
		animate_blog();
	
	};
	// WINDOW ONLOAD	
	
	
	
	
	// ------------------------------
	// ------------------------------
		// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	
	// ------------------------------
	// ON SCROLL ANIMATIONS FOR BLOG
	function animate_blog() {
		
		var items = $('.blog-animated .blog-stream .hentry');
		var items_in_viewport = $('.blog-animated .blog-stream .hentry:in-viewport');
		var effect = $('html').data('effect');
		items.addClass('animated out');
		items_in_viewport.removeClass('animated out');
		
		items.each(function(index, element) {
			var el = $(element);
            el.waypoint(function() {
				
				el.addClass(effect).removeClass('out');
				
			}, { offset: '75%' });
        });	
		
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// COLLAGE
	function collage() {
		var collage = $('.gallery');
		if(collage.length) {
			
			collage.each(function(index, el) {
				
				// wait for images to be loaded
				$(el).imagesLoaded(function() {
					
					$(el).addClass('collage-loaded');
					$(el).collagePlus({
						
						'targetHeight' : 320,
						'effect' : 'effect-2',
						'allowPartialLastRow' : false
						
					}); //collagePlus()
					
				}); //imagesLoaded()
				
			}); //each
		}
	}
	// ------------------------------
	
	
	// ------------------------------
	// MASONRY LAYOUT : changes the number of masonry columns based on the current container's width
	function setMasonry() {
		
		var itemW = $masonry_container.data('item-width');
		var mobileItemW = $masonry_container.data('mobile-item-width');
		var containerW = $masonry_container.width();
		itemW = containerW > 680 ? itemW : mobileItemW; // old :548
		var items = $masonry_container.children('.hentry');
		var columns = Math.round(containerW/itemW);
		
		if(containerW > 680 & containerW < 940) {
			$masonry_container.removeClass('desktop-view').addClass('tablet-view');
		} else if(containerW > 940) {
			$masonry_container.addClass('desktop-view');
		} else {
			$masonry_container.removeClass('desktop-view tablet-view')
		}
	
		// set the widths (%) for each of item
		items.each(function(index, element) {
			var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
			var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
			if($masonry_container.hasClass('first-full') && index == 0) {
				itemRealWidth = 100;
				}
			$(this).css( 'width', itemRealWidth + '%' );
		});
	
		var columnWidth = Math.floor( containerW / columns );
		$masonry_container.isotope( 'option', { masonry: { columnWidth: columnWidth } } );
	}
	// ------------------------------
	
	
	
})(jQuery);
