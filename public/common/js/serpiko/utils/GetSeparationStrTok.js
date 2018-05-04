function GetSeparationStrTok($str, $strTok){
	//$str = grp_1 이라 가정. GetSeparationStrTok( "grp_", "_");
	var idx = $str.indexOf($strTok) + 1;
	var prefix = parseInt($str.substr(0, idx), 10);  // "grp_"
	//var postfix = parseInt($str.substr(idx), 10);  // "1"

	return prefix;
}

function GetValueToHyphen($value){
	
	if( typeof $value == "undefined" || $value == null || $value == "" ){
		return "-";
	}else{
		return $value;
	}
}