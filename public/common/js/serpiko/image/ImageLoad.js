$('img').each(function(e){
	$(this).one("error", function(){
		//$(this).attr('src', '/images/dummy.gif');
		$(this).css('visibility','hidden'); //반대 visible
	});

	$(this).one("load", function(e){});
});