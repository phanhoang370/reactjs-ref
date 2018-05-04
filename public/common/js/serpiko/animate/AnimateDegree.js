//부하 시계
/*
window.setInterval(function(){
	// !!. $.MathUtils.randomize => ./common/js/jquery/jquery.serpiko.js
	var degree = $.MathUtils.randomize(0, 360);
	AnimateDegree("load_needle", degree, true);
}, 2000);
*/



//AnimateDegree : 애니메이트 Degree
function AnimateDegree($tgID, $deg, $prevValueEnable){
	
	//
	var ver = "2016.10.27. 허정진";
	var tg = $("#"+$tgID);
	var deg = $deg || 0;
	var prevValueEnable = $prevValueEnable || false;
	var prevNum = 0;
	
	//
	if( prevValueEnable == true ){
		var angle = 0;
		var matrix = tg.css("-webkit-transform") ||
			tg.css("-moz-transform")    ||
			tg.css("-ms-transform")     ||
			tg.css("-o-transform")      ||
			tg.css("transform");
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];

			//아크탄젠트(y,x) * (180/파이) = 라디안(호도법)을 Degree(360도)로 변환한다.
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI)); 
		}
			
		prevNum = (angle < 0) ? angle + 360 : angle % 360; // 모듈러스 계산법(angle % 360). 일단 360초과를 위해 넣어놓자.
	}

	$({someValue: prevNum}).stop().animate({someValue: deg}, {
		duration : 1000,
		easing : "swing", // 움직이는 형태 : swing, easeOutBounce, easeOutExpo
		step : function(now, fx) { // called on every step
			// Update the element's text with rounded-up value:
			//tg.css('-webkit-transform','rotate('+now+'deg)'); 
			//this.someValue
			tg.css("transform", "rotate("+now+"deg)");
		},
		complete:function(){
			
			var num = Number(deg);
			var reg = /^[-|+]?\d+$/; //is_integer? (정수인지 음수부호를 포함하여 검사)
			if( reg.test(num) == false ) num = num.toFixed(2);
		}
	});//end. animate
} // AnimateDegree