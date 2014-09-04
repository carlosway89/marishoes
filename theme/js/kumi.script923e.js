/* SHARED VARS */
var firstrun = true,
    liveEffects = ['fade','scale'],
    liveEasing = 'smooth',
    liveSpeed = 500,
    touch = false,
    list = false,
    clickEv = 'click';

// Sniff a mobile browser
function isMobile() {
  if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
    ){
    return true;
  }
  else {
    return false;
  }
}

/* handle Products with Sanbox */
function handleProducts(){
  
  if($('#sandBox').length)
  $('#sandBox').mixitup({
    buttonEvent: clickEv,
    onMixStart: function(config){
      
      // PAUSE LOGO ON SANDBOX ACTIVITY
      if(typeof timer != 'undefined'){
        clearInterval(timer);
      };
      if(typeof counter != 'undefined'){
        clearInterval(counter);
      };
      
      // UPDATE EFFECTS LIST
      config.effects = liveEffects;
      
      // UPDATE EASING
      config.easing = liveEasing;
      
      // UPDATE SPEED
      config.transitionSpeed = liveSpeed;
      
      return config;
    },
    onMixEnd: function(config){
      
      // ADD LIST STYING
      var wait = setTimeout(function(){
        if(config.layoutMode == 'list'){
          list = true;
        };
        
        sortSandBox();
        
        // rebind add to cart event
        $('.add-to-cart').bind( 'click', addToCart );
        
      },100);
    }
  });
}
/* Callback after sorting */
function sortSandBox(){
  var listSB = $('#sandBox .product');
  listSB.removeClass('first');
  $("#sandBox .product:nth-child(4n)").addClass('first');
}

/* Fucntion get width browser */
function getWidthBrowser() {
	var myWidth;

	if( typeof( window.innerWidth ) == 'number' ) { 
		//Non-IE 
		myWidth = window.innerWidth;
	} 
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
		//IE 6+ in 'standards compliant mode' 
		myWidth = document.documentElement.clientWidth; 
	} 
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
		//IE 4 compatible 
		myWidth = document.body.clientWidth; 
	}
	
	return myWidth;
}

/* Fucntion get height browser */
function getHeightBrowser() {
	var myHeight;

	if( typeof( window.innerHeight ) == 'number' ) { 
		//Non-IE 
		myHeight = window.innerHeight; 
	} 
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
		//IE 6+ in 'standards compliant mode' 
		myHeight = document.documentElement.clientHeight;
	} 
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
		//IE 4 compatible 
		myHeight = document.body.clientHeight;
	}
	
	return myHeight;
}


/* handle animate */
function handleDataAnimate(){

  if(touch == false){
    
    $('.animated').appear();
    
    $(document.body).on('appear', '.animated', function(e, $affected) {
      var elem = $(this);
      var animation = elem.data('animation');
      if ( !elem.hasClass('visible') ) {
        var animationDelay = elem.data('animation-delay');
        if ( animationDelay ) {
          
          setTimeout(function(){
            elem.addClass( animation + " visible" );
          }, animationDelay);
          
        } 
        else {
          elem.addClass( animation + " visible" );
        }
      }
    });
  }
}

/* Handle accordion */
function handleAccordion(){
  $('.accordion-toggle').on('click', function () {
    if( $(this).hasClass('collapsed') !== true ){
      $(this).parents('.panel').removeClass('active');
    }else{
      $(this).parents('.panel').addClass('active');
    }
  });
}

/* Handle Focus */
function handleFocus(){
  $(".form-focus input").focus(function() {
    $(this).parents('.form-focus').addClass('focus');
  }).blur(function() {
    $(this).parents('.form-focus').removeClass('focus');
  });
}

/* Handle Login Box */
function handleBoxLogin(){
  $("#loginBox input").focus(function() {
    $(this).parents('#loginBox').addClass('focus');
  }).blur(function() {
    $(this).parents('#loginBox').removeClass('focus');
  });
}

/* Handle dropdown */
function handleDropdown(){  
  $('.dropdown-link').on('click', function() {
     if(touch == false && getWidthBrowser() > 980 ){
       var href = $(this).attr('href');
       window.location = href;
     }
  });
  handleBoxLogin();
  handleFocus();
}


/* Handle scroll to top */
function handleScrollToTop() {
  
  function totop_button(a) {
    var b = $("#scroll-top");
    b.removeClass("off on");
    if (a == "on") { b.addClass("on") } else { b.addClass("off") }
  }
  
  $(window).scroll(function() {
    var b = $(this).scrollTop();
    var c = $(this).height();
    if (b > 0) { 
      var d = b + c / 2;
    } 
    else { 
      var d = 1 ;
    }
    
    if (d < 1e3) { 
      totop_button("off");
    } 
    else { 
      totop_button("on"); 
    }
  });
  
  $("#scroll-top").click(function (e) {
    e.preventDefault();
    $('html,body').animate({scrollTop:0},800,'swing');
  });
}


/* Handle screenshot to preview */
function handleScreenshotPreview(){
  /* CONFIG */
  var xOffset = 100;
  var yOffset = 50;
  /* END CONFIG */
  
  $(".screenshot").hover(function(e){
    
    $("body").append("<p id='screenshot'><span></span><img src='"+ $(this).attr('data-rel') +"' alt='' /></p>");
    
    if($(this).hasClass('odd')){
      $("#screenshot")
      .css("top",(e.pageY - xOffset) + "px")
      .css("right",(e.pageX + yOffset) + "px")
      .fadeIn("fast");
    }
    else if($(this).hasClass('even')){
      $("#screenshot")
      .css("top",(e.pageY - xOffset) + "px")
      .css("left",(e.pageX + yOffset) + "px")
      .fadeIn("fast");
    }
    
  },function(){
    
    $("#screenshot").remove();
  });
  
  $(".screenshot").mousemove(function(e){
    if($(this).hasClass('odd')){
      $("#screenshot")
      .css("top",(e.pageY - xOffset) + "px")
      .css("right",(e.pageX + yOffset) + "px");
    }
    else if($(this).hasClass('even')){
      $("#screenshot")
      .css("top",(e.pageY - xOffset) + "px")
      .css("left",(e.pageX + yOffset) + "px");
    }
      });	
}

/* Handle Pulsate */
function handlePulsate(){
  if (!jQuery().pulsate) {
    return;
  }
  
  if (!! navigator.userAgent.match(/MSIE 8.0/)) {
    return; // pulsate plugin does not support IE8 and below
  }
  
  if (jQuery().pulsate) {
    
    // Slideshow
    jQuery('#home-slider').on('mouseup', '.slider-control', function(e) {
      if(e.which === 1){
        $('#home-slider .slider-control .btn-label').pulsate({
          repeat: false,
          reach: 10
        });
      }
    });
    jQuery('#home-slider').on('mouseup', '.pages .page', function(e) {
      
      if(!$(this).hasClass('active') && e.which === 1){
        $(this).pulsate({
          color: '#7bae23',
          repeat: false,
          reach: 10
        });
      }
    });
    
    jQuery('#home-slider').on('mouseup', '.camera_pag li', function(e) {
      if(!$(this).hasClass('cameracurrent') && e.which === 1){
        $(this).pulsate({
          color: '#7bae23',
          repeat: false,
          reach: 10
        });
      }
    });    
    
    // Product
    jQuery('.pulsate-regular').pulsate({
      reach: 20,
      speed: 1000,
      pause: 1000
    });
    
    // Cart
    jQuery('.pulsate-regular2').pulsate({
      reach: 5,
      speed: 1000,
      pause: 5000
    });
    
    jQuery('.pulsate-once').click(function () {
      $(this).pulsate({
        repeat: false
      });
    });
    
    jQuery('.pulsate-hover').pulsate({
      repeat: false,
      onHover: true
    });
    
    jQuery('.pulsate-crazy').click(function () {
      $(this).pulsate({
        reach: 50,
        repeat: 10,
        speed: 100,
        glow: true
      });
    });
  }
}


/* Function update slideshow */
function updateSlider(){
  if($('#home-slider').length){
    var data = $('#home-slider').data('slider');
    if(data){
      data.resize();
    }
  }
}

/* Function update carousel */
function updateCarousel(){
  if($('#home-slider').length){
    var data = $('#home-slider').data('slider');
    if(data){
      data.resize();
    }
  }
}

/* Function update after change width */
function updateCallback() {
  /* Update scrollbar product images thumb */
  if($('.product-image-thumb').length){
    
      $('.product-image-thumb').resize();
    
  }
  
  /*  Update scrollbar related products*/
  if($('#product-related').length){
    
      $('#product-related').resize();
    
  }
  
  /*  Update scrollbar featured collection*/
  if($('#featured-collections').length){
    
      $('#featured-collections').resize();
    
  }
  
  /* Update main slideshow */
  updateSlider();
}

/* Function: Refresh Zoom in */
function alwaysRefreshZoom(){
  if(touch == false){
    
    if($('.elevatezoom').length){
      
      var zoomImage = $('.elevatezoom .img-zoom');

      zoomImage.elevateZoom({
        gallery:'gallery_main', 
        galleryActiveClass: 'active', 
        zoomType: 'window',
        cursor: 'pointer',
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
        scrollZoom: true,
        easing : true,
        loadingIcon: '//cdn.shopify.com/s/files/1/0396/5469/t/3/assets/loader.gif?5233'
      });
      
      
        //pass the images to Fancybox
        $(".elevatezoom .img-zoom").bind("click", function(e) {  
          var ez =   $('.elevatezoom .img-zoom').data('elevateZoom');	
          $.fancybox(ez.getGalleryList(),{
            closeBtn  : false,
            helpers : {
              buttons	: {}
            }
          });
          return false;
        });
      
    }
    
  }
}

/* Function handle scroll product thumbs */
function handleImageThumbs(){
  if($('#gallery_main').length){
    
    if(touch){
      $('#product-image .main-image').on('click', function() {
        var _items = [];
        var _index = 0;
        var product_images = $('#product-image .image-thumb');
        product_images.each(function(key, val) {
          _items.push({'href' : val.href, 'title' : val.title});
          if($(this).hasClass('active')){
            _index = key;
          }
        });
        $.fancybox(_items,{
          closeBtn: false,
          index: _index,
          openEffect: 'none',
          closeEffect: 'none',
          nextEffect: 'none',
          prevEffect: 'none',
          helpers: {
            buttons: {}
          }
        });
        return false;
      });
    }
    else{
      
    }
       
    $('#product-image').on('click', '.image-thumb', function() {
      
      var $this = $(this);
      
      if(!$this.hasClass('active')){
        var background = $('.product-image .main-image .main-image-bg');
        var parent = $this.parents('.product-image-wrapper');
        var src_original = $this.attr('data-image-zoom');
        var src_display = $this.attr('data-image');
        
        background.show();
        
        parent.find('.image-thumb').removeClass('active');
        $this.addClass('active');
        
        parent.find('.main-image').find('img').attr('data-zoom-image', src_original);
        parent.find('.main-image').find('img').attr('src', src_display).load(function() {
          background.hide();
        });
      }
      
      return false;
    });
  }
}

/* Function: Refresh Zoom in Quick Shop */
function alwaysRefreshZoomQS(){
  if(touch == false){
    
    if($('.elevatezoom_qs').length){
      
      var zoomImage = $('.elevatezoom_qs .img-zoom');
      
      // Reinitialize EZ
      zoomImage.elevateZoom({
        gallery:'gallery_main_qs', 
        galleryActiveClass: 'active', 
        zoomType: 'window',
        cursor: 'pointer',
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
        scrollZoom: true,
        easing : true,
        loadingIcon: '//cdn.shopify.com/s/files/1/0396/5469/t/3/assets/loader.gif?5233'
      });
      
      
        //pass the images to Fancybox
        $(".elevatezoom_qs .img-zoom").bind("click", function(e) {  
          var ez =   $('.elevatezoom_qs .img-zoom').data('elevateZoom');	
          $.fancybox(ez.getGalleryList(),{
            closeBtn  : false,
            helpers : {
              buttons	: {}
            }
          });
          return false;
        });
      
    }
    
  }
}
      
/* Function update scroll product thumbs quickshop */
function alwaysScrollThumbsQS(){
  if($('#gallery_main_qs').length){

    $('#quick-shop-image').on(clickEv, '.image-thumb', function() {

      var $this = $(this);
      var background = $('.product-image .main-image .main-image-bg');
      var parent = $this.parents('.product-image-wrapper');
      var src_original = $this.attr('data-image-zoom');
      var src_display = $this.attr('data-image');
      
      background.show();
      
      parent.find('.image-thumb').removeClass('active');
      $this.addClass('active');
      
      parent.find('.main-image').find('img').attr('data-zoom-image', src_original);
      parent.find('.main-image').find('img').attr('src', src_display).load(function() {
        background.hide();
      });
      
      return false;
    });
  }
}

 
/* Handle Tooltip */
function handleTooltip(){
  if($('.btooltip').length){
    $('.btooltip').tooltip();
  }
}

/* Handle Tabs */
function handleTabs(){
  $('body').on('click', '.nav-tabs a', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
}
      
/* Handle Sort by */
function handleSortby(){
  $('#sortForm li.sort').click(function(){  // add event any time the sort box changes
    
    var button = $('#sortButton');
    var box = $('#sortBox');
    
    $('#sortButton .name').html($(this).html());
    
    button.removeClass('active');
    box.hide();
  });
}
      
// Returns a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
      
/* Mockup Main Slideshow - Responsive Slider */
function mockupResponsiveSlider(){
  // Declare animations
  var animations = new Array();
  animations[0] = "slideAppearRightToLeft";
  animations[1] = "slideAppearLeftToRight";
  animations[2] = "slideAppearUpToDown";
  animations[3] = "slideAppearDownToUp";
    
  $('#home-slider [data-animate]').each(function(){
    var idx = getRandomInt(0, 3);
    var animation = animations[idx];
    
    $(this).attr('data-animate', animation);
  });
}
      
/* Mockup Main Slideshow - Camera Slideshow */
function mockupCameraSlideshow(){
  // Declare animations
  var animations = new Array();
  animations[0] = "moveFromLeft";
  animations[1] = "moveFomRight";
  animations[2] = "fadeIn";
  animations[3] = "fadeFromLeft";
  animations[4] = "fadeFromRight";
  /*animations[5] = "fadeFromTop";
  animations[6] = "fadeFromBottom";
  animations[7] = "moveFromTop";
  animations[8] = "moveFromBottom";*/
    
  $('#home-slider .camera_caption').each(function(){
    var idx = getRandomInt(0, 4);
    var animation = animations[idx];
    
    $(this).removeClass('fadeIn').addClass(animation);
  });
}
  
      
/* Handle Main Slideshow */
function handleSlideshow(){
  if($('#home-slider').length){
    
    // Callback Camera slideshow
    
    
    // Callback Responsive slideshow
    
    mockupResponsiveSlider();
    $('#home-slider').responsiveSlider({
      autoplay: true,
      interval: 5000,
      transitionTime: 300
    });
    imagesLoaded('#home-slider', function() {
      $('#home-slider-overlay').hide();
    });
    
  }
}
      
/* Handle Map with GMap */
function handleMap(){
  if($('#contact_map').length){
    if(jQuery().gMap){
      $('#contact_map').gMap({
        zoom: 17,
        scrollwheel: false,
        maptype: 'ROADMAP',
        markers:[
          {
            address: '227 Nguyễn Văn Cừ, phường 4, Ho Chi Minh City, Vietnam',
            html: '_address',
            icon: {
              image: '//cdn.shopify.com/s/files/1/0396/5469/t/3/assets/icon-gmap.png?5233',
              iconsize: [188, 68],
              iconanchor: [0,68]
            }
          }
        ]
      });
    }
  }
}
      
/* Handle Grid List */
function handleGridList(){
  $('.make-switch').on('switch-change', function (e, data) {
    var value = data.value;
    
    if(value == true){
      $('#sandBox').removeClass('full_width');
      $('#sandBox').find('.product-images').removeClass('span4');
      $('#sandBox').find('.product-contents').removeClass('span8');
    }
    else{
      $('#sandBox').addClass('full_width');
      $('#sandBox').find('.product-images').addClass('span4');
      $('#sandBox').find('.product-contents').addClass('span8');
    }
  });
}
      
/* Handle Menu when scroll */
function handleMenuScroll(){
  var scrollTop = $(this).scrollTop();
  var heightHeader = $('#header').outerHeight();

  if(touch == false && getWidthBrowser() >= 1024){
    if(scrollTop > heightHeader){
      if(!$('#header').hasClass('on')){
        
        if(!$('body').hasClass('templateIndex')){
          $('<div style="min-height:'+heightHeader+'px"></div>').insertBefore('#header');
        }
        
        $('#header').addClass('on').addClass('fadeInDown');
      }
    }
    else{
      if($('#header').hasClass('on')){
        
        if(!$('body').hasClass('templateIndex')){
          $('#header').prev().remove();
        }
        
        $('#header').removeClass('on').removeClass('fadeInDown');
      }
    }
  }
}
    
/* Handle reset: Menu when scroll */
function handleResetMenuScroll(){

  if(getWidthBrowser() < 1024){
    if($('#header').hasClass('on')){
      
      if(!$('body').hasClass('templateIndex')){
          $('#header').prev().remove();
        }
      
      $('#header').removeClass('on').removeClass('fadeInDown');
    }
  }
  else{
    var scrollTop = $(this).scrollTop();
    var heightHeader = $('#header').outerHeight();
    if(scrollTop > heightHeader){
      if(!$('#header').hasClass('on')){
        
        if(!$('body').hasClass('templateIndex')){
          $('<div style="min-height:'+heightHeader+'px"></div>').insertBefore('#header');
        }
        
        $('#header').addClass('on').addClass('fadeInDown');
      }
    }
  }
}
      
/* Handle Menu on Mobile */
function handleMenuMobile(){
  // prevent default trigger
  $('#header .navbar .nav li > .dropdown-link').click(function() {
    if(getWidthBrowser() < 980){
      return false;
    }
  });
  // add trigger to open sub-menu
  $('#header .navbar .nav li > .dropdown-link .icon-caret-down').click(function() {
    if(getWidthBrowser() < 980){
      var parent2 = $(this).parent().parent();
      if(parent2.hasClass('open')){
        parent2.removeClass('open');
      }
      else{
        parent2.addClass('open');
      }
    }
  });
  // add trigger to link
  $('#header .navbar .nav li > .dropdown-link > span').click(function() {
    if(getWidthBrowser() < 980){
      var parent = $(this).parent();
      window.location = parent.attr('href');
    }
  });
  
  $('.btn-navbar').click(function(){
    var $_to = $(this).attr('data-target');
    
    if($($_to).hasClass('in')){
      
    }
    else{
      
    }
  });
}

// reset product image
function resetProductImg(){
  $('#product-image #main-image').load(function(){
    $('.main-image-bg').hide();
    $('#product-image .main-image div').hide();
  });
}
     
// search in mobile
function callbackSearchMobile(){
  var button = $('.is-mobile .is-mobile-search .icon-search');
  var remove = $('.is-mobile .is-mobile-search .icon-remove');
  var input = $('.is-mobile .is-mobile-search .input-search');
  var wrapper = $('.is-mobile .is-mobile-search');
  
  button.click(function() {
    wrapper.addClass('on');
  });
  input.click(function() { 
    return false;
  });
  remove.click(function() {
    wrapper.removeClass('on');
  });
}


// get all products infomation (title and handle)
function ajaxAllProducts(){
  var result = new Array();
  var searchURL = '/collections/all?view=ajax';
  
  $.ajax({
    type: 'GET',
    url: searchURL,
    beforeSend: function () {
      // to do
    },
    success: function (data) {
      
      var elements = $(data).find('.p');
      
      elements.each(function() {
        
        var title = $.trim(this.getAttribute('data-t'));
        var handle = $.trim(this.getAttribute('data-h'));
        
        var item = new Object();
        item.title = title;
        item.handle = handle;
        
        result.push(item);
      });
    },
    dataType: 'html'
  });
  
  return result;
}
// search by ajax
function handleAjaxSearch(){
  var products = ajaxAllProducts();
  
  $( "#input-ajax" ).keyup(function() {
    var that = $(this);
    var keyword = $.trim(that.val().toLowerCase());
    $('#result-ajax').hide();
    
    if(keyword.length >= 3){
      var result = $('#result-ajax .wrapper-ajax').empty();
      
      for (var i = 0; i < products.length; i++) {
        var item = products[i];
        
        var title = item.title;
        var handle = item.handle;
        
        if(title.toLowerCase().indexOf(keyword) > -1){
          
          var markedString = title.replace(new RegExp('(' + keyword + ')', 'gi'), '<span class="marked">$1</span>');
          
          var template = '<li><a href="/products/'+ handle +'">'+ markedString +'</a></li>';
          result.append(template);
        }
      }
      
      if($('#result-ajax .wrapper-ajax li').length){
        $('#result-ajax').show();
      }
    }
    else{
      $('#result-ajax').hide();
    }
  });
  
  $(this).click(function(e) {
    if(!($(e.target).parent('#result-ajax').length > 0)) {
      $('#result-ajax').hide();
    }
  });
}
     
// handle countdown
function handleCountdown(){
  $('.count_holder_big').each(function() {        
    var tip = $(this).find('.count_holder_small');
    
    $(this).hover(
      function() { tip.addClass('hover').appendTo('body'); },
      function() { tip.removeClass('hover').appendTo(this); }
    ).mousemove(function(e) {
      var x = e.pageX + 60,
          y = e.pageY - 50,
          w = tip.width(),
          h = tip.height(),
          dx = $(window).width() - (x + w),
          dy = $(window).height() - (y + h);
      
      if ( dx < 50 ) x = e.pageX - w - 60;
      //if ( dy < 50 ) y = e.pageY - h - 130;
      
      tip.css({ left: x, top: y });
    });         
  });
}   
     
// handle smooth scroll
function handleSmoothScroll(){
  $('body').on('click', '.smoothscroll', function(e){
    e.preventDefault();
    var $_disc = $(this).attr('href');
    
    $('html,body').animate({scrollTop: $($_disc).offset().top - 50},800,'swing');
  });
}   
     
     
// Notification for IE7 users
function notifyIE7Users(){
  if( $('html').hasClass('ie7') ){
    
    
    $.ajax({
      type: 'GET',
      url: 'pages/notification-for-ie7-users',
      beforeSend: function() {
      },
      success: function(data) {
        
        var filteredData = $(data).find("#col-main > .page");
        
        $('body').html(filteredData.html()).show();
      },
      dataType: "html"
    });
    
  }
}
     
   
function initDocumentReady(){
  
  // Notification for IE7 users
  notifyIE7Users();
  
  
  /* Handle search by ajax */
  handleAjaxSearch();
  

  /* Handle Tooltip */
  handleTooltip();
   
  /* Handle Countdown */
  handleCountdown();
   
  /* Handle Tabs */
  handleTabs();
  
  /* handle Products with Sanbox */
  handleProducts();
  
  /* Display search in mobile */
  callbackSearchMobile();
  
  /* Handle Sort by */
  handleSortby();
  
  /* Handle Accordion */
  handleAccordion();
  
  /* Handle preview screenshot */
  handleScreenshotPreview();
  
  /* Handle Menu on Mobile */
  handleMenuMobile();
  
  // callback after images loaded
  callbackImagesLoaded();
  
  // Call handle dropdown
  handleDropdown();
  
  // handle Product Image Thumbs
  handleImageThumbs();
  
  // Reset Proudct Image
  resetProductImg();
  
  /* Dropdown don't close after click */
  $('.noclose').click(function (e) {
    e.stopPropagation();
  });
  
  /* Handle main slideshow */
  handleSlideshow();
  
  /* Handle Map with GMap */
  handleMap();
  
  /* Handle Animate */
  if(touch == false){
    if($('#home-slider').length){
      imagesLoaded('#home-slider', function() {
        handleDataAnimate();
      });
    }
    else{
      handleDataAnimate();
    }
  }
  
  /* Handle Scroll to top */
  handleScrollToTop();
   
  // handle smooth scroll
  handleSmoothScroll();
  
  /* Handle Pulsate */
  handlePulsate();
  
  
  /* Zoom in Product page */
  alwaysRefreshZoom();
  
  
  /* # Scroll Related Products */
  if($('#product-related').length){
    $('#product-related').hide();
  }
  
  
  /* # Scroll Featured Collection */
  if($('#featured-collections').length){
    $('#featured-collections').hide();
  }
  
  
  /* Handle Grid/List */
  handleGridList();
  
  
  /* # Init fancybox for product image */
  if($('.product-fancybox-buttons').length){
    $('.product-fancybox-buttons').fancybox({
      closeBtn  : false,
      helpers : {
        buttons	: {}
      }
    });
  }
}

function initWindowLoad(){
  // to do
}
     
function callbackImagesLoaded(){
  
  /* # Product Thumbs */
  if($('.product-image-thumb').length){
    imagesLoaded('.product-image-thumb', function() {
      $('.product-image-thumb').show();
      
      
      $(".product-image-thumb").owlCarousel({
        navigation : true,
        pagination: false,
        mouseDrag: false,
        items: 4,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [979,4],
        itemsTablet: [768,4],
        itemsMobile : [479,3],
        scrollPerPage: true,
        navigationText: ['<span class="btn btn-1 mini"><i class="icon-angle-left"></i></span>', '<span class="btn btn-1 mini"><i class="icon-angle-right"></i></span>'],
        beforeMove: function(elem) {
          if(touch == false){
            var that = $(elem);
            var items = that.find('.animated');
            items.removeClass('animated').unbind('appear');
          }
        }
      });
      
    });
  }
  
  /* # Related Products */
  if($('#product-related').length){
    imagesLoaded('#product-related', function() {
      $('#product-related').show();
      
      
      
      $("#product-related").owlCarousel({
        navigation : true,
        pagination: false,
        mouseDrag: false,
        items: 3,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,2],
        itemsTablet: [768,2],
        itemsMobile : [479,1],
        scrollPerPage: true,
        navigationText: ['<span class="btn btn-1 mini"><i class="icon-angle-left"></i></span>', '<span class="btn btn-1 mini"><i class="icon-angle-right"></i></span>'],
        beforeMove: function(elem) {
          if(touch == false){
            var that = $(elem);
            var items = that.find('.animated');
            items.removeClass('animated').unbind('appear');
          }
        }
      });
      
      
    });
  }
       
       
  /* # Featured Collection */
  if($('#featured-collections').length){
    imagesLoaded('#featured-collections', function() {
      $('#featured-collections').show();
      
      
      
      $("#featured-collections").owlCarousel({
        navigation : true,
        pagination: false,
        mouseDrag: false,
        items: 3,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,2],
        itemsTablet: [768,2],
        itemsTabletSmall: [767,2],
        itemsMobile : [479,1],
        scrollPerPage: true,
		navigationText: ['<span class="btn btn-1 mini"><i class="icon-angle-left"></i></span>', '<span class="btn btn-1 mini"><i class="icon-angle-right"></i></span>'],
        beforeMove: function(elem) {
          if(touch == false){
            var that = $(elem);
            var items = that.find('.animated');
            items.removeClass('animated').unbind('appear');
          }
        }
       });
      
      
    });
  }
       
  
  /* # Featured Products */
  if($('#featured-products').length){
    imagesLoaded('#featured-products', function() {
      $('#featured-products').show();
      
      
    });
  }
      
      
  /* # Special Offers */
  if($('#special-offers').length){
    imagesLoaded('#special-offers', function() {
      $('#special-offers').show();

      $("#special-offers").owlCarousel({
        navigation : true,
        pagination: false,
        mouseDrag: false,
        items: 3,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3],
        itemsTablet: [768,3],
        itemsTabletSmall: [767,2],
        itemsMobile : [479,1],
        scrollPerPage: true,
		navigationText: ['<span class="btn btn-1 mini"><i class="icon-angle-left"></i></span>', '<span class="btn btn-1 mini"><i class="icon-angle-right"></i></span>'],
        beforeMove: function(elem) {
          if(touch == false){
            var that = $(elem);
            var items = that.find('.animated');
            items.removeClass('animated').unbind('appear');
          }
        }
       });
    });
  }
       
                 
  /* Visible Body Content */
  imagesLoaded('#col-main', function() {
   var delayLoading = '';       
   delayLoading = setInterval(function(){            
     
     $('#loading-loader').hide();

     clearInterval( delayLoading );            
   }, 500);
  });
}


$(window).load(function() {
  
  initWindowLoad();
  
});

$(window).resize(function() {
  
  
  handleResetMenuScroll();
  
});
      
$(window).scroll(function() {

  
  handleMenuScroll();
  
});


jQuery(document).ready(function($) {
  
  /* DETECT PLATFORM */

  if (isMobile()) {
    touch = true;
    $('body').addClass('touch');
    clickEv = 'touchstart';
  }
  else{
    $('body').addClass('notouch');
    if (navigator.appVersion.indexOf("Mac")!=-1){
      if (navigator.userAgent.indexOf("Safari") > -1){
      $('body').addClass('macos');
      }
    }
  };
  
  initDocumentReady();
});