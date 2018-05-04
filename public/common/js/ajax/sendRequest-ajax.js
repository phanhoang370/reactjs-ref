/************************************************************************************
*
*	sendRequest-ajax
*
*	author : 허정진  http://tistory.serpiko.com
*
*	update : 2016.04.27
*
* 
*
* 권장하는 사용법



(function(){
	//클래스 객체생성 ( object pool을 사용하여 한번만 객체 생성)
	var xhrClass = new XhrClass;
	
	//url과 parameter 입력
	var url = "data.php";
	var param = "Act=default";

	//class의 sendRequest메서드를 사용하여 XMLHTTPRequest를 호출.
	xhrClass.sendRequest(url, param, complete, 'json');
	function complete(xhr, res)
	{
		//console.log( res );

		var name = res;			// <= 'text'
		var name = res.val;		// <= 'json'
		var name = res[0].val;	// <= 'json'
	}
				
	window.setInterval(function(){
		xhrClass.stop();
		xhrClass.sendRequest('data.php', param, complete, 'json');
	}, 3000);

})();



*
*
*
*
************************************************************************************/





/************************************************************************************
*
* Trim, Ltrim, Rtrim
*
************************************************************************************/
String.prototype.Trim = function() 
{
    return this.replace(/(^\s*)|(\s*$)/gi, "");
};

String.prototype.Ltrim = function() 
{
    return this.replace(/^\s*/, "");
};

String.prototype.Rtrim = function() 
{
    return this.replace(/\s*$/, "");
};



/************************************************************************************
*
* XMLHttpRequest Pool
*
************************************************************************************/
var XhrClass = function($xhr)
{
	this.xhr = null;
	this.create();
}


/************************************************************************************
*
* XMLHttpRequest - parseJSON
*
************************************************************************************/
var _rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
XhrClass.prototype.parseJSON = function($data){
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

/************************************************************************************
*
* XMLHttpRequest - create
*
************************************************************************************/
XhrClass.prototype.create = function(){

	if(window.ActiveXObject) // IE 이전 버전
		this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
	else
		this.xhr = new XMLHttpRequest();
	
	//return this.xhr;
}


/************************************************************************************
*
* XMLHttpRequest - stop
*
************************************************************************************/
XhrClass.prototype.stop = function(){
	this.xhr.abort();
	//console.log( this.xhr +  "의 동작을 캔슬합니다.");
}


/************************************************************************************
*
* XMLHttpRequest - sendRequest(
*								$url:파일경로, 
*								$param:전달할파라메터, 
*								$callback:완료시 호출될 콜백함수, 
*								$type:타입 구분 text/json, 
*								$method:GET/POST, 
*								$asyncBool:비동기여부 true/false
*								$log: 로그보기 true / false
*							)
*
************************************************************************************/
XhrClass.prototype.sendRequest = function($url, $param, $callback, $type, $method, $asyncBool, $log){
	
	var thisClass = this;
	var $xhr = thisClass.xhr;
	
	//필수파라메터
	if( typeof $xhr == "undefined" || $xhr == null) throw new Error( getLog($url, $param) + "xhr객체가 생성되지 않았습니다." );
	if( typeof $url == "undefined" || $url == "" ) throw new Error( getLog($url, $param) + "전달받은 url이 없습니다." );
	if( typeof $param == "undefined" ) throw new Error( getLog($url, $param) +"전달받은 param가 없습니다." );
	if( typeof $callback == "undefined" || typeof $callback != "function" ) throw new Error( getLog($url, $param) +"리턴받을 CallBack 함수가 없거나 함수타입이 아닙니다." );
	if( typeof $type == "undefined" || $type == "" ) throw new Error( getLog($url, $param) + "데이터타입을 선택하세요 'text / json'" );
	
	//옵션 파라메터 = 기본값 처리(GET방식, 비동기처리, 로그안보임)
	if( typeof $method == "undefined" ) $method = "GET";
	if( typeof $asyncBool == "undefined" ) $asyncBool = true;
	if( typeof $log == "undefined" ) $log = false;

	
	$param = ( $param == null || $param == '' ) ? null : encodeURI($param);

	$method = ($method.toLowerCase() == "get") ? "GET" : "POST";

	if($method == "GET" && $param != null) $url = $url + "?" + $param;
	
	$xhr.open($method, $url, $asyncBool);
	$xhr.timeout = 1000 * 29;
	$xhr.ontimeout = function(e){
		console.log( getLog($url, $param)+ '타임아웃' );
	}
	$xhr.onprogress = function(e){
		if (e.lengthComputable) 
		{	
			/*
			e.loaded the bytes browser receive
			e.total the total bytes seted by the header
			*/
			var percentComplete = (e.loaded / e.total)*100;  
			//console.log( percentComplete );
		} 
	}
	$xhr.onerror = function(e){
		console.log( getLog($url, $param)+ '에러' );
	}
	$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	
	$xhr.send(  ($method == "POST")? $param : null   );

	$xhr.onreadystatechange = function()
	{	
		if($xhr.readyState !== XMLHttpRequest.DONE) return;
    
		if($xhr.readyState == 4){  //응답완료 (0~4단계)
			
			if($xhr.status == 200){ //응답이 정상인 경우
				
				var res;
				switch($type)
				{
					/*
					* text
					*/	
					case 'text' :
						res = $xhr.responseText;
					break;
					
					/*
					* json
					*
					* {"name":"myName"}  =>  res.name 은 myName
					*
					* [{"name":"myName"}]  =>  res[0].name 은 myName
					*/
					case 'json' :
						res = thisClass.parseJSON( $xhr.responseText );
					break;
					
				}

				$callback( $xhr, res );

				if($log) console.log( getLog($url, $param)+ '로드를 성공했습니다. 성공코드 xhr.status: [' + $xhr.status +']' );
			}else
				console.log( getLog($url, $param)+ '로드를 실패했습니다. 에러코드 xhr.status: [' + $xhr.status +']' );
		}
	};
}

/************************************************************************************
*
* getLog($url, $param)
*
************************************************************************************/
function getLog($url, $param)
{
	var newDate = new Date();
	var year = newDate.getFullYear();
	var month = newDate.getMonth()+1;
	month = (month < 10 ? "0" : "" ) + month;

	var date = newDate.getDate();
	date = (date < 10 ? "0" : "") + date;
	var dayNames= ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
	var dayName = dayNames[newDate.getDay()];

	var seconds = new Date().getSeconds();
	seconds = (seconds < 10 ? "0":"") + seconds;
	
	var minutes = new Date().getMinutes();
	minutes = (minutes < 10 ? "0":"") + minutes;

	var hours = new Date().getHours();
	hours = (hours < 10 ? "0":"") + hours; //24
	
	//$('#time').html( hours  + ' : ' + minutes + ' : ' + seconds );

	var ampm = '';
	if( hours > 12 ) {
		//hours = hours - 12;
		ampm = 'PM';
	}else{
		ampm = 'AM';
	}
	
	return( "["+ year +"-"+ month +"-"+ date +" "+ dayName +" "+ hours +":"+ minutes +":"+ seconds +"] URL["+$url+"], Param["+$param+"] : ");
}

