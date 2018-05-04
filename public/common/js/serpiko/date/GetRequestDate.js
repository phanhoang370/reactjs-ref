/**

ver. 2017.04.10 허정진

*********************************************************************************

[리턴값] : Object

Object.sFromYMD; // 시작 년월일 [형식 : YYYY-MM-DD]
Object.sFromHis; // 시작 시분초 [형식 : H:i:s]
Object.sToYMD;   // 종료 년월일 [형식 : YYYY-MM-DD]
Object.sToHis;   // 종료 시분초 [형식 : H:i:s]

*********************************************************************************

### 1. "월" 구하기 : [month, 연도] 전달
GetRequestDate( "month", 2017 );  // 2017.01.01 00:00:00 ~ 2017.02.18 20:17:29
GetRequestDate( "month, "2016" ); // 2016.01.01 00:00:00 ~ 2016.12.31 23:59:59


### 2. "일" 구하기 : ["day", 연도, 월] 전달
GetRequestDate( "day", 2017, 2 ); // 2017.02.01 00:00:00 ~ 2017.02.18 20:17:29
GetRequestDate( "day", 2017, 1 ); // 2017.01.01 00:00:00 ~ 2017.01.31 23:59:59


### 3. "시간" 구하기 : ["time" || "hours", 연도, 월, 일] 전달
GetRequestDate( "time", 2017, 2, 18 ); // 2017.02.01 00:00:00 ~ 2017.02.18 20:17:29
GetRequestDate( "time", 2017, 2, 16 ); // 2017.02.01 00:00:00 ~ 2017.02.16 23:59:59


### 4. "24시간 전" 구하기 : [ "before24hours" ]

GetRequestDate("before24hours");

2017-02-17 00:18:59 ~ 2017-02-18 00:18:59


### 5. "15분 전" 구하기 : [ "before15minutes", 2017, 2, 18, 00, 21 ]

GetRequestDate("before15minutes", 2017, 2, 18, 00, 21 );

2017-02-17 00:16:00 ~ 2017-02-18 00:21:00


### 6. "12개월 전" 구하기 ["before12month"]

	GetRequestDate("before12month");

	2016-01-18 00:21:00 ~ 2017-02-18 00:21:00

	"12개월 전" 년월을 파라메터로 전달하면 해당 before12month를 구한다.

	GetRequestDate("before12month", 2017, 03); //=> 2017년 3월 10일로 요청하면

	2016-04-10 15:43:27 ~ 2017-03-01 00:00:00

**/




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
	i = String(i);
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

function GetRequestDate( $mode, $year, $month, $day, $hours, $minutes ){

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
	var sFromHis = itoStr.num00(nMinHours)+":"+itoStr.num00(nMinMin)+":"+itoStr.num00(nMinSec);
	var sToHis = itoStr.num00(nMaxHours)+":"+itoStr.num00(nMaxMin)+":"+itoStr.num00(nMaxSec);

	$month || nMinMonth;
	$day || nMinDay;
	
	/******************************************************************************** 
	*
	*@월별 모드 : 1,2,3 ... 12월
	*
	********************************************************************************/
	if( $mode == "month"){
		
		//부터 : 파라메터년 min월 min일 min시 min분 min초
		sFromYMD = $year+"-"+itoStr.num00(nMinMonth)+"-"+itoStr.num00(nMinDay);

		//       min시간 min분 min초
		sFromHis = itoStr.num00(nMinHours)+":"+itoStr.num00(nMinMin)+":"+itoStr.num00(nMinSec);
		
		//까지 : 현재 년도 > 파라메터년 미만
		if( cDate.getFullYear() > $year ){
			// 파라메터년 + 맥스달 + 맥스데이
			sToYMD = $year+"-"+itoStr.num00(nMaxMonth)+"-"+itoStr.num00(nMaxDay);

			// max시간 max분 max초
			sToHis = itoStr.num00(nMaxHours)+":"+itoStr.num00(nMaxMin)+":"+itoStr.num00(nMaxSec);


		}else{
			// year + 현재달 + 현재날
			sToYMD = $year+"-";
			sToYMD += itoStr.num00(cDate.getMonth() + 1)  + '-';
			sToYMD += itoStr.num00(cDate.getDate());
			
			// 현재시간 + 현재분 + 현재초
			sToHis = cDate.getHours() +':';
			sToHis += itoStr.num00(cDate.getMinutes())+':';
			sToHis += itoStr.num00(cDate.getSeconds())+'';
		}
	}else
	/********************************************************************************
	*
	*@일별 모드 : 1,2,3 .... 31일
	*
	********************************************************************************/
	if( $mode == "day" ){

		//부터 : 파라메터년 파라메터달 min일
		sFromYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00( nMinDay );

		//       min시간 min분 min초
		sFromHis = itoStr.num00(nMinHours)+":"+itoStr.num00(nMinMin)+":"+itoStr.num00(nMinSec);
		
		//까지 : '현재 년 월' 인 경우 
		if( cDate.getFullYear() == $year &&  cDate.getMonth() + 1 == $month ){
			// 현재년 + 현재달 + 현재날 
			sToYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00(cDate.getDate());

			// 현재시간 + 현재분 + 현재초
			sToHis = cDate.getHours() +':';
			sToHis += itoStr.num00(cDate.getMinutes())+':';
			sToHis += itoStr.num00(cDate.getSeconds())+'';
		}else{
			// 파라메터년 + 파라메터달 + 그달의 마지막날
			var lastDate = ( new Date($year, $month, 0) ).getDate();
			sToYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00(lastDate);

			// max시간 max분 max초
			sToHis = itoStr.num00(nMaxHours)+":"+itoStr.num00(nMaxMin)+":"+itoStr.num00(nMaxSec);
		}
	}else
	/********************************************************************************
	*
	*@시간대별 모드 : 01,02,03 ... 24시
	*
	********************************************************************************/
	if( $mode == "time" || $mode == "hours" ){

		//부터 : 파라메터년 파라메터달 파라메터일
		sFromYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00($day);

		//       min시간 min분 min초
		sFromHis = itoStr.num00(nMinHours)+":"+itoStr.num00(nMinMin)+":"+itoStr.num00(nMinSec);

		//까지 : 파라메터년 파라메터달 파라메터일
		sToYMD = $year+"-"+itoStr.num00($month)+"-"+itoStr.num00($day);
		
		// max시간 max분 max초
		sToHis = itoStr.num00(nMaxHours)+":"+itoStr.num00(nMaxMin)+":"+itoStr.num00(nMaxSec);

		//시간 : '현재 년 월 일' 인 경우
		if( cDate.getFullYear() == $year &&  cDate.getMonth() + 1 == $month && cDate.getDate() == $day ){

			//시간을 현재 시간으로 설정한다.
			sToHis = cDate.getHours() +':';
			sToHis += itoStr.num00(cDate.getMinutes())+':';
			sToHis += itoStr.num00(cDate.getSeconds())+'';
		}
	}else
	/********************************************************************************
	*
	*@24시간 전 (파라메터 xxx )
	*
	********************************************************************************/
	if( $mode == "before24hours" ){

		var pDate = new Date();
		pDate.setHours( cDate.getHours() - 24 ); //오늘 시간으로 부터 -24 시간

		sFromYMD = pDate.getFullYear() +"-"+ itoStr.num00(pDate.getMonth()+1) +"-"+ itoStr.num00(pDate.getDate());
		sFromHis = itoStr.num00(pDate.getHours()) +":"+ itoStr.num00(pDate.getMinutes()) +":"+ itoStr.num00(pDate.getSeconds());

		sToYMD = cDate.getFullYear() +"-"+ itoStr.num00(cDate.getMonth()+1) +"-"+ itoStr.num00(cDate.getDate());
		sToHis = itoStr.num00(cDate.getHours()) +":"+ itoStr.num00(cDate.getMinutes()) +":"+ itoStr.num00(cDate.getSeconds());
	}else
	/********************************************************************************
	*
	*@15분 전
	*
	********************************************************************************/
	if( $mode == "before15minutes" ){
		
		var pDate = new Date($year, $month-1, $day, $hours, $minutes);
		pDate.setMinutes( pDate.getMinutes() - 15 ); //파라메터로부터 -15분

		cDate = new Date($year, $month-1, $day, $hours, $minutes); //파라메터의 시간

		sFromYMD = pDate.getFullYear() +"-"+ itoStr.num00(pDate.getMonth()+1) +"-"+ itoStr.num00(pDate.getDate());
		sFromHis = itoStr.num00(pDate.getHours()) +":"+ itoStr.num00(pDate.getMinutes()) +":"+ itoStr.num00(pDate.getSeconds());

		sToYMD = cDate.getFullYear() +"-"+ itoStr.num00(cDate.getMonth()+1) +"-"+ itoStr.num00(cDate.getDate());
		sToHis = itoStr.num00(cDate.getHours()) +":"+ itoStr.num00(cDate.getMinutes()) +":"+ itoStr.num00(cDate.getSeconds());
	}else
	/********************************************************************************
	*
	*@12개월전 (파라메터로 년, 월 받게되면 => 해당 년월을 가지고 날짜 객체 만들어서 연산한다. )
	*
	********************************************************************************/
	if( $mode == "before12month" ){
		
		if( typeof $year != "undefined" && typeof $month != "undefined" ){
			/*
			new Date()
			new Date(milliseconds)
			new Date(dateString)
			new Date(year, month, day, hours, minutes, seconds, milliseconds)
			*/
			$month = Number($month) - 1;
			cDate = new Date($year, $month);
			//console.log( $year, $month, cDate );
		}

		var pDate = new Date();
		pDate.setMonth( cDate.getMonth() - 11 ); // - 11 개월

		sFromYMD = pDate.getFullYear() +"-"+ itoStr.num00(pDate.getMonth()+1) +"-"+ itoStr.num00(pDate.getDate());
		sFromHis = itoStr.num00(pDate.getHours()) +":"+ itoStr.num00(pDate.getMinutes()) +":"+ itoStr.num00(pDate.getSeconds());

		sToYMD = cDate.getFullYear() +"-"+ itoStr.num00(cDate.getMonth()+1) +"-"+ itoStr.num00(cDate.getDate());
		sToHis = itoStr.num00(cDate.getHours()) +":"+ itoStr.num00(cDate.getMinutes()) +":"+ itoStr.num00(cDate.getSeconds());
	}


	/* common return obj */
	var obj = new Object();
	obj.rqFromYMD = sFromYMD;
	obj.rqFromHMS = sFromHis;
	obj.rqToYMD = sToYMD;
	obj.rqToHMS = sToHis;

	return obj;
}

// TODO

// day를 넣으면 과거 시간~현재시간 리턴해준다. 2017.01.04 수정
/*
function prevDayDate( $day ){
	
	var cDate = new Date();
	var sTO = cDate.getFullYear() + '-';
	sTO += itoStr.num00(cDate.getMonth() + 1)  + '-';
	sTO += itoStr.num00(cDate.getDate());
	
	var His = cDate.getHours() +':';
	His += itoStr.num00(cDate.getMinutes())+':';
	His += itoStr.num00(cDate.getSeconds())+'';
	
	var pDate = new Date();
	pDate.setDate( cDate.getDate() - $day );

	var sFROM = pDate.getFullYear() + '-';
	sFROM += itoStr.num00(pDate.getMonth() + 1)  + '-';
	sFROM += itoStr.num00(pDate.getDate());
	
	var obj = new Object();
	obj.sTO = sTO;
	obj.His = His;
	obj.sFROM = sFROM;
	
	return obj;
}
*/