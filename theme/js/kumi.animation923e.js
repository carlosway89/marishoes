
$(document).ready(function(){
	moduleFullWidthGallery();
}); 
/* end ready function */

var txt_modCont             = "#module-container-holder";  

/*================= FULL WIDTH GALLERY =====================*/
function moduleFullWidthGallery(){

	var textPageInstanceHolder  = $( txt_modCont);
	var textPageInstance        = $( "#module-full-width-gallery", textPageInstanceHolder);
	if(textPageInstance.length <= 0 ){return;}
		  
	var galleryItem             = $(".full-width-item", textPageInstance);
	galleryItem.hover(
		function(event){ customHoverAnimation( "over", event, $(this), $("#thumb-image-hover", this) ); },
		function(event){ customHoverAnimation( "out", event, $(this), $("#thumb-image-hover", this) ); }
	);
	
	
}

function customHoverAnimation( type, event, parent, child ){
	var directionCSS = getDirectionCSS( parent, { x : event.pageX, y : event.pageY } );
	if( type == "over" ){
		child.removeClass(); child.css("left", directionCSS.from.val1); child.css("top", directionCSS.from.val2);
		TweenMax.to( child, .3, { css:{ left:directionCSS.to.val1, top: directionCSS.to.val2},  ease:Sine.easeInOut });
	}
	else if( type == "out" ){ TweenMax.to( child, .3, { css:{ left:directionCSS.from.val1, top: directionCSS.from.val2},  ease:Sine.easeInOut }); }
}

function getDirectionCSS( $element, coordinates ){
	/** the width and height of the current div **/
	var w = $element.width(), h = $element.height(),
		/** calculate the x and y to get an angle to the center of the div from that x and y. **/ /** gets the x value relative to the center of the DIV and "normalize" it **/
		x = ( coordinates.x - $element.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
		y = ( coordinates.y - $element.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
		/** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
		/** first calculate the angle of the point, add 180 deg to get rid of the negative values divide by 90 to get the quadrant
		add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
		direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;
		var fromClass, toClass;
		switch( direction ) {
			case 0:/* from top */ 
				fromClass = {instance:'hover-slideFromTop', val1: "0px", val2:"-100%"};                    
				toClass	  = {instance:'hover-slideTopLeft', val1: "0px", val2:"0px"};
				break;
			case 1:/* from right */
				fromClass = {instance:'hover-slideFromRight', val1: "100%", val2:"0px"};
				toClass	  = {instance:'hover-slideTopLeft', val1: "0px", val2:"0px"};
				break;
			case 2:/* from bottom */
				fromClass = {instance:'hover-slideFromBottom', val1: "0px", val2:"100%"};
				toClass	  = {instance:'hover-slideTopLeft', val1: "0px", val2:"0px"};
				break;
			case 3:/* from left */
				fromClass = {instance:'hover-slideFromLeft', val1: "-100%", val2:"0px"};
				toClass	  = {instance:'hover-slideTopLeft', val1: "0px", val2:"0px"};
				break;
		};
	return { from : fromClass, to: toClass };
}

function animateThumb( img ){ TweenMax.to( img, 0.4, {css:{opacity:"1"}, easing:Sine.easeOut}); }

