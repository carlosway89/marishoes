// initialize multi selector for product
jQuery(document).ready(function($){

  /* selectCallback */
  var selectOptionsCallback = function(variant, selector) {

    var add_to_cart = '#add-to-cart';
    var $price = '#purchase-' + selector.product.id.toString() + ' .detail-price';

    if (variant && variant.available) {
      // selected a valid variant
      $(add_to_cart).removeClass('disabled').removeAttr('disabled'); // remove unavailable class from add-to-cart button, and re-enable button

      if(variant.compare_at_price == null){
        $($price).html('<span class="price">'+Shopify.formatMoney(variant.price, "&euro;{{amount}}")+'</span>');


      } else {
        $($price).html('<del class="price_compare">' + Shopify.formatMoney(variant.compare_at_price, "&euro;{{amount}}") + '</del>' + '<span class="price_sale">'+Shopify.formatMoney(variant.price, "&euro;{{amount}}") + '</span>');
      }

    } else {
      $(add_to_cart).addClass('disabled').attr('disabled', 'disabled'); // set add-to-cart button to unavailable class and disable button
      var message = variant ? "Sold Out" : "Unavailable";
      $($price).html('<span class="unavailable">' + message + '</span>');
    }

    if (variant && variant.inventory_quantity && variant.inventory_management == 'shopify') {
      jQuery("#stock").html(variant.inventory_quantity).parent().show(); 
    }
    else{
      jQuery("#stock").parent().hide(); 
    }


    if (variant && variant.sku) { 
      jQuery("#sku").html(variant.sku).parent().show(); 
    }
    else{
      jQuery("#sku").parent().hide(); 
    }
    //Swapping images JS
    $('.product-image-thumb img[alt="'+ variant.title +'"]').parent().trigger('click');
  };

// Add label if only one product option and it isn't 'Title'.
// Auto-select first available variant on page load.
$('.single-option-selector:eq(0)').val("Default Title").trigger('change');

});