//NumberToSize, NumberToComma : 사이즈 표기와 3자릿수 콤마
function NumberToSize($x, $type, $toFixedNumber) {
	
	var ver = "2017.03.24 허정진";
	
	var type = $type || "W";
	var toFixedNumber = typeof $toFixedNumber == "undefined" ? 2 : $toFixedNumber;
	var prefix = new Array();
	var a = 1000;
	
	//console.log( "toFixedNumber:"+toFixedNumber );
	
	//전력 - 유효전력
	if ( type == "W" ){
		prefix = ['W', 'kW', 'MW', 'GW', 'TW', 'PW'];
		a = 1000;
	}else 
	
	//전력 - 와트시(1W를 1시간동안 사용한 전력량)
	if ( type == "Wh" ){
		prefix = ['Wh', 'kWh', 'MWh', 'GWh', 'TWh', 'PWh'];
		a = 1000;
	}else
	
	//전력 - 피상전력
	if ( type == "VA" ){
		prefix = ['VA', 'kVA', 'MVA', 'GVA', 'TVA', 'PVA'];
		a = 1000;
	}else 
	
	//전압
	if ( type == "V" ){
		prefix = ['V', 'kV', 'MV', 'GV', 'TV', 'PV'];
		a = 1000;
	}else 
	
	//전류
	if ( type == "A" ){
		prefix = ['A', 'kA', 'MA', 'GA', 'TA', 'PA'];
		a = 1000;
	}else 
	
	//전력 - 무효전력
	if ( type == "var" ){
		prefix = ['var', 'kvar', 'Mvar', 'Gvar', 'Tvar', 'Pvar'];
		a = 1000;
	}else 
	
	//이산화탄소 배출량
	if ( type == "co2" ){
		prefix = ['g CO2 eq', 'kg CO2 eq', 't CO2 eq', 'Kt CO2 eq', 'Mt CO2 ', 'Gt CO2 eq'];
		a = 1000;
	}
	else

	//무게
	if ( type == "g" ){
		prefix = ['g', 'kg', 't', 'Kt', 'Mt', 'Gt'];
		a = 1000;
	}
	
	//0이면 계산하지 않고 : "값 + 단위" 로 리턴한다.
	if( $x == 0 || $x == null ) {
	    return "0 " + type;
	}

	//log : y가 a의 거듭제곱 이라면, 밑이 a 이고 진수가 y인 로그 x가 된다.
	var y = Math.floor(Math.log($x) / Math.log(a));

	//Math.pow로 1024의 e제곱 값을 구한다.
	return ($x / Math.pow(a, y)).toFixed(toFixedNumber) + " " + prefix[y];
};

// W ~ kW
function NumberToSizeW($x){

	var y;
	var unit = "W";
	//0이면 계산하지 않고 : "값 + 단위" 로 리턴한다.
	if( $x == 0 || $x == null ) {
	    return "0"+unit;
	}

	if( 1000 > $x ){
		y = Math.floor($x);
	}else{
		y = Math.floor($x / 1000);
		unit = "kW";
	}

	return NumberToComma(y) + unit;
}

// kW
function NumberToSizekW($x){
	
	//0이면 계산하지 않고 : "값 + 단위" 로 리턴한다.
	if( $x == 0 || $x == null ) {
	    return "0kW";
	}

	var y = Math.floor($x / 1000);

	return NumberToComma(y)+"kW";
}

// kWh
function NumberToSizekWh($x){

	//0이면 계산하지 않고 : "값 + 단위" 로 리턴한다.
	if( $x == 0 || $x == null ) {
	    return "0kWh";
	}

	var y = Math.floor($x / 1000);
	return NumberToComma(y)+"kWh";
}

//NumberToSizeEx : 도면 보기용 단위 제거 및 kW Fix 함수 2016-11-14
function NumberToSizeEx($x, $type) {
	
	var type = $type || "W";
	var prefix = new Array();
	var a = 1000;
	var ver = "2016.11.09 허정진";
	
	//0이면 계산하지 않고 : "값 + 단위" 로 리턴한다.
	if( $x == 0 || $x == null ) {
	    return "0";
	}

	//log : y가 a의 거듭제곱 이라면, 밑이 a 이고 진수가 y인 로그 x가 된다.
	var y = Math.floor($x / a);
	if ( type == "%") y.toFixed(2);
	return y;

};


function NumberToComma(x) {
	return String(x).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};

// 2017.03.27 원단위 절사 함수
function NumberToCutToWon( $number ){
	
	//타입변환
	var num = parseInt($number, 10);
	
	// 10미만 => 0으로 처리
	if ( 10 > num ) return 0;
	
	// 10으로 나누고 floor로 소수점 버린후 * 10 해서 다시 자리수를 맞춘다.
	return Math.floor(num/10) * 10;
}