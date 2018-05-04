//getValueToHyphen
function getValueToHyphen($value, $floor){
	
	if( typeof $value == "undefined" || $value == null || $value == "" ){
		return "-";
	}else{
		if( $floor ) $value = Math.floor($value);
		
		return $value;
	}
}