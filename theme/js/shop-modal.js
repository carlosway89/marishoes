
jQuery(document).ready(function($) {

  $('#quick-shop-modal').on( 'shown', function () {

    imagesLoaded( '#quick-shop-modal #quick-shop-image', function() {
            /*$('#quick-shop-image .product-image-thumb').mCustomScrollbar({
              horizontalScroll:true,
              scrollInertia:100
            });*/

        $('#quick-shop-image .product-image-thumb').owlCarousel({
          navigation : true,
          pagination: false,
          items: 3,
          itemsDesktop : [1199,3],
          itemsDesktopSmall : [979,3],
          itemsTablet: [768,3],
          itemsMobile : [479,3],
          scrollPerPage: true,
          navigationText: ['<span title="Previous" class="btn btn-1 mini"><i class="icon-angle-left"></i></span>', '<span title="Next" class="btn btn-1 mini"><i class="icon-angle-right"></i></span>']
        });

        var delayLoadingQS = '';       
        delayLoadingQS = setInterval(function(){            

          quickShopModalBackground.hide();
          $('#quick-shop-modal .modal-body').resize();

          clearInterval( delayLoadingQS );            
        }, 500);
        
    });

    $('#quick-shop-modal').on( 'hidden', function () {
      var owl = $('#quick-shop-image .product-image-thumb').data('owlCarousel');
      if(owl){
        owl.destroy();
      }
      $('#quick-shop-image').empty();
    });
  });

var quickShopModal = $('#quick-shop-modal');
var quickShopContainer = $('#quick-shop-container');
var quickShopImage = $('#quick-shop-image');
var quickShopTitle = $('#quick-shop-title');
var quickShopDescription = $('#quick-shop-description');
var quickShopRelative = $('#quick-shop-relative');
var quickShopVariantsContainer = $('#quick-shop-variants-container');
var quickShopPriceContainer = $('#quick-shop-price-container');
var quickShopAddButton = $('#quick-shop-add');
var quickShopAddToCartButton = $('#quick-shop-add');
var quickShopProductActions = $('#quick-shop-product-actions');
var quickShopModalBackground = $('#quick-shop-modal .quick-shop-modal-bg');

$('body').on(clickEv, '.quick_shop:not(.unavailable)', function(event){

  quickShopModalBackground.show();

  var modal = $(this).attr('data-target');
  $(modal).modal();

  var handle = $(this).attr('data-handle');
  Shopify.getProduct(handle);

  Shopify.onProduct = function(product) {

    quickShopModalBackground.show();
    var quickShopImage = $('#quick-shop-image');

    var selectedProduct = product;
    var selectedProductID = selectedProduct.id;

        // Update add button
        quickShopAddButton.data('product-id', selectedProductID);
        
        // Update image
        quickShopImage.empty();
        quickShopImage.append('<a href="/products/' + selectedProduct.handle + '" alt="" class="main-image"><img class="img-zoom img-responsive" src="'+ Shopify.resizeImage(selectedProduct.featured_image, 'large') +'" data-zoom-image="'+ selectedProduct.featured_image +'" alt="" /><span class="main-image-bg"></span></a>');
        
        quickShopImage.append('<div id="gallery_main_qs" class="product-image-thumb scroll scroll-mini"></div>');
        
        var qs_images = selectedProduct.images;
        if(qs_images.length > 1){
          $.each(qs_images, function(index, value) {
            if(index)
              quickShopImage.find('.product-image-thumb').append('<a target="_blank" class="image-thumb" data-image="'+ Shopify.resizeImage(value, 'large') +'" data-zoom-image="'+ value +'" href="'+ value +'" alt=""><img src="'+ Shopify.resizeImage(value, 'small') +'" alt="" /></a>');
            else
              quickShopImage.find('.product-image-thumb').append('<a target="_blank" class="image-thumb active" data-image="'+ Shopify.resizeImage(value, 'large') +'" data-zoom-image="'+ value +'" href="'+ value +'" alt=""><img src="'+ Shopify.resizeImage(value, 'small') +'" alt="" /></a>');
          });
        }
        
        alwaysScrollThumbsQS();
        
        
        // Update title
        quickShopTitle.html('<a href="/products/' + selectedProduct.handle + '">' + selectedProduct.title + '</a>');
        
        // Update description
        quickShopDescription.html(selectedProduct.description);
        
        // Generate variants
        var productVariants = selectedProduct.variants;
        var productVariantsCount = productVariants.length;
        
        quickShopPriceContainer.empty();
        quickShopVariantsContainer.empty();
        quickShopAddToCartButton.removeAttr('disabled').fadeTo(200,1);
        
        if (productVariantsCount > 1) {

          // Reveal variants container
          quickShopVariantsContainer.show();
          
          // Build variants element
          var quickShopVariantElement = $('<select>',{ 'id': ('#quick-shop-variants-' + selectedProductID) , 'name': 'id'});
          var quickShopVariantOptions = '';
          
          for (var i=0; i < productVariantsCount; i++) {
            quickShopVariantOptions += '<option value="'+ productVariants[i].id +'">'+ productVariants[i].title +'</option>'
          };
          
          // Add variants element to page
          quickShopVariantElement.append(quickShopVariantOptions);
          quickShopVariantsContainer.append(quickShopVariantElement);
          
          // Bind variants to OptionSelect JS
          new Shopify.OptionSelectors(('#quick-shop-variants-' + selectedProductID), { product: selectedProduct, onVariantSelected: selectOptionCallback });
          
          // Add label if only one product option and it isn't 'Title'.
          if (selectedProduct.options.length == 1 && selectedProduct.options[0] != 'Title' ){
            $('#quick-shop-product-actions .selector-wrapper:eq(0)').prepend('<label>'+ selectedProduct.options[0].name +'</label>');
          }
          
          // Auto-select first available variant on page load.
          var found_one_in_stock = false;
          for (var i=0; i < selectedProduct.variants.length; i++) {

            var variant = selectedProduct.variants[i];
            if(variant.available && found_one_in_stock == false) {

              found_one_in_stock = true;
              for (var j=0; j < variant.options.length; j++){

                $('.single-option-selector:eq('+ j +')').val(variant.options[j]).trigger('change');
                
              }
            }
          }
          
        } else { // If product only has a single variant

          // Hide unnecessary variants container
          quickShopVariantsContainer.hide(); 
          
          // Build variants element
          var quickShopVariantElement = $('<select>',{ 'id': ('#quick-shop-variants-' + selectedProductID) , 'name': 'id'});
          var quickShopVariantOptions = '';
          
          for (var i=0; i < productVariantsCount; i++) {
            quickShopVariantOptions += '<option value="'+ productVariants[i].id +'">'+ productVariants[i].title +'</option>'
          };
          
          // Add variants element to page
          quickShopVariantElement.append(quickShopVariantOptions);
          quickShopVariantsContainer.append(quickShopVariantElement);
          
          
          // Update the add button to include correct variant id
          quickShopAddToCartButton.data('variant-id', productVariants[0].id);
          
          // Determine if product is on sale
          if ( productVariants[0].compare_at_price > 0 && productVariants[0].compare_at_price > productVariants[0].price ) {
            quickShopPriceContainer.html('<del class="price_compare">'+ Shopify.formatMoney(productVariants[0].compare_at_price, "&euro;{{amount}}") + '</del>' + '<span class="price_sale">'+ Shopify.formatMoney(productVariants[0].price, "&euro;{{amount}}") +'</span>');
          } else {
            quickShopPriceContainer.html('<span class="price">'+ Shopify.formatMoney(productVariants[0].price, "&euro;{{amount}}") + '</span>' );
          }
          
        } // END of (productVariantsCount > 1)
        
        
      }

    });

    /* selectOptionCallback
    ===================================== */
    var selectOptionCallback = function(variant, selector) {

      // selected a valid and in stock variant
      if (variant && variant.available) {

        quickShopAddToCartButton.data('variant-id', variant.id);
        
        if ($.browser.msie) {
          quickShopAddToCartButton.removeAttr('disabled').show(); 
        } else {
          quickShopAddToCartButton.removeAttr('disabled').fadeTo(200,1); 
        }
        
        // determine if variant is on sale
        if ( variant.compare_at_price > 0 && variant.compare_at_price > variant.price ) {
          quickShopPriceContainer.html('<del class="price_compare">'+ Shopify.formatMoney(variant.compare_at_price, "&euro;{{amount}}") + '</del>' + '<span class="price_sale">'+ Shopify.formatMoney(variant.price, "&euro;{{amount}}") +'</span>');
        } else {
          quickShopPriceContainer.html('<span class="price">'+ Shopify.formatMoney(variant.price, "&euro;{{amount}}") + '</span>' );
        };
        
        // selected an invalid or out of stock variant 
      } else {

        // variant doesn't exist
        if ($.browser.msie) {
          quickShopAddToCartButton.attr('disabled', 'disabled').hide();
        } else {
          quickShopAddToCartButton.attr('disabled', 'disabled').fadeTo(200,0.5);
        }
        var message = variant ? "Sold Out" : "Unavailable";    
        quickShopPriceContainer.html('<span class="unavailable">' + message + '</span>');
        
      }
      
      
    }
    
  });