/**
 * Look under your chair! console.log FOR EVERYONE!
 *
 * @see http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
var GLOBAL = {

  common : {
    init: function(){
      $('html').removeClass('no-js').addClass('js');
      
      searchPlaceholder();

      $('.add-to-cart').bind( 'click', addToCart );
    }
  },

  templateIndex : {
    init: function(){

    }
  },

  templateProduct : {
    init: function(){
      
    }
  },

  templateCart : {
    init: function(){
      
    }
  }

}



/**
 * Fire function based upon attributes on the body tag.
 * This is the reason for "template" in layout/theme.liquid
 *
 * @see http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */
var UTIL = {

  fire : function(func,funcname, args){
    var namespace = GLOBAL;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
      namespace[func][funcname](args);
    }
  },

  loadEvents : function(){
    var bodyId = document.body.id;

    // hit up common first.
    UTIL.fire('common');

    // do all the classes too.
    $.each(document.body.className.split(/\s+/),function(i,classnm){
      UTIL.fire(classnm);
      UTIL.fire(classnm,bodyId);
    });
  }

};
$(document).ready(UTIL.loadEvents);



/**
 * Popup notify after add to cart
 */
function notifyCart($info){
  var mycart = $('#social-cart-num'),
      mycartTop = mycart.offset().top,
      mycartLeft = mycart.offset().left,
      placeholderdiv = $($info);
  $('body').append(placeholderdiv);
  $(placeholderdiv).hide();
  
  $(placeholderdiv).fadeIn('slow', 'easeInOutExpo',function(){
    
    var zn_pos_top = $(this).offset().top,
        zn_pos_left = $(this).offset().left;
    
    $(this).css({margin:0, left:zn_pos_left, top:zn_pos_top, position:"absolute"}).delay(2000).animate({top:0, left:"auto", right:0, opacity:1}, 3000, 'easeInOutExpo', function(){
      $(this).remove();
    });
    
    $('.product .product-wait').hide();
    
    
    window.location = '/cart';
     
  });
}


/**
 * Ajaxy add-to-cart
 */
function addToCart(e){
  
  if (typeof e !== 'undefined') e.preventDefault();
  
  /* Show loading in Cart info */
  $('#umbrella .cart-loading').removeClass('hide');

  var $this = $(this);
  $this.parents('.product').find('.product-wait').show();

  var form = $this.parents('form');

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    async: true,
    data: form.serialize(),
    dataType: 'json',
    error: addToCartFail,
    success: addToCartSuccess,
    cache: false
  });

  // Hide Modal
  $('.modal').modal('hide');
}

function addToCartSuccess (jqXHR, textStatus, errorThrown){

  $.ajax({
    type: 'GET',
    url: '/cart.js',
    async: true,
    cache: false,
    dataType: 'json',
    success: updateCartDesc
  });

  var $info = '<div class="popupaddcart">Item added to Cart!</div>';
  notifyCart($info);
  

  // Let's get the cart and show what's in it in the cart box.	
  Shopify.getCart(function(cart) {
    Shopify.updateCartInfo(cart, 'cart-info');		
  });
}

function addToCartFail(jqXHR, textStatus, errorThrown){
  var response = $.parseJSON(jqXHR.responseText);
  
  var $info = '<div class="popupaddcart">' + response.description + '</div>';
  notifyCart($info);
  
  /* Hide loading in Cart info */
  $('#umbrella .cart-loading').addClass('hide');
}


/**
 * Enable placeholder switcheroo in older browsers.
 * @see http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text
 */
function searchPlaceholder(){

  if(!Modernizr.input.placeholder){
    $('#top-search-input').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
      })
    });
  }

}
