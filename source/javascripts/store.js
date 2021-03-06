var Store = {
  
  defaults: {
    cutoffWidth: 768
  },
  
  init: function(page, options) {
    var inPreview = (/\/admin\/design/.test(top.location.pathname));
    var win = $(window);
    var width = $(document).width();
    
    options = $.extend(this.defaults, options);

    // Set the viewport content width to 720 for iPad

    if(width == options.cutoffWidth) {
      $('meta[name=viewport]').attr({ content: 'width=720' });  
    }
    
    // Adjust meta viewport properties when rotating on iOS 
    
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	    var viewportmeta = document.querySelector('meta[name="viewport"]');
	    if (viewportmeta) {
	        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
	        document.body.addEventListener('gesturestart', function () {
	            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
	        }, false);
	    }
	}

    // Vertically center product thumbnails

	$('.product_thumb').each(function() {
        var image = $(this).find('img');
        var img = new Image();
        img.src = image.attr('src') ;
		img.onload = function() {
			if (img.height > 560) { 
				$(image).addClass('no_transform');
			}
		};
    });

    // Set the slideshow for Products if viewport is less than cutoffWidth

    if(page == 'product' && width <= options.cutoffWidth && !inPreview) {
      $('#product_images').flexslider({
        animation: 'slide',
        animationLoop: false, 
        controlsContainer: 'canvas',
        directionNav: false
      });
    }
    
    // Initiate theme slideshow 
    
    $('.flexslider').flexslider({
		animation: "slide"
	});

    // Set up the update cart button to activate after cart-option selection is made
    
    if(page == 'cart') {
      
      var cartForm = $('#cart-form');
      
      $('#checkout-btn').click(function(event) {
        event.preventDefault();
        cartForm.append('<input type="hidden" name="checkout" value="1">').submit();
      });
      
      $('.remove_item').click(function(event) {
        event.preventDefault();
        $(this).closest('li').find('.quantity_input input').val(0);
        cartForm.submit();
      });
      
      cartForm.on('change keyup', '#country, #cart_discount_code, input', function() {
        $('#update-btn-footer').removeClass('disabled');
      });
    }

    // Set up search toggle on click
    
    if(options.showSearch) {
      $('#search a').click(function(event) {
        event.preventDefault();
        $('#search input').show().focus();
        $(this).hide();
      });

      $('#search input').blur(function(event) {
        event.preventDefault();
        $(this).hide();
        $('#search a').show();
      });
    }

    !inPreview && $('body').removeClass('no_transition');
    
  }
};
