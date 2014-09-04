Shopify.updateCartInfo = function(cart, cart_summary_id, cart_count_id) {
      if ((typeof cart_summary_id) === 'string') {
        var cart_summary = jQuery('#' + cart_summary_id);
        if (cart_summary.length) {
          // Start from scratch.
          cart_summary.empty();
          // Pull it all out.
          
          jQuery.each(cart, function(key, value) {
            if (key === 'items') {
              
              if (value.length) {
                jQuery('<div class="items control-container"></div>').appendTo(cart_summary);
                var table = jQuery('#' + cart_summary_id + ' div.items');
                
                jQuery.each(value, function(i, item) {
                  jQuery('<div class="row-fluid control-group"><div class="span4 cart-left"><a class="cart-close" title="Remove" href="javascript:;" onclick="Shopify.removeItem(' + item.variant_id + ')"><i class="icon-remove-circle"></i></a><a class="cart-image" href="' + item.url + '"><img src="' + Shopify.resizeImage(item.image, 'small') + '" alt="" title=""/></a></div><div class="span8 text-left cart-right"><div class="cart-title uppercase"><a href="' + item.url + '"><h4>' + item.title + '</h4></a></div><div class="cart-prices"><strong>' + Shopify.formatMoney(item.price, "&euro;{{amount}}") + '</strong> x ' + item.quantity + '</div></div></div>').appendTo(table);
                });
                
                jQuery('<div class="actions control-container"></div>').appendTo(cart_summary);
                var action = jQuery('#' + cart_summary_id + ' div.actions');
                jQuery('<div class="row-fluid"><div class="span4"><span class="uppercase">Total</span></div><div class="span8 text-left"><strong>' + Shopify.formatMoney(cart.total_price, "&euro;{{amount}}") + '</strong></div></div>').appendTo(action);
                jQuery('<div class="last text-left"><a class="btn btn-1" href="/checkout">Checkout</a><a class="btn btn-2" href="/cart">View Cart</button></div>').appendTo(action);
              }
              else {
                jQuery('<div class="row-fluid text-center empty"><em>Your shopping cart is empty. Check out our <a href="/collections/all">catalog</a> to see what\'s available.</em></div>').appendTo(cart_summary);
              }
            }
          });
        }
      }
      // Update cart count.
      if ($('#social-cart-num').length) {
        $('#social-cart-num').html(cart.item_count);
      }
      
      /* Update cart info */
      updateCartDesc(cart);
    };
    
    
    // Update Cart
    Shopify.onCartUpdate = function(cart) {
      Shopify.updateCartInfo(cart, 'cart-info', 'shopping-cart');
    };
    
    
    // Remove item
    Shopify.removeItem = function(variant_id, callback) {
      
      /* Show loading in Cart info */
      $('#umbrella .cart-loading').removeClass('hide');
      
      var params = {
        type: 'POST',
        url: '/cart/change.js',
        data:  'quantity=0&id='+variant_id,
        dataType: 'json',
        success: function(cart) { 
        if ((typeof callback) === 'function') {
        callback(cart);
      }
      else {
        Shopify.onCartUpdate(cart);
      }
    },
      error: function(XMLHttpRequest, textStatus) {
        Shopify.onError(XMLHttpRequest, textStatus);
      }
    };
    jQuery.ajax(params);
    };
    
    function updateCartDesc(data){
      var $cartNumberText = $('#umbrella .number');
      
      switch(data.item_count){
        case 0:
          $cartNumberText.text('0');
          break;
        case 1:
          $cartNumberText.text('1');
          break;
        default:
          $cartNumberText.text(data.item_count);
          break;
      }
      
      
      
       /* Hide loading in Cart info */
       $('#umbrella .cart-loading').addClass('hide');
       }
       
       $(window).load(function() {
         // Let's get the cart and show what's in it in the cart box. 
         Shopify.getCart(function(cart) {
           
           Shopify.updateCartInfo(cart, 'cart-info');   
         });
       });
       
       /* customer address helper */
       Shopify.CustomerAddress = {
         toggleForm: function(id) {
           var editEl = document.getElementById('edit_address_'+id);
           var toolEl = document.getElementById('tool_address_'+id);      
           editEl.style.display = editEl.style.display == 'none' ? '' : 'none';
           return false;    
         },
         
         toggleNewForm: function() {
           var el = document.getElementById('add_address');
           el.style.display = el.style.display == 'none' ? '' : 'none';
           return false;
         },
         
         destroy: function(id, confirm_msg) {
           if (confirm(confirm_msg || "Are you sure you wish to delete this address?")) {
             Shopify.postLink('/account/addresses/'+id, {'parameters': {'_method': 'delete'}});
           }      
         }
       }