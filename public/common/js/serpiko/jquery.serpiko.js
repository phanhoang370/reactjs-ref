/***********************************************************************************************************************
*
*	Extended using a common script, jQuery Chaining / Class / Utils.
* 
*	ver : v1.5.3
*
*	Auth : 허정진
* 
*	path : common/js/jquery/jquery.serpiko.js
*
*	Email : serpiko@primarynet.co.kr
*
*   Blog : serpiko.tistory.com
*	
*	Last update : 2016.10.30
*
***********************************************************************************************************************/




/***********************************************************
*
*	Object.length
*
*	Object의 key를 기준으로 갯수를 세서 반환한다.
*
*	마치 배열의 length메서드와 똑같은 형태와 기능을 한다.
*

권장하는 사용법

var myobj = {"my":"Dragonball", "age":34, "hobby":"computer"};
console.log(   getObjectLength(myobj)   ); //3

//*보류
var myobj = {"my":"Dragonball", "age":34, "hobby":"computer"};
console.log(   myobj.length()   ); //3

*
*
*
***********************************************************/
/*
Object.prototype.length = function() {
	var size = 0, key;
	for (key in this) {
		if (this.hasOwnProperty(key)) size++;
	}
	return size;
};
*/
Object.defineProperty(Object.prototype, 'Count',{
	value : (function(){
				var size = 0, key;
				for (key in this) {
					if (this.hasOwnProperty(key)) size++;
				}
				return size;
			})(),
	enumerable : false
});

function getObjectLength($obj){
	var size = 0, key;
	for (key in $obj) {
		if ($obj.hasOwnProperty(key)) size++;
	}
	return size;
}

/*
*
* 사이즈와 3자릿수 단위의 콤마
*/
//numberToSize, numberToComma : 사이즈 표기와 3자릿수 콤마
function numberToSize($x, $type) {
	
	var type = $type || "file";
	var prefix = new Array();
	var a = 1024;

	if( type == "file" ){
		prefix = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
	}else if ( type == "w" ){
		prefix = ['w', 'kw', 'Mw', 'Gw', 'Tw', 'Pw'];
		a = 1000;
	}else if ( type == "wh" ){
		prefix = ['wh', 'kwh', 'Mwh', 'Gwh', 'Twh', 'Pwh'];
		a = 1000;
	}

	//log : y가 a의 거듭제곱 이라면, 밑이 a 이고 진수가 y인 로그 x가 된다.
	var y = Math.floor(Math.log($x) / Math.log(a));

	//Math.pow로 1024의 e제곱 값을 구한다.
	return ($x / Math.pow(a, y)).toFixed(2) + " " + prefix[y];
};

function numberToComma(x) {
	return String(x).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};



/***********************************************************
*
*	getRotationDegrees
*
*	element의 Degree를 알아낸다 (원주율 x )
*
*

권장하는 사용법

angle1 = getRotationDegrees(  $('#myDiv')  );
angle2 = getRotationDegrees(  $('.mySpan a:last-child')  );

*
*
*
***********************************************************/
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}


/*
프로젝트에 함수 충돌을 위해서 주석처리

GetSeparationStrTok("12월", "월"); //12

function GetSeparationStrTok($str, $strTok){
	var idx = $str.indexOf($strTok) + 1; // grp_1
	var n = parseInt($str.substr(idx), 10);  // "1"
	//var n = parseInt($str.substr(0, idx), 10);  // "grp_"

	return n;
}
*/

/***********************************************************
*
*	parseJson
*
*	string으로된 json 파서
*
*	parseJson( param:json )
*

권장하는 사용법

var json = '{"type":"network","divid":"1"}';
var d = parseJson( json );
console.log(  d.type );

*
*
*
***********************************************************/
var _rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
function parseJson($data){
	//if( typeof $data !== "string" || $data ) return null;

	// Attempt to parse using the native JSON parser first
	// 첫번째로 네이티브 JSON 파서를 이용해서 분석을 시도한다.
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( $data + "" );
	}

	var requireNonComma,
		depth = null,
		str = Trim( $data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	// 무효(및 위험) 입력검사에 대해서 유효 토큰을 제외하고 모두 제거한다.
	return str && !Trim( str.replace( _rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() : 
		function(){ throw new Error( "Invalid JSON: " + $data ) }; 
}


/***********************************************************
*
*	mathUtils
*
*	자주사용하는 math 유틸을 jquery의 prototype으로 확장하였다.
*
*	array sum, array average, randomize, distance
*

권장하는 사용법

$.mathUtils.sum(sumArray);
$.mathUtils.average(averageArray);
$.mathUtils.randomize(0, 10); // 0~10 까지 랜덤
$.mathUtils.distance(16, 9, 1920, 0, 0); //1080

*
*
*
***********************************************************/
(function ($) {
    $.mathUtils = { //하나의 객체로 캡슐화
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
		}
	};
})(jQuery);


/***********************************************************
*
*	removeClassGradientPattern 제이쿼리 체이닝
*	
*	엘리먼트에 부여된 "gradient-red, gradient-gray ... 등 gradient- 로 시작된 클래스를 제거한다.
*
*
***********************************************************/
(function($){
	$.fn.removeClassGradientPattern = function(){
		
		var tg = $(this);
		tg.removeClass(function(index,css){ return (css.match (/(^|\s)gradient-\S+/g) || []).join(' '); });
		return $(this);
	}
})(jQuery);




/***********************************************************
*
*	AnimateCSS,AnimateHover,AnimateClick 제이쿼리 체이닝
*
*	엘리먼트에 애니메이션을 부여한다.
*
*	주의. 반드시 animate.css가 있어야함. 기본값 : bounce
*

권장하는 사용법

$("#p5").AnimateCSS();
$("#p5").AnimateHover({animation:"flipOutY"});

bounce
flash
pulse
rubberBand
shake
headShake
swing
tada
wobble
jello
bounceIn
bounceInDown
bounceInLeft
bounceInRight
bounceInUp
bounceOut
bounceOutDown
bounceOutLeft
bounceOutRight
bounceOutUp
fadeIn
fadeInDown
fadeInDownBig
fadeInLeft
fadeInLeftBig
fadeInRight
fadeInRightBig
faŌ InUp
fadeInUpBig
fadeOut
fadeOutDown
fadeOutDownBig
fadeOutLeft
fadeOutLeftBig
fadeOutRight
fadeOutRightBig
fadeOutUp
fadeOutUpBig
flipInX
flipInY
flipOutX
flipOutY
lightSpeedIn
lightSpeedOut
rotateIn
rotateInDownLeft
rotateInDownRight
rotateInUpLeft
rotateInUpRight
rotateOut
rotateOutDownLeft
rotateOutDownRight
rotateOutUpLeft
rotateOutUpRight
hinge
rollIn
rollOut
zoomIn
zoomInDown
zoomInLeft
zoomInRight
zoomInUp
zoomOut
zoomOutDown
zoomOutLeft
zoomOutRight
zoomOutUp
slideInDown
slideInLeft
slideInRight
slideInUp
slideOutDown
slideOutLeft
slideOutRight
slideOutUp

$("#p5").AnimateClick();

*
*
*
***********************************************************/
(function($){

	$.fn.AnimateCSS = function(options){

		var obj = {
			animation	: "bounce"
		};

		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		div_id.addClass('animated ' + obj.animation);        
		window.setTimeout( function(){
			div_idName.removeClass('animated ' + obj.animation);
		}, 1000);

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);
	}
})(jQuery);

(function($){

	$.fn.AnimateHover = function(options){

		var obj = {
			animation	: "bounce"
		};

		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		div_id.hover(
		function() {
			div_id.addClass('animated ' + obj.animation);        
			//wait for animation to finish before removing classes
			window.setTimeout( function(){
				div_id.removeClass('animated ' + obj.animation);
			}, 2000);         
  
		});

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);
	}
})(jQuery);

(function($){

	$.fn.AnimateClick = function(options){

		var obj = {
			animation	: "bounce"
		};

		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		div_id.click(
		function() {
			div_id.addClass('animated ' + obj.animation);        
			//wait for animation to finish before removing classes
			window.setTimeout( function(){
				div_id.removeClass('animated ' + obj.animation);
			}, 2000);         
  
		});

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);
	}
})(jQuery);






/***********************************************************
*
*	AnimateText
*
*	엘리먼트의 텍스트에 애니메이션을 부여한다.
*

권장하는 사용법

$("#ani_num").AnimateText({num: randNum, prevValueEnable:true, useFixedValue: 100});

*
*
*
***********************************************************/
/*
프로젝트에 함수 충돌을 위해서 주석처리
// animate Text by jquery Prototype
(function($){
	$.fn.AnimateText = function(options){
		
		var ver = "2016.11.03. 허정진";

		var obj = {
			num : 100, //기본값
			duration : 2000, //시간
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

		$({someValue: prevNum}).stop().animate({someValue: obj.num}, {
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
					tg.text( obj.postfix +" "+ obj.useFixedValue + obj.prefix );
				}else{
					tg.text( obj.postfix +" "+ $.number(num, 2) + obj.prefix );
				}
			}
		});//end. animate

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);

	} //AnimateText (jquery prototype)
})(jQuery); //enc. closer
*/




/*****************************************************************************************************
*
* FuncName : AnimateDegree( $tgID, $deg, $prevValueEnable )
*
* Descr : 엘리먼트에 degree 기반 애니메이션을 부여한다.
*
*		  AnimateDegree("load_needle", 180, true);
*
* Auth : 허정진
* 
* ver : 2016.10.29 
*
*****************************************************************************************************/
/*
프로젝트에 함수 충돌을 위해서 주석처리
function AnimateDegree($tgID, $deg, $prevValueEnable){
	
	var ver = "2016.10.27. 허정진";
	var tg = $("#"+$tgID);
	var deg = $deg || 0;
	var prevValueEnable = $prevValueEnable || false;
	
	var prevNum = 0;
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
		duration : 2000,
		easing : "swing", // 움직이는 형태 : swing, easeOutBounce, easeOutExpo
		step : function(now, fx) { // called on every step
			// Update the element's text with rounded-up value:
			//tg.css('-webkit-transform','rotate('+now+'deg)'); 
			tg.css("transform", "rotate("+now+"deg)");
		},
		complete:function(){
			
			var num = Number(deg);
			var reg = /^[-|+]?\d+$/; //is_integer? (정수인지 음수부호를 포함하여 검사)
			if( reg.test(num) == false ) num = num.toFixed(2);
		}
	});//end. animate
} // AnimateDegree
*/



/*****************************************************************************************************
*
* ClassName : ProgressClass( $tgID )
*
* Descr : 부트스트랩의 프로그레스바를 컨트롤 합니다.
*
*		  AnimateDegree("load_needle", 180, true);
*
* Auth : 허정진
* 
* ver : 2016.10.27
*
*

권장하는 사용법

<div id='progress_1_1' class="progress">
	<div class="progress-bar progress-bar-teal" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%; min-width: 2em" data-toggle="tooltip" data-placement="top" data-original-title="ip address, percent">0</div>
</div>

var p = new ProgressClass("progress_1");
p.init();
setInterval(function(){

	var randNum = Math.floor( Math.random() * 100 );

	
	p.setValue( randNum, "Node", "%" );
	$("#ani_num").AnimateText({num: randNum, prevValueEnable:true, useFixedValue: 100});

},3000);

*
*
*****************************************************************************************************/
/*
프로젝트에 함수 충돌을 위해서 주석처리
var ProgressClass = function($tgID){

	//private
	var name = "ProgressClass";
	var ver = "2016.10.30. 허정진";
	
	//public
	this.name = name;
	this.minWidth = 3;
	this.minInt = 0;
	this.tgID = $tgID;
	this.tgClass;
	
	//constructor
	this.constructor.classLength++;
	this.constructor();
}
ProgressClass.prototype = (function(){
	return{
		constructor: function(){
			if( ! this.tgID ){
				throw new Error( "["+this.name+"] : 전달된 인자가 없습니다." );
				return false;
			}

			this.tgClass = document.getElementById( this.tgID ).getElementsByClassName('progress-bar')[0];

			this.init();
		},
		init : function(){
			$("[data-toggle='tooltip']").tooltip();

			this.tgClass.setAttribute("aria-valuenow", 0);
			this.tgClass.style.minWidth = this.minWidth + "em";
			this.tgClass.style.width = "0%";
			this.tgClass.innerHTML = "0%";
		},
		setValue : function( $num, $text, $prefix ){
			if( typeof $num == "undefined" ) throw new Error( "["+this.name+"] : setValue 전달된 인자가 없습니다." );
			this.tgClass.setAttribute("aria-valuenow", $num);
			this.tgClass.setAttribute("data-original-title", $text+" "+$num+$prefix);
			this.tgClass.style.width = $num+"%";
			//this.tgClass.innerHTML = $num+"%";
			$(this.tgClass).AnimateText({
				num: $num, 
				postfix : $text,
				prefix: $prefix
			});
		},
	}
})();
*/

/***********************************************************
*
*	AnimateCSS 클래스
*
*	animate.css를 사용하여, 엘리먼트에 애니메이션을 부여한다.
*

권장하는 사용법

var animateCSS = new AnimateCSS();
animateCSS.instant("#p1", "bounce");
animateCSS.instant("#p2", "flipOutY");
animateCSS.click("#p3", "flash");
animateCSS.hover("#p4", "pulse");

*
*
*
***********************************************************/
var AnimateCSS = function(){
	this.element;
	this.animation;
}

AnimateCSS.prototype = {
	instant:function(element, animation){
		this.element = element;
		this.animation = animation;
		
		var element = $(this.element);
		var animation = this.animation;

		element = $(this.element);
		element.addClass('animated ' + animation);        
		//wait for animation to finish before removing classes
		window.setTimeout( function(){
			element.removeClass('animated ' + animation);
		}, 1000);
	},
	hover:function(element, animation){
		this.element = element;
		this.animation = animation;
		
		var element = $(this.element);
		var animation = this.animation;

		element.hover(
		function() {
			element.addClass('animated ' + animation);        
			//wait for animation to finish before removing classes
			window.setTimeout( function(){
				element.removeClass('animated ' + animation);
			}, 2000);         
  
		});
	},
	click:function(element, animation){
		this.element = element;
		this.animation = animation;
		
		var element = $(this.element);
		var animation = this.animation;

		element.click(
		function() {
			element.addClass('animated ' + animation);        
			//wait for animation to finish before removing classes
			window.setTimeout( function(){
				element.removeClass('animated ' + animation);
			}, 2000);         
  
		});
	}
}




/***********************************************************
*
*	로딩중, 저장중 메세지 띄우기
*
*   font-awesome.min.css, serpiko-common.css 순서대로 include.
*
*	serpiko-common.css 의 'ajax 로딩' 부분을 참조하여 사용.
*
권장하는 사용법

loadingTextDisplay(true [, 500 ]); //보이기
loadingTextDisplay(false [, 500 ]); //감추기

directionTextDisplay(true [, 500 ]); //보이기
directionTextDisplay(false [, 500 ]); //감추기

*
*
*
***********************************************************/
function loadingTextDisplay($bool, $mSec){
	
	var mSec = $mSec || 500;

	if( $bool == true ){
		$("#loading").show();
	}else{
		window.setTimeout(function(){
			$("#loading").hide();
		}, mSec);
	}
}
function directionTextDisplay($bool, $mSec){
	
	var mSec = $mSec || 500;

	if( $bool == true ){
		$("#direction").show();
	}else{
		window.setTimeout(function(){
			$("#direction").hide();
		}, mSec);
	}
}



/***********************************************************
*
*	ItoStr 클래스
*
*	10미만에 0 붙이고, 100미만에 00 붙이고
*

권장하는 사용법

var itoStr = new ItoStr();
itoStr.num00(2); //02
itoStr.num000(89); //089

*
*
*
***********************************************************/
var ItoStr = function(){}
ItoStr.prototype.num00 = function(i){
	return (i < 10 ? '0'+i : i).toString();
}
ItoStr.prototype.num000 = function(i){
	if( i >= 0 && i < 10 ){
		i = "00" + i; 
	}else if( i >= 10 &&  i < 100 ){
		i = "0"+i;
	}
	return i.toString();
}


function getFileName($exc){

	var dt = new Date();
	var itoStr = new ItoStr();
	var year =  itoStr.num00( dt.getFullYear() );
	var month = itoStr.num00( dt.getMonth() + 1 );
	var day =   itoStr.num00( dt.getDate() );
	var hour =  itoStr.num00( dt.getHours() );
	var mins =  itoStr.num00( dt.getMinutes() );

	var postfix = year + month + day + "_" + hour + mins;
	
	return "Export_"+ postfix + ($exc ? "."+$exc : "");
}




/***********************************************************
*
*	Browser 클래스
*
*	getType, isIE, isMobile
*

권장하는 사용법

var browser = new Browser();
console.log( browser.getType() );
console.log( browser.isIE() );
console.log( browser.isMobile() );

*
*
*
***********************************************************/
var Browser = function(){}
Browser.prototype.getType = function(){
	
	var _ua = navigator.userAgent;
	var rv = -1;
	 
	//IE 11,10,9,8
	var trident = _ua.match(/Trident\/(\d.\d)/i);
	if( trident != null )
	{
		if( trident[1] == "7.0" ) return rv = "IE" + 11;
		if( trident[1] == "6.0" ) return rv = "IE" + 10;
		if( trident[1] == "5.0" ) return rv = "IE" + 9;
		if( trident[1] == "4.0" ) return rv = "IE" + 8;
	}
	 
	//IE 7...
	if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
	 
	/*
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
	if( rv == 7 ) return rv = "IE" + 7; 
	*/
	 
	//other
	var agt = _ua.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';


}

Browser.prototype.isIE = function(){
	var IE = false;
	var patt = /ie/gi;
	if( patt.test( this.getType() ) ) IE = true;
	return IE;
}

Browser.prototype.isMobile = function(){
	var filter = "win16|win32|win64|mac";
	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
			//alert('mobile');
			return true; //Mobile
		}else{
			//alert('pc');
			return false; //PC
		}
	}
}


// day를 넣으면 과거 시간~현재시간 리턴해준다.
function prevDayDate( $day ){

	var itoStr = new ItoStr();
	var cDate = new Date();

	var sTO = cDate.getFullYear() + '-';
	sTO += itoStr.num00(cDate.getMonth() + 1)  + '-';
	sTO += itoStr.num00(cDate.getDate());
	
	var His = cDate.getHours() +':';
	His += itoStr.num00(cDate.getMinutes())+':';
	His += itoStr.num00(cDate.getSeconds())+'';
	
	var pDate = new Date();
	var sFROM = pDate.getFullYear() +'-';
	sFROM += itoStr.num00(cDate.getMonth() + 1)  + '-';
	sFROM += itoStr.num00(pDate.getDate() - $day);
	
	var obj = new Object();
	obj.sTO = sTO;
	obj.His = His;
	obj.sFROM = sFROM;
	
	return obj;
}

/*

function GetRequestDate( $mode, $year, $month, $day ){

	var ver = "2016.10.29";

	var cDate = new Date();
	var itoStr = new ItoStr();

	var nMaxMonth = 12;
	var nMinMonth = 1;
	var nMaxDay = 31;
	var nMinDay = 1;
	var nMaxHours = 23;
	var nMinHours = 0;
	var nMaxMin = 59;
	var nMinMin = 0;
	var nMaxSec = 59;
	var nMinSec = 0;

	var sFromYMD = "";
	var sToYMD = "";
	var sFromHIS = itoStr.num00(nMinHours)+":"+itoStr.num00(nMinMin)+":"+itoStr.num00(nMinSec);
	var sToHIS = itoStr.num00(nMaxHours)+":"+itoStr.num00(nMaxMin)+":"+itoStr.num00(nMaxSec);
	
	$month || nMinMonth;
	$day || nMinDay;

	//******************************************************************************** 
	//*
	//*@월별 모드 
	//*
	//********************************************************************************
	if( $mode == "month"){
		
		//부터 : 파라메터년 min월 min일 min시 min분 min초
		sFromYMD = $year+"-"+itoStr.num00(nMinMonth)+"-"+itoStr.num00(nMinDay);
		
		//까지 : 현재 년도 미만
		if( cDate.getFullYear() > $year ){
			// year + 맥스달 + 맥스데이
			sToYMD = $year+"-"+itoStr.num00(nMaxMonth)+"-"+itoStr.num00(nMaxDay);

		}else{
			// year + 현재달 + 현재날
			sToYMD = $year+"-";
			sToYMD += itoStr.num00(cDate.getMonth() + 1)  + '-';
			sToYMD += itoStr.num00(cDate.getDate());
			
			// 현재시간 + 현재분 + 현재초
			sToHIS = cDate.getHours() +':';
			sToHIS += itoStr.num00(cDate.getMinutes())+':';
			sToHIS += itoStr.num00(cDate.getSeconds())+'';
		}
	}else
	//********************************************************************************
	//*
	//*@일별 모드 
	//*
	//********************************************************************************
	if( $mode == "day" ){

		//부터 : 파라메터년 파라메터달 min일
		sFromYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00( nMinDay );
		
		//까지 : '현재 년 월' 인 경우 
		if( cDate.getFullYear() == $year &&  cDate.getMonth() + 1 == $month ){
			// 현재년 + 현재달 + 현재날 
			sToYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00(cDate.getDate());
		}else{
			// 파라메터년 + 파라메터달 + 그달의 마지막날
			var lastDate = ( new Date($year, $month, 0) ).getDate();
			sToYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00(lastDate);
		}
	}else
	//********************************************************************************
	//*
	//*@시간대별 모드 
	//*
	//********************************************************************************
	if( $mode == "time" ){

		//부터 : 파라메터년 파라메터달 파라메터일
		sFromYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00($day);

		//까지 : 파라메터년 파라메터달 파라메터일
		sToYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00($day);
		
		//시간 : '현재 년 월 일' 인 경우
		if( cDate.getFullYear() == $year &&  cDate.getMonth() + 1 == $month && cDate.getDate() == $day ){

			//시간을 현재 시간으로 설정한다.
			sToHIS = cDate.getHours() +':';
			sToHIS += itoStr.num00(cDate.getMinutes())+':';
			sToHIS += itoStr.num00(cDate.getSeconds())+'';
		}
	}
	
	//------------------------------------------------------------------------------
	var obj = new Object();
	obj.sFromYMD = sFromYMD;
	obj.sFromHIS = sFromHIS;
	obj.sToYMD = sToYMD;
	obj.sToHIS = sToHIS;

	return obj;
}
*/
function getSeverityDescr($num){

	var descr = "";
	var num = parseInt($num, 10);
	switch( num ){
		case 0 :
			descr = "미정";
		break;
		case 1 :
			descr = "정상";
		break;
		case 2 :
			descr = "확인";
		break;
		case 3 :
			descr = "경고";
		break;
		case 4 :
			descr = "심각";
		break;
		case 5 :
			descr = "응급";
		break;

		default:
			deact = "미정";
	}
	return descr;
}


function getLevel_10($num){
	var num = parseInt( ($num / 10), 10);
	var itoStr = new ItoStr();
	return itoStr.num00(num);
}




/***********************************************************
*
*	오픈 팝업 센터
*
*	openPopCenter, openPopCenter2, openPopCenter3
*

권장하는 사용법

openPopCenter("/pop.html", 1200, 800);
openPopCenter2("/pop.html");
openPopCenter3("/pop.html");

*
*
*
***********************************************************/
function openPopCenter($url, sw, sh)
{
	//var url = "./KCP/web/order.php";
	var url = $url;
	var title = 'openPopCenter';

	var cw = screen.availWidth;
	var ch = screen.availHeight;

	if(cw < sw)sw = 0;
	if(ch < sh)sh = 0;

	var ml=(cw-sw)/2;
	var mt=(ch-sh)/2;

	var status = "width="+sw+", height="+sh+", top="+mt+", left="+ml+", menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=yes,resizable=no";
	window.open(url, title, status);
}

function openPopCenter2($url)
{
	//var url = "./KCP/web/order.php";
	var url = $url;
	var title = 'openPopCenter2';

	var cw = screen.availWidth;
	var ch = screen.availHeight;

	var sw = 600;
	var sh = 470;

	var ml=(cw-sw)/2;
	var mt=(ch-sh)/2;

	var status = "width="+sw+", height="+sh+", top="+mt+", left="+ml+", menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=yes,resizable=no";
	window.open(url, title, status);
}

function openPopCenter3($url){
	var title = 'openPopCenter3';
	var cw = screen.availWidth;
	var ch = screen.availHeight;

	var sw = 1200;
	var sh = 900;

	var ml = (cw-sw)/2;
	var mt = (ch-sh)/2;
	window.open($url, title, "_blank", "toolbar=yes, scrollbars=auto, resizable=no, top="+mt+", left="+ml+", width="+sw+", height="+sh);
}




/***********************************************************
*
*	swapClass (jquery chaning)
*
*	
*

권장하는 사용법

$('div').swapClass('one', 'two');

*
*
*
***********************************************************/
(function($) {
	$.fn.swapClass = function(class1, class2) {
		return this.each(function() {
			var $element = $(this);
			if ($element.hasClass(class1)) {
				$element.removeClass(class1).addClass(class2);
			}
			else if ($element.hasClass(class2)) {
				$element.removeClass(class2).addClass(class1);
			}
		});

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);
	};
})(jQuery);




/***********************************************************
*
*	rollingTrigger( 부모타겟, 오버스탑타겟, 주기 ) 
*
*	
*

권장하는 사용법

rollingTrigger('#nav-dots', '#slider', 7000);

*
*
*
***********************************************************/
function rollingTrigger($parentTarget, $stopTarget, $interval){
	
	$stopTarget = (typeof $stopTarget == 'undefined') ? null : $stopTarget; 
	$interval = (typeof $interval == 'undefined') ? 5000 : $interval;

	var nI = 0;
	var intervalID = null;
	var children_len = $($parentTarget).children().length;
	
	function loop(){
		intervalID = setInterval(function(){
			nI++;

			if( nI == children_len ) nI = 0;

			$($parentTarget).children().eq( nI ).trigger('click');
		}, $interval);
	}
	
	loop();
	
	if( $stopTarget !== null ) {
		$($stopTarget).mouseover(function(){
			if( intervalID !== null ) {
				clearInterval( intervalID );
				intervalID = null;
			}
		}).mouseout(function(){
			loop();
		});
	}
}







/**********************************************************************************************************************
*
* NewEasyPieChart ( *주의 easyPieChart.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
//
	// fn = jquery.prototype's alias
	$.fn.NewEasyPieChart = function(options){ 
		
		// 기본값
		var obj = {
			thick		: 7, // 선 두께
			size		: 60, // 원 크기px
			rotate		: 0,
			barColor	: '#f07c00',
			trackColor	: '#f8e4cc',
			lineCap		: 'round', // round, butt, square
			scaleColor	: false, //'#dfe0e0',
			scaleLength	: 5,
			lineWidth	: 7,
			trackWidth	: 7,
			animate		: 5000,
			
			//주의. jquery-ui와 충돌시 값이 NaN으로 표기된다.
			easing		: "easeInOut", //swing, easeOutBounce, easeOutElastic  easeOutExpo, easeInOut
		};
		
		// option값이 있을경우 취합한다
		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		// EasyPieChart (원본)
		div_id.easyPieChart({
			easing:		obj.easing,
			animate:	obj.animate,
			barColor:	obj.barColor,
			trackColor: obj.trackColor,
			scaleColor: obj.scaleColor,
			lineWidth:	obj.thick,
			trackWidth: obj.thick,
			size:		obj.size,
			lineCap:	obj.lineCap,
			onStep: function(from, to, percent) {
				// 여기서의 $(this)는 EasyPieChart이며 el : span#pie_web_cpu.pie-chart
				$(this.el).find('.pie-percent').text( Math.round(percent) );
			}
		});
		
		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		return $(this);
	};
//
})(jQuery);

/**********************************************************************************************************************
*
* EasyPieChartUpdate ( *주의 easyPieChart.js 와 반드시 함께 사용 ) / 2016.09.28 오전10시10분
*
/**********************************************************************************************************************/
(function($){

	$.fn.EasyPieChartUpdate = function(options){

		var obj = {

			//options
			repeat		: false,
			intervalId	: null,
			time		: 6000 * 10,

			//ajax
			xhrClass	: null,
			url			: "", //파일경로
			param		: "", //전달할파라메터(파일 업로드시 : form데이터)
			type		: "json", //타입 구분 text/json
			method		: "GET", //GET/POST/FILE
			asyncBool	: true, //비동기여부 true/false
			log			: false //로그보기 true / false
		};

		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		obj.xhrClass = new XhrClass;
		obj.xhrClass.sendRequest( obj.url, obj.param, complete, obj.type, obj.method, obj.asyncBool, obj.log);
		function complete(xhr, res){
			
			var easyPieChart = div_id.data("easyPieChart");

			//init value 0
			div_id.find('.pie-percent').text( 0 );
			easyPieChart.clear();

			//cpu1, cpu2
			if( div_idName == "pie_cpu_1" || div_idName == "pie_cpu_2"){
				var per = parseInt( res.Record[0].cpu_use, 10 );
				easyPieChart.update( per );
			}

			//memory1, memory2
			if( div_idName == "pie_mem_1" || div_idName == "pie_mem_2" )
			{
				var rmem_use = parseInt(res.Record[0].rmem_use, 10);
				var rmem_total = parseInt(res.Record[0].rmem_total, 10);
				
				//n% = 일부값 / 전체값 * 100;
				var per = Math.round( (rmem_use / rmem_total ) * 100 );
			
				easyPieChart.update(per);
			}

			//hdd_1, hdd_2
			if( div_idName == "pie_hdd_1" || div_idName == "pie_hdd_2")
			{
				var fs_use = parseInt(res.Record[0].fs_use, 10);
				var fs_total = parseInt(res.Record[0].fs_total, 10);

				//n% = 일부값 / 전체값 * 100;
				var per = Math.round( (fs_use / fs_total ) * 100 );
				
				easyPieChart.update(per);
			}
		} //complete
		
		if( obj.repeat == true ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest( obj.url, obj.param, complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.time);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);









/**********************************************************************************************************************
*
* NewHighGaugeChart ( *주의 hightcharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
	$.fn.NewHighGaugeChart = function(options){

		var obj = {
			data: 0, //기본데이터 value
			min: 0,
			max: 100,
			innerTitle: '퍼센트',
			balloonTitle: '장애: ',
			unit: '%',
			animate: 2000
		};
		
		/*
		var obj = new Object();
		obj.gaugeOptions = {
			yAxis:{
				min: 0,
				max: 100,
				tickPositioner:  function() {
					return [0, 100];
				}
			}
		}
		*/

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		div_id.highcharts( /*Highcharts.merge(obj.gaugeOptions,*/ {
			chart: {
				type: 'solidgauge',
				backgroundColor:'transparent',
				animation:{
					duration: obj.animate,
					//easing: "easeOutBounce"
				}
			},

			pane: {
				center: ['50%', '83%'],
				size: '155%', //그래프 원 사이즈
				startAngle: -90,
				endAngle: 90,
				background: {
					backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE', //그래프 트랙색상
					innerRadius: '60%',
					outerRadius: '100%',
					shape: 'arc'
				}
			},

			title: null,
			
			/* 마우스 올리면 말풍선 */
			tooltip: {
				enabled: true
			},

			yAxis: {
				min: obj.min,
				max: obj.max,

				title: {
					text: '' //최상단의 타이블 텍스트
				},
				stops: [
					[0.1, '#55BF3B'], // green
					[0.5, '#DDDF0D'], // yellow
					[0.9, '#DF5353'] // red
				],
				
				/* tick 눈금관련 */
				lineWidth: 0,
				minorTickInterval: null, //'auto' 그래프안에 눈금표시
				tickPixelInterval: 400,
				tickWidth: 0,

				labels: {
					enabled: true,
					//step: 2, //수치 눈금의 category 간격(~~개)
					align: 'left',
					x: 0,
					y: 16,	//하단의 min, max 레이블 16
					//rotation: 'auto'
				},

				title: {
					y: 0	//최상단의 타이블 y좌표
				},

				tickPositioner:  function() {
					return [obj.min, obj.max];
				}
			},

			credits: {
				enabled: false // 마크보이기
			},

			plotOptions: {
				solidgauge: {
					dataLabels: {
						y: 25, //데이터의 y좌표
						borderWidth: 0,
						useHTML: true
					}
				},
				series: {
					cursor: 'pointer',
					point: {
						events: {
							click: function(){
							   //
							}
						}
					}
				}
			},

			series: [{
				name: obj.balloonTitle, //말풍선 좌측 타이틀
				data: [obj.data],
				dataLabels: {
					format: 
						//상단 수치 부분 텍스트 id = div_idName_number
						'<div style="text-align:center"><span id="'+div_idName+'_number" style="font-size:20px;color:' +
						((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +

						//하단 그래프 텍스트 id = div_idName_desc
						'<span id="'+div_idName+'_innerTitle" style="font-size:12px;color:silver">'+obj.innerTitle+'</span></div>'
				},
				tooltip: {
					valueSuffix: obj.unit //말풍선 우측 단위
				}
			}]
		}/*)*/);

		return this; // highchart객체
	}
})(jQuery);






/**********************************************************************************************************************
*
* HighGaugeChartUpdate ( *주의 hightcharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
	$.fn.HighGaugeChartUpdate = function(options){

		var obj = {

			//options
			repeat		: false,
			intervalId	: null,
			time		: 6000 * 10,

			//ajax
			xhrClass	: null,
			url			: "", //파일경로
			param		: "", //전달할파라메터(파일 업로드시 : form데이터)
			type		: "json", //타입 구분 text/json
			method		: "GET", //GET/POST/FILE
			asyncBool	: true, //비동기여부 true/false
			log			: false //로그보기 true / false
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		obj.xhrClass = new XhrClass;
		obj.xhrClass.sendRequest( obj.url, obj.param, complete, obj.type, obj.method, obj.asyncBool, obj.log);
		function complete(xhr, res)
		{
			var chart = div_id.highcharts();

			//VPN : VPN통신 상태
			if( div_idName == 'VPN_div')
			{
				var downNum = res.Record[0].down; // <= 0:다운
				var normalNum = res.Record[0].success; // <= 1:정상
				var totalNum = downNum + normalNum // 총갯수 : 다운 + 정상

				chart.destroy();
				newOptions = {
					yAxis:{
						min:0,
						max: totalNum,
						tickPositioner:  function() {
							return [0, totalNum];
						}
					}
				};
				div_id.NewHighGaugeChart({gaugeOptions:newOptions});

				chart = div_id.highcharts();
				chart.series[0].points[0].update( downNum );
				//chart.yAxis[0].update({ max : totalNum });
				//chart.yAxis[0].setExtremes(0, totalNum);
				
				$( "#" + div_idName + '_total').text( totalNum );
				$( "#" + div_idName + '_normal').text( normalNum );
				$( "#" + div_idName + '_err').text( downNum );

				//$( "#" + div_idName + '_type').text( '이벤트' );
			}
			//INVERTER : 인버터 동작 상태
			else if( div_idName == 'PLC_div' )
			{
				var normalNum = res.Record[0].success; // <= 1:정상
				var len = 5; //총갯수는 [{0:'1', 1:'0', 2:'0', 3:'7', 4:'0', 5:'0'}] 중에서 1~5 name을 더한다. (0:알수없음, 1:정상, 2~5: 장애)
				var totalNum = 0;
				for( var i=1; i<=len; ++i) totalNum+= res.Record[0].down;
				var downNum = totalNum - normalNum;

				chart.destroy();
				newOptions = {
					yAxis:{
						min:0,
						max: totalNum,
						tickPositioner:  function() {
							return [0, totalNum];
						}
					}
				};
				div_id.NewHighGaugeChart({gaugeOptions:newOptions});

				chart = div_id.highcharts();
				chart.series[0].points[0].update( downNum );
				//chart.yAxis[0].update({ max : totalNum });
				//chart.yAxis[0].setExtremes(0, totalNum);
				
				$( "#" + div_idName + '_total').text( totalNum );
				$( "#" + div_idName + '_normal').text( normalNum );
				$( "#" + div_idName + '_err').text( downNum );

				//$( "#" + div_idName + '_type').text( '이벤트' );
			}
			//currentStation : 현재발전량
			else if( div_idName == "currentStation_div" ){
				
				//현재발전량
				var curPower = parseInt(res[0].val, 10); 
				var insPower = parseInt(res[0].installed, 10); 


				// 2015.12.16 손대호 kW로 환산 : 일단 kW로 고정
				//curPower = curPower / 1000;	
				curPowerDisplay = numberD(curPower,2)+"W";	
				insPowerDisplay = numberD(insPower*1000,0)+"W";	
				curPower = parseInt( (curPower / 1000), 10 );
				
				//게이지차트
				chart.destroy();
				newOptions = {
					yAxis:{
						min:0,
						max: 100,
						tickPositioner:  function() {
							return [0, 100];
						}
					}
				};
				div_id.NewHighGaugeChart({gaugeOptions:newOptions});

				chart = div_id.highcharts();
				perCur = Number(   (curPower / insPower * 100).toFixed(1)   );
				
				//console.log( curPower, insPower );

				if( perCur <= 0 ){
					chart.series[0].points[0].update( 3 );
					$( "#" + div_idName + '_number').text(0);
				}else{
					chart.series[0].points[0].update( perCur );
				}
				//chart.series[0].points[0].update( curPower ); //수치
				$( "#" + div_idName + '_type').text( '　%' );

				//텍스트 애니메이션
				var text_id = div_idName + "_span";
				//SetTextAnimate(text_id, curPower);
				SetTextAnimateV2(text_id, curPower, curPowerDisplay);
				$("#installStation_span").text( insPowerDisplay );
		
				
				//프로그레스바 조정 : //n% = 일부값 / 전체값 * 100;
				var progress = $("#" + div_idName + '_progress');

				//일단 초기화
				progress.attr('aria-valuenow', 0);
				progress.css('min-width', 0);
				progress.width(0 + '%');
				progress.text( 0 );

					setTimeout(function(){
						progress.attr('aria-valuenow', perCur);
						progress.css('min-width', '7em');
						progress.width(perCur + '%');
						progress.text( curPowerDisplay );
					}, 1000);
			}
		}

		if( obj.repeat == true ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest( obj.url, obj.param, complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.time);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);





/**********************************************************************************************************************
*
* NewAmChartLine : amChart의 시리얼 라인차트 ( *주의 amCharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
function curDate() //현재 시간을 Y-m-d H:i:s 2016-02-11 10:05:30 로 반환한다.
{
	var newDate = new Date();
	var year = newDate.getFullYear();
	var month = newDate.getMonth()+1;
	month = (month < 10 ? "0" : "" ) + month;

	var date = newDate.getDate();
	date = (date < 10 ? "0" : "") + date;

	var seconds = new Date().getSeconds();
	seconds = (seconds < 10 ? "0":"") + seconds;
	
	var minutes = new Date().getMinutes();
	minutes = (minutes < 10 ? "0":"") + minutes;

	var hours = new Date().getHours();
	hours = (hours < 10 ? "0":"") + hours; //24
	
	return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
}
(function($){
	
	var browser = new Browser();

	$.fn.NewAmChartLine = function(options){			// 암차트 불러오는 함수
		
		var obj = {
			categoryField	: 'date',	// <= ajax NAME
			valueField		: 'val',	// <= ajax VALUE
			fillColorsField	: 'fillColor',
			urlField		: 'url',
			valueUnit		: '', //단위를 지정할 경우에 사용
			startEffect		: '>',	// >,<,bounce,elastic
			graphType		: 'smoothedLine',	//line, column, step, smoothedLine
			bullet			: 'none', // "none", "round", "square", "triangleUp", "triangleDown", "bubble", "custom".
			startDuration	: 0,
			pathToImages	: 'js/amcharts/images/',

			autoMargins		: true, //false일경우 아래의 4가지 margin옵션을 수동으로 줄 수 있다
			marginTop		: 20,
			marginBottom	: 20,
			marginLeft		: 20,
			marginRight		: 20,
		}

		$.extend(obj, options)

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		var lineChartDIV = AmCharts.makeChart(div_idName, {
			type: "serial",
			startEffect : obj.startEffect,
			startDuration: browser.isIE() ? 0 : obj.startDuration, // IE브라우저에서는 애니메이션을 없앤다(느리거나 랜더링하지 못하는 문제발생 2016.02.11)
			pathToImages : obj.pathToImages,

			autoMargins: obj.autoMargins,
			marginTop : obj.marginTop,
			marginRight : obj.marginRight,
			marginLeft : obj.marginLeft,
			marginBottom : obj.marginBottom,

			//depth3D : 10,
			//angle : 30,

			fontSize : 11,
			usePrefixes: true, //단위의 용량을 자동으로 표기한다 : K,M,G,T,P,E,Z,Y
					
			dataProvider: [ {'date':curDate(), 'val':0} ], // <= 기본값
			
			/* valueAxes */
			"valueAxes": [{
				"id": "v1",
				color: "#9c9c9c",
				axisColor : "#9c9c9c",
				gridColor : "#9c9c9c",
				gridAlpha : 0.05,
				minimum : 0,
				"axisAlpha": 0,
				"position": "left",
				//"ignoreAxisWidth":true,
				"unit": obj.valueUnit
			}],
			
			"dataDateFormat": "YYYY-MM-DD HH:NN:SS",
			
			/* graphs */
			"graphs": [{
				"type": obj.graphType,
				topRadius: 0,
				title: 'value',
				balloonText : '[[date]]: <b>[[value]]'+obj.valueUnit+'</b>', 
				//balloonText : '[[category]]: [[value]]<b>kWp</b>',
				"fillColorsField": obj.fillColorsField,
				//fillColors: ['#9ed53c', '#7cbc0a'],
				"fillAlphas": 0.5,
				"lineAlpha": 0.3,
				"valueField": obj.valueField, // <= ajax VALUE
				legendValueText : "[[value]]",
				urlField : obj.urlField,
				urlTarget: "_blank",
				lineColor: "#000",
				lineThickness : 1,
				bullet: obj.bullet, // "none", "round", "square", "triangleUp", "triangleDown", "bubble", "custom".
				bulletAlpha: 0,
				bulletBorderThickness: 1,
				bulletBorderAlpha: 0
			}],
					
			"categoryField": obj.categoryField, // <= ajax NAME
			
			/* categoryAxis */
			"categoryAxis": {
				"gridPosition": "start",
				"labelRotation": 0,
				"dashLength": 1,
				axisColor : '#9c9c9c',
				color : "#9c9c9c",
				gridColor : "#9c9c9c",
				gridAlpha : 0.05,
				autoGridCount : true,
				"equalSpacing": true,
				inside: false,
				labelsEnabled: true,
				labelRotation: 0,
				labelFrequency: 1,

				//날짜 형식을 아래와같이 지정하고 분석하여 사용한다.
				"minPeriod": "ss",
				"usePrefixes": true,
				"dateFormats":[{period:'fff',format:'JJ:NN:SS'},{period:'ss',format:'JJ:NN:SS'},{period:'mm',format:'JJ:NN'},{period:'hh',format:'JJ:NN'},{period:'DD',format:'MM-DD'},{period:'WW',format:'MM -DD'},{period:'MM',format:'MM'},{period:'YYYY',format:'YYYY'}],
				"dateFormat": "YYYY-MM-DD HH:NN:SS",
				"parseDates": true,

				/* 브라우저 해상도가 작아져서 표현하는 div가 작아져도 강제로 카테고리(x축)를 모두 표기할때 사용한다.*/
				//minHorizontalGap: 0,
				//forceShowField : obj.categoryField
			},
			
			/* chartCursor */
			"chartCursor": {
				"categoryBalloonEnabled": true,
				"cursorAlpha": 0,
				"zoomable": false,
				categoryBalloonEnabled : true,
				valueLineEnabled : true,
				valueLineBalloonEnabled : true,
				valueLineAlpha : 0
			},
			
			/* balloon */
			"balloon":{
				cornerRadius: 6,
				adjustBorderColor: true,
				horizontalPadding: 10,
				verticalPadding: 10,
				borderColor: '#FF0000',
				fontSize: 12,
				color: "#000"
			},

			/* export */
			"export": {
				"enabled": false
			 }
		});

		return lineChartDIV;
		//return this;
	}
})(jQuery);


/* NewAmChartStack */
(function($){

	var browser = new Browser();

	$.fn.NewAmChartStack = function(options){
		
		var obj = {
			title			: '타이틀',
			categoryField_1	: 'name_1',	// <= ajax NAME
			categoryField_2	: 'name_2',	// <= ajax NAME
			value_1			: 'val_1',	// <= ajax VALUE 1
			value_2			: 'val_2',	// <= ajax VALUE 2
			fillColorsField_1	: 'fillColor_1',
			fillColorsField_2	: 'fillColor_2',

			urlField		: 'url',
			fillColors_1	: ['#ffb230','#ffb230'],
			fillColors_2	: ['#ed6c44','#ed6c44'],

			valueUnit		: '%', //단위를 지정할 경우에 사용
			startEffect		: '>',	// >,<,bounce,elastic
			graphType		: 'column',	//line, column, step, smoothedLine
			startDuration	: 0,
			pathToImages	: 'js/amcharts/images/',

			autoMargins		: false,
			marginTop		: 0,
			marginBottom	: 0,
			marginLeft		: 0,
			marginRight		: 0,
		}

		$.extend(obj, options)

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		var stackChartDIV = AmCharts.makeChart(div_idName, {
			type: "serial",
			theme: 'light',
			startEffect : obj.startEffect,
			startDuration: browser.isIE() ? 0 : obj.startDuration, // IE브라우저에서는 애니메이션을 없앤다(느리거나 랜더링하지 못하는 문제발생 2016.02.11)
			pathToImages : obj.pathToImages,

			autoMargins: obj.autoMargins,
			marginTop : obj.marginTop,
			marginRight : obj.marginRight,
			marginLeft : obj.marginLeft,
			marginBottom : obj.marginBottom,

			depth3D : 20,
			angle : 30,

			fontSize : 11,
			usePrefixes: true, //단위의 용량을 자동으로 표기한다 : K,M,G,T,P,E,Z,Y
					
			dataProvider: [{'name_1':'네임_1', 'name_2':'네임_2', 'val_1':50, 'val_2':50}], // <= 기본값
			
			/* valueAxes */
			"valueAxes": [{
				"id": "v1",
				"unit": obj.valueUnit,
				
				'stackType': 'regular',  // "none", "regular", "100%", "3d"
				"position": "left",
				'axisAlpha': 0,
				'gridAlpha': 0,
				color: "#9c9c9c",
				minimum : 0,
				maximum: 100,
				"ignoreAxisWidth":true,
				labelsEnabled: false,
			}],
			
			/* graphs */
			"graphs": [{
				"type": obj.graphType,
				title:	obj.title,
				'valueField': obj.value_1,
				"fillColorsField": obj.fillColorsField_1,
				'fillColors': obj.fillColors_1,
				urlField : obj.urlField,

				'color': '#FFF',
				fillAlphas: 0.8,
				labelText: '[[value]]'+obj.valueUnit,
				lineAlpha: 0,
				topRadius: 1,
				'balloonText': "<b>[[name_1]]</b><br><span style='font-size:14px'><b>[[value]]"+obj.valueUnit+"</b></span>",
			},
			{
				"type": obj.graphType,
				title:	obj.title,
				'valueField': obj.value_2,
				"fillColorsField": obj.fillColorsField_2,
				'fillColors': obj.fillColors_2,
				urlField : obj.urlField,

				'color': '#FFF',
				fillAlphas: 0.8,
				labelText: '[[value]]'+obj.valueUnit,
				lineAlpha: 0,
				topRadius: 1,
				'balloonText': "<b>[[name_2]]</b><br><span style='font-size:14px'><b>[[value]]"+obj.valueUnit+"</b></span>",
			}],
					
			/* categoryAxis */
			"categoryAxis": {
				autoGridCount : false,
				gridAlpha : 0,
				axisAlpha : 0,
				"gridPosition": "start",
				position: 'left',
				ignoreAxisWidth: true,
				labelsEnabled: false,
			},

			/* export */
			"export": {
				"enabled": false
			 }
		});

		return stackChartDIV;
		//return this;
	}
})(jQuery);



/* NewAmChartPie */
(function($){
	$.fn.NewAmChartPie = function(options){
		
		var obj = {
			titleField		: 'name',	// <= ajax NAME
			valueField		: 'val',	// <= ajax VALUE
			colorField		: 'color',  //	<= ajax COLOR
			urlField		: 'url',   // <= ajax URL
			
			color			: '#adcc42',
			valueUnit		: '%', //단위를 지정할 경우에 사용
			startEffect		: '>',	// >,<,bounce,elastic
			startDuration	: 0,
			pathToImages	: 'js/amcharts/images/',

			autoMargins		: false,
			marginTop		: 0,
			marginBottom	: 0,
			marginLeft		: 0,
			marginRight		: 0,
		}

		$.extend(obj, options)

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		var pieChartDIV = AmCharts.makeChart(div_idName, {

			type: "pie",
			theme: 'light',
			startEffect : obj.startEffect,
			startDuration: isBrowserIE() ? 0 : obj.startDuration, // IE브라우저에서는 애니메이션을 없앤다(느리거나 랜더링하지 못하는 문제발생 2016.02.11)
			pathToImages : obj.pathToImages,

			autoMargins: obj.autoMargins,
			marginTop : obj.marginTop,
			marginRight : obj.marginRight,
			marginLeft : obj.marginLeft,
			marginBottom : obj.marginBottom,
			
			fontSize : 11,
			color: '#FFF',
			
			outlineColor: '#FFF',
			outlineAlpha: 0.6,
			outlineThickness: 1,

			"radius": "42%", //파이 그래프의 절대 크기
			"innerRadius": "0%", // 안의 빈구역 정도
			"labelText": "[[percents]]%", // title, value
			"labelRadius": -20, // 표기되는 레이블과 그래프와의 거리
			balloonText: "<span style='font-size:12px;'>[[title]]: </span>[[percents]]% ([[value]])",

			dataProvider: [{'name':'값없음', 'val':100, 'url': '', 'color': obj.color}], // <= 기본값

			titleField: obj.titleField, // <= ajax NAME
			valueField: obj.valueField,	// <= ajax VALUE
			urlField:	obj.urlField,	// <= ajax URL
			colorField:	obj.colorField,	// <= ajax COLOR

			/* export */
			"export": {
				"enabled": false
			 }
		});

		return pieChartDIV;
		//return this;
	}
})(jQuery);


/**********************************************************************************************************************
*
* AmChartUpdate ( *주의 amCharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
	$.fn.AmChartUpdate = function(options){

		var obj = {
			interval	: 0,
			type		: "json",
			method		: "GET",
			asyncBool	: true,
			log			: false,
			xhrClass	: null,
			intervalId	: null
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		obj.xhrClass = new XhrClass;
		obj.xhrClass.create();
		obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);

		if( obj.interval > 0 ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.interval);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);





/************************************************************************************
*
* 스파크라인 객체 생성 (리사이즈 할때 그래프 렌더링을 다시하도록 처리함)
*
************************************************************************************/
(function($){
	$.fn.NewSparkLine = function(options){
		
		var obj = {
			pointData : [0,0,0,0,0,0,0,0,0,0],
			lineColor: 'rgba(128,255,255, 0.6)',
			fillColor: 'rgba(0,0,0, 0.08)',
			thick:	1.5,
			title: '타이틀',
			unit:	'k'
		}
			
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		$.extend(obj, options)
		
		var sparklineLogin = function(){
			div_id.sparkline( obj.pointData, {
				type: 'line',
				width: '100%',
				height: '100%',
				normalRangeMin: 10,

				lineColor: obj.lineColor,
				fillColor: obj.fillColor,
				lineWidth: obj.thick,
				tooltipPrefix: obj.title + ' :',
				tooltipSuffix: ' '+obj.unit,
			});
		}

		var sparkResize = null;
		$(window).resize(function(e) {
			if( sparkResize != null ) clearTimeout(sparkResize);
			sparkResize = setTimeout(sparklineLogin, 500);
		});
		sparklineLogin();

		// 제이쿼리 체이닝을 위해서 자신객체를 리턴한다
		//return this;
		return $(this);
	}
})(jQuery);






(function($){
	$.fn.SparkLineUpdate = function(options){

		var obj = {
			interval	: 0,
			type		: "json",
			method		: "GET",
			asyncBool	: true,
			log			: false,
			xhrClass	: null,
			intervalId	: null
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		obj.xhrClass = new XhrClass;
		obj.xhrClass.create();
		obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);

		if( obj.interval > 0 ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.interval);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);



















/*************************
* 맵 (암맵) 객체 생성, 맵 이벤트 리스너 안에 핸들러를 호출하는 명령어가 포함되어있다.
**************************/
function NewAmMap($chartdiv, $obj){

	var mapColor = '#a6dfd9';
	var n_alpha = 0.4;
	
	var map = AmCharts.makeChart($chartdiv, {
		type : "map",
		dragMap: true,
		theme : "default", //light, black, chalk, default, patterns
		pathToImages : "js/ammap/images/",
		imagesSettings: {
			rollOverColor: "#e50aff",
			rollOverScale: 1, //오버하면 커지는 스케일정도(글자에도 영향을 준다) : 3
			selectedScale: 3,
			selectedColor: "#e50aff",
			color: "#13564e"
		},
		dataProvider : {
		  mapURL : "svg/gyeong_gido.svg",
		  images: $obj.images,
		  //<?=$map_img?>,
		  getAreasFromMap : true, //맵조각을 클릭할수있게한다
			  /*
			 areas:[
				{id : "4139",color:mapColor,alpha:n_alpha},
				{id : "4119",color:mapColor,alpha:n_alpha},
				{id : "4121",color:mapColor,alpha:n_alpha},
				{id : "4129",color:mapColor,alpha:n_alpha},
				{id : "4131",color:mapColor,alpha:n_alpha},
				{id : "4145",color:mapColor,alpha:n_alpha},
				{id : "4113",color:mapColor,alpha:n_alpha},
				{id : "4117",color:mapColor,alpha:n_alpha},
				{id : "4143",color:mapColor,alpha:n_alpha},
				{id : "4111",color:mapColor,alpha:n_alpha},
				{id : "4146",color:mapColor,alpha:n_alpha},
				{id : "4161",color:mapColor,alpha:n_alpha},
				{id : "4115",color:mapColor,alpha:n_alpha},
				{id : "4136",color:mapColor,alpha:n_alpha},
				{id : "4125",color:mapColor,alpha:n_alpha},
				{id : "4165",color:mapColor,alpha:n_alpha},
				{id : "4182",color:mapColor,alpha:n_alpha},
				{id : "4183",color:mapColor,alpha:n_alpha},
				{id : "4167",color:mapColor,alpha:n_alpha},
				{id : "4150",color:mapColor,alpha:n_alpha},
				{id : "4155",color:mapColor,alpha:n_alpha},
				{id : "4122",color:mapColor,alpha:n_alpha},
				{id : "4159",color:mapColor,alpha:n_alpha},
				{id : "4127",color:mapColor,alpha:n_alpha},
				{id : "4128",color:mapColor,alpha:n_alpha},
				{id : "4157",color:mapColor,alpha:n_alpha},
				{id : "4148",color:mapColor,alpha:n_alpha},
				{id : "4180",color:mapColor,alpha:n_alpha},
				{id : "4163",color:mapColor,alpha:n_alpha},
				{id : "4137",color:mapColor,alpha:n_alpha},
				{id : "4141",color:mapColor,alpha:n_alpha}
			]
			*/
			areas:[
				{id : "4139",color:arrColor[0],alpha:n_alpha},
				{id : "4119",color:arrColor[1],alpha:n_alpha},
				{id : "4121",color:arrColor[2],alpha:n_alpha},
				{id : "4129",color:arrColor[3],alpha:n_alpha},
				{id : "4131",color:arrColor[4],alpha:n_alpha},
				{id : "4145",color:arrColor[5],alpha:n_alpha},
				{id : "4113",color:arrColor[6],alpha:n_alpha},
				{id : "4117",color:arrColor[7],alpha:n_alpha},
				{id : "4143",color:arrColor[8],alpha:n_alpha},
				{id : "4111",color:arrColor[9],alpha:n_alpha},
				{id : "4146",color:arrColor[10],alpha:n_alpha},
				{id : "4161",color:arrColor[11],alpha:n_alpha},
				{id : "4115",color:arrColor[12],alpha:n_alpha},
				{id : "4136",color:arrColor[13],alpha:n_alpha},
				{id : "4125",color:arrColor[14],alpha:n_alpha},
				{id : "4165",color:arrColor[15],alpha:n_alpha},
				{id : "4182",color:arrColor[16],alpha:n_alpha},
				{id : "4183",color:arrColor[17],alpha:n_alpha},
				{id : "4167",color:arrColor[18],alpha:n_alpha},
				{id : "4150",color:arrColor[19],alpha:n_alpha},
				{id : "4155",color:arrColor[20],alpha:n_alpha},
				{id : "4122",color:arrColor[21],alpha:n_alpha},
				{id : "4159",color:arrColor[22],alpha:n_alpha},
				{id : "4127",color:arrColor[23],alpha:n_alpha},
				{id : "4128",color:arrColor[24],alpha:n_alpha},
				{id : "4157",color:arrColor[25],alpha:n_alpha},
				{id : "4148",color:arrColor[26],alpha:n_alpha},
				{id : "4180",color:arrColor[27],alpha:n_alpha},
				{id : "4163",color:arrColor[28],alpha:n_alpha},
				{id : "4137",color:arrColor[29],alpha:n_alpha},
				{id : "4141",color:arrColor[30],alpha:n_alpha}
			]
		},
		areasSettings : {
			autoZoom : true,

			/* 선택된 면 색상 */
			selectedColor : "#2bb87a",

			/* 오버 선 색상 */
			rollOverOutlineColor: "#2bb87a",
			
			/* 선 색상(기본) */
			outlineColor: "#FFF",

			/*면 색상(기본)*/
			color: "#000000",
			
			outlineAlpha: 1,
			outlineThickness: 1.5,
		},

		zoomControl: {
			panControlEnabled: false, //4방향 키
			zoomControlEnabled: true,
			homeButtonEnabled:true
		},
		export : {
			enabled : false,
			position : 'top-right'
		}
	});

	// add events to recalculate map position when the map is moved or zoomed
	map.addListener("positionChanged", updateCustomMarkers);

	// this function will take current images on the map and create HTML elements for them
	function updateCustomMarkers (event) {
		// get map object
		var map = event.chart;
		
		// go through all of the images
		for( var x in map.dataProvider.images) {
			// get MapImage object
			var image = map.dataProvider.images[x];
			
			// check if it has corresponding HTML element
			if ('undefined' == typeof image.externalElement)
				image.externalElement = createCustomMarker(image);

			// reposition the element accoridng to coordinates
			image.externalElement.style.top = map.latitudeToY(image.latitude) + 'px';
			image.externalElement.style.left = map.longitudeToX(image.longitude) + 'px';
		}
	}

	// this function creates and returns a new marker element
	function createCustomMarker(image) {
		// create holder
		var holder = document.createElement('div');

		if (image.Type == 'Group') {
			holder.className = 'grp-marker';
		} else {
			holder.className = 'item-marker';
		}
		holder.title = image.title;
		holder.id = image.id;
		holder.style.position = 'absolute';
		
		// maybe add a link to it?
		if (undefined != image.url) {
			holder.onclick = function() {
				window.location.href = image.url;
			};
			holder.className += ' map-clickable';
		}
		
		// create dot : 애니메이션
		var dot = document.createElement('div');
		if (image.Type == 'Group'){
			if (image.Status > 0) dot.className = 'dot';
		}
		//else dot.className = 'dot-item';
		holder.appendChild(dot);
		
		// create pulse : 원
		var pulse = document.createElement('div');
		if (image.Type == 'Group') {
			pulse.className = 'pulse';
			if (image.Status > 1) pulse.className = 'pulse warn'; //경고
			else if (image.Status == 1) pulse.className = 'pulse normal'; //정상
			else pulse.className = 'pulse gray'; //알수없음
		} else pulse.className = 'pulse-item transition';
		holder.appendChild(pulse);

		// create label for value : kW
		var lbl = document.createElement('div');
		if (image.Type == 'Group') {
			lbl.className = 'lbl';
			lbl.id = 'lbl_'+image.id;
			lbl.style.position = 'relative';
			lbl.style.width = '60px';
			lbl.style.top = '-20px';
			lbl.style.left = '-20px';
			lbl.style.textAlign = 'center';
			lbl.innerHTML = image.display_value;
		} else pulse.className = 'pulse-item';
		holder.appendChild(lbl);
		
		// append the marker to the map container
		image.chart.chartDiv.appendChild(holder);
		
		return holder;
	}

	//맵 조각 버튼
	map.addListener("clickMapObject", function(event) {
		var areaID = event.mapObject.id;
		if( areaID != null || typeof areaID  != 'undefined' ) {
			
			var main = $(".grp-marker"); //그룹군
			var sub = $('.item-marker'); //발전소군
			sub.css('display', 'block');

			_AreaName = event.mapObject.title;
			_RequestHandler(areaID); //오로지 cityCode
		}
	});

	//홈 버튼
	map.addListener("homeButtonClicked", function(event) {
		var main = $(".grp-marker"); //그룹군
		var sub = $('.item-marker'); //발전소군
		sub.css('display', 'none');
		
		_AreaName = _DefaultCityName;
		_RequestHandler(_DefaultCityCode);
	});
}


/*************************
* 맵 스테이터스 반영(파라메터를 받아서 맵 스테이터스를 반영)
**************************/
function SetAmMapStatus($cityCode, $ppid, $status, $label)
{
	//console.log("$cityCode["+$cityCode+"]", "$ppid["+$ppid+"]", "$status["+$status+"]", "$label["+$label+"]");

	//발전소( $ppid )코드가 없으면 cityCode(시)를 실행
	if( $ppid == "" )
	{
		var div_id = $("#gid_" + $cityCode);
		var dot_ani = div_id.children().eq(0);
		var pulse = div_id.children().eq(1);
		var lbl = div_id.children().eq(2);
		
			//init ( class and label )
		var div_id_ChildLen = div_id.children().length;
		for( var i=0; i<div_id_ChildLen; ++i)
		{
			div_id.children().eq( i ).removeClass();
		}
		lbl.text('');
		
			//circle update
		if( $status > 1 ){ //경고
			dot_ani.addClass('dot'); // <= warn has a dot ani
			pulse.addClass('pulse warn');
		}else if ( $status == 1 ){ //정상
			dot_ani.addClass('dot'); // <= warn has a dot ani
			pulse.addClass('pulse normal');
		}else{ //알수없음
			pulse.addClass('pulse gray');
		}
		
			//용량표기 업데이터
		lbl.text( $label );
	}
	//발전소( $ppid )코드가 있으면 실행
	else
	{
		var div_ppid = $("#PPID_" + $ppid);

		var lbl = div_ppid.children().eq(0);
		var pulse = div_ppid.children().eq(1);

			//img update
		if( $status > 1 ){ //경고
			pulse.css('background-image', 'url(template/images/icon_solar_2.png)');
		}else if ( $status == 1 ){ //정상
			pulse.css('background-image', 'url(template/images/icon_solar_1.png)');
		}else{ //알수없음
			pulse.css('background-image', 'url(template/images/icon_solar_0.png)');
		}

		lbl.text( $label );
	}
	
}//end. SetAmMapStatus



/*
*************************************************************************************************
*
* 부트스트랩 툴팁
*
*************************************************************************************************
*/
$("[data-toggle='tooltip']").tooltip();

/*****************************************************************************************************
 *
 * date picker 라이브러리
 * 
 ***************************************************************************************************** 
 */
//	$('.date-time').datetimepicker({
//		format: 'YYYY-MM-DD HH:mm:ss'
//	});


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

//jQuery().UItoTop({ easingType: 'easeOutQuart' });



/*****************************************************************************************************
 *
 *	제이쿼리 폼 컨트롤 - sendToPopup
 * 
 ***************************************************************************************************** 
 */
/*
<form id="PopForm" method="post" action="<?=$_SERVER["SCRIPT_NAME"]?>" target="_Window">
	<input type="hidden" name="id" value="<?=$TableID?>" />
	<input type="hidden" name="pop" value="1" />
	<input type="hidden" name="mode" value="" />
	<input type="hidden" name="code" value="" />
	<input type="hidden" name="seq" value="" />
	<input type="hidden" name="vOpt1" value="" />
	<input type="hidden" name="vOpt2" value="" />
	<input type="hidden" name="vmode" value="" />
</form>
function sendToPopup($varID, $refvarID, $objectType, $objectDescr, $pw, $ph){
		
	//console.log($varID, $refvarID, $objectType, $pw, $ph);
	
	var url		= "./waste.php";
	var title	= "popup_"+curDate();
	
	//screen
	var sw = screen.availWidth;
	var sh = screen.availHeight;
	
	//pop
	var pw = $pw || 1400;
	var ph = $ph || 600;
	
	//stage
	var sl = Math.floor(  (sw-pw)/2  );
	var st = Math.floor(  (sh-ph)/2  );

	var status = 'width='+pw+', height='+ph+', menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=no,resizable=no,scrolling=auto,top='+st+',left='+sl;
	window.open(url, title, status);
	
	var frm = $("#PopForm");
	frm.find("input[name='pop']").val('1');
	frm.find("input[name='mode']").val('view');
	frm.find("input[name='id']").val('LIVE');

	frm.find("input[name='code']").val(_nPLCID);
	frm.find("input[name='seq']").val($varID);
	frm.find("input[name='vOpt1']").val($refvarID);
	frm.find("input[name='vOpt2']").val($objectDescr);
	frm.find("input[name='vmode']").val($objectType);

	frm.attr({
		method:'post',
		action:url,
		encoding:"application/x-www-form-urlencoded",
		target:title
	}).submit();
}
*/



/*
* @resizeAlignCenter => 텍스트가 이미지 가운데 오도록 한다.
*/
/*
function resizeAlignCenter(el, $mode){
	var mode = typeof $mode !== 'undefined' ? $mode : 'absolute';

	var p = $(el).find("p");

	var cw = $(el).width();
	var pw = p.width();
	var ml = (cw - pw) / 2;
	
	if( mode == "relative" && ml > 0 ) ml = -ml;

	p.css("margin-left", ml);
}
*/


/*
//업로드할때 확장자 필터링 func. 2016.08.10 허정진
Validate(_mapsettingModal)

var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];    
function Validate(oForm) {
	var arrInputs = oForm.find("input");
	for (var i = 0; i < arrInputs.length; i++) {
		var oInput = arrInputs[i];
		if (oInput.type == "file") {
			var sFileName = oInput.value;
			if (sFileName.length > 0) {
				var blnValid = false;
				for (var j = 0; j < _validFileExtensions.length; j++) {
					var sCurExtension = _validFileExtensions[j];
					if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
						blnValid = true;
						break;
					}
				}
				
				if (!blnValid) {
					alert("경고, " + sFileName + " 는 유효하지않은 이미지파일입니다.\n\n이미지는 다음형식을 지원합니다 : " + _validFileExtensions.join(", "));
					return false;
				}
			}
		}
	}
  
	return true;
}
*/


/*
function autoGrid($i, $w, $h){
	
	var column = 10; //가로에 표현할 갯수를 설정
	
	var point = new Object();
	
	point.x = ($i % column) * ($w + 40 ) + 20; // (w + gap) + startPoint
	point.y = Math.floor( $i / column ) * ($h + 50) + 50; // (h + gap0) + startPoint

	//point.x = ($i % column) * 180 + 50;
	//point.y = Math.floor( $i / column ) * 100 + 50;
	
	return point;
}
*/

