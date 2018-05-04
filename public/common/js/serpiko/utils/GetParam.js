function GetParam( $obj, $encodeBool ){
	
	var ver = "2017.03.06";

	$encodeBool = $encodeBool || false;

	var str = "";
	for (var key in $obj){
		if( str != "" ){
			str += "&";
		}

		if( $encodeBool )str += key + "=" + encodeURIComponent( $obj[key] ); // decodeURIComponent
		else str += key + "=" +  $obj[key];
	}
	
	return str;
}

