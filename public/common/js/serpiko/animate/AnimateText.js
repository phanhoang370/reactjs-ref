// animate Text by jquery Prototype
(function($){
	$.fn.AnimateText = function(options){
		
		var ver = "2016.10.30. 허정진";

		var obj = {
			num : 100, //기본값
			duration : 1000, //시간
			easing : "swing", // 움직이는 형태 : swing, easeOutBounce, easeOutExpo

			prevValueEnable : false, //엘리먼트에 표시된 수치에서 표현될지(한마디로 과거값에서 시작), 0에서 시작할지 옵션
			
			//수치 표현 옵션
			postfix : "", //접두어
			prefix : "", //접미사
			useFixedValue : false //(이미 한가지의 용량및 단위로 고정되어있으면 postfix, prefix를 사용하고 그렇지 않으면) 애니메이션이 끝나고 이 값으로 고정합니다. 
		};

		$.extend(obj, options);

		var tg = $(this);
		var div_id = tg.prop('id') || tg.attr('id');
		
		var prevNum = 0;
		if( obj.prevValueEnable == true ){
			prevNum = parseInt( tg.text(), 10);
		}

		$({someValue: prevNum}).stop().animate( {someValue: obj.num}, {
			duration : obj.duration,
			easing : obj.easing, 
			step : function(now, fx) { // called on every step
				// Update the element's text with rounded-up value:
				tg.text( obj.postfix +" "+ Math.round(this.someValue) + obj.prefix );
			},
			complete:function(){
				
				var num = Number(obj.num);
				var reg = /^[-|+]?\d+$/; //is_integer? (정수인지 음수부호를 포함하여 검사)
				if( reg.test(num) == false ) num = num.toFixed(2);
				
				if( obj.useFixedValue ){
					tg.text( obj.postfix +" "+ NumberToComma(obj.useFixedValue) + obj.prefix );
				}else{
					tg.text( obj.postfix +" "+ $.number(num, 2) + obj.prefix );
				}
			}
		});//end. animate

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);

	} //AnimateText (jquery prototype)
})(jQuery); //enc. closer