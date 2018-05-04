/***********************************************************
*
*	mathUtils
*
*	자주사용하는 math 유틸을 jquery의 prototype으로 확장하였다.
*
*	array sum, array average, randomize, distance
*

권장하는 사용법

$.MathUtils.sum(sumArray);
$.MathUtils.average(averageArray);
$.MathUtils.randomize(0, 10); // 0~10 까지 랜덤
$.MathUtils.distance(16, 9, 1920, 0, 0); //1080
$.MathUtils.rgb2hex( "rgb(5, 166, 63)" ); //#05a63f

*
*
*
***********************************************************/
(function ($) {
    $.MathUtils = { //하나의 객체로 캡슐화
        sum: function(array) {
            var total = 0;
            $.each(array, function(index, value) {
                value = $.trim(value);
                value = parseFloat(value) || 0;
 
                total += value;
            });
            return total;
		},
		average: function(array) {
			if($.isArray(array)) {
				return $.sum(array) / array.length;
			}
			return '';
		},
		randomize: function($min, $max, $maxContainBool){
			$maxContainBool = $maxContainBool || true; //max값 포함여부(기본true)
			return Math.floor(Math.random() * ($max - $min + $maxContainBool)) + $min;
		},
		distance: function($A, $a, $B, $Ax, $Bx)
		{
			// 1차 함수를 사용하여 비율을 계산함

			var Ax = $Ax || 0;
			var Bx = $Bx || 0;

			var b = ($B - Bx) / ($A - Ax) * ($a - Ax) + Bx;
			return b;
		},
		
		rgb2hex: function( rgb ){
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
	};
})(jQuery);