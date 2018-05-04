(function($){

	$.fn.AnimateHover = function(options){

		var obj = {
			animation	: "bounce",
			control		: null
		};

		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		div_id.hover(function(e){
			
			var currentMode;

			if( obj.control != null ){
				currentMode = obj.control.model.currentMode; //get
				if( currentMode == "edit" ) return; // edit모드 리턴
			}

			div_id.addClass('animated ' + obj.animation);        
			//wait for animation to finish before removing classes
			window.setTimeout( function(){
				div_id.removeClass('animated ' + obj.animation);
			}, 2000);         
		});

		return $(this);
	}
})(jQuery);