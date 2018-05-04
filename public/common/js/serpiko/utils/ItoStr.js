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

	i = parseInt(i, 10);

	return (i < 10 ? '0'+i : i).toString();
}
ItoStr.prototype.num000 = function(i){

	i = parseInt(i, 10);

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
