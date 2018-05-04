/*****************************************************************************************************
 *
 * @auth 허정진
 *
 * 에너지모니터링
 *
 * Last update
 *
 * 2016.07.22
 * 
 ***************************************************************************************************** 
 */




$(document).ready(function(){
	
	/*****************************************************************************************************
	 *
	 * toTop 라이브러리 (제이쿼리 코어가 중복되어 호출되면 에러발생 주의)
	 * 
	 ***************************************************************************************************** 
	 */
	var defaults = {
		containerID: 'toTop', // fading element id
		containerHoverID: 'toTopHover', // fading element hover id
		scrollSpeed: 1200,
		easingType: 'linear' ,
		min: 10
	};
	
	jQuery().UItoTop({ easingType: 'easeOutQuart' });


	/*****************************************************************************************************
	 *
	 * animationHover animate css 라이브러리
	 * 
	 ***************************************************************************************************** 
	 */
	 var animationHover;
	 animationHover = function(element, animation){
		element = $(element);
		element.hover(
			function() {
				element.addClass('animated ' + animation);        
			},
			function(){
				//wait for animation to finish before removing classes
				window.setTimeout( function(){
					element.removeClass('animated ' + animation);
				}, 2000);         
			});
	}

	/*****************************************************************************************************
	 *
	 * date picker 라이브러리
	 * 
	 ***************************************************************************************************** 
	 */
//	$('.date-time').datetimepicker({
//		format: 'YYYY-MM-DD HH:mm:ss'
//	});

	/*
	*************************************************************************************************
	*
	* 부트스트랩 툴팁
	*
	*************************************************************************************************
	*/
	$("[data-toggle='tooltip']").tooltip();




	/*
	*************************************************************************************************
	*
	* aside
	*
	*************************************************************************************************
	*/
	var _asideToggleBool = false;

	function asideSlide(){
		
		//main1.html
		if( $("#wrap").hasClass('home') ){
			
			if( _asideToggleBool == true ){
				//접힘
				$("#aside").css("right", "-360px");
				$(".handle").html('<span class="glyphicon glyphicon-chevron-left"></span>');
				$("body").addClass("aside-toggled");
			}else{
				//펼침
				$("#aside").css("right", "0")
				$(".handle").html('<span class="glyphicon glyphicon-chevron-right"></span>');
				$("body").removeClass("aside-toggled");
			}
		}
	
		// main2.html	
		if( $("#wrap").hasClass('perLoad') ){
			
			if( _asideToggleBool == true ){
				//접힘
				$("#aside").css("left", "-310px");
				$("body").addClass("aside-toggled");
			}else{
				//펼침
				$("#aside").css("left", "0")
				$("body").removeClass("aside-toggled");
			}
		}
		
	}

	$(document).on("click touchstart", "#aside .handle", function(e){
		e.preventDefault();

		_asideToggleBool = !_asideToggleBool;
		asideSlide();
	});
	
	$("#aside").swipe( {
		//Generic swipe handler for all directions
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			//$(this).text("You swiped " + direction );	
			if( direction  == "right" ){
				_asideToggleBool = !_asideToggleBool;
				asideSlide();
			}
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
	   threshold:0,
		allowPageScroll:"vertical"
	});
	
	

	/* --------------------------------------------------------
	* response
	-----------------------------------------------------------*/
	function response(){
		var screenW=$(window).width();
		var screenH=$(window).height();
		$(window).scroll(function(){
			var scroll_y = $(window).scrollTop();
		});
		
		//메뉴가1일때
		if( screenW <= 1620 ) {
			//접힘
			_asideToggleBool = true;
			asideSlide();
		}else{
			//펼침
			_asideToggleBool = false;
			asideSlide();
		}
	}

	response();
	$(window).on('resize',function(){response();});


	//////////////////////////////////////////////////////////////////////////////
});

