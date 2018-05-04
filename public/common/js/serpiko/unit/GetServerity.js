/*


- 2017.03.22 18:28 허정진 GetServerityColor 추가

  color 스테이터를 문자열로 반환한다.




*/

function GetServerity( $statusNum ){

	var descr = "";
	var num = parseInt($statusNum, 10);

	switch( num ){
		
		case 0:
			descr = "?";
		break;

		case 1:
			descr = "정상";
		break;

		case 2:
			descr = "확인";
		break;

		case 3:
			descr = "경고";
		break;

		case 4:
			descr = "심각";
		break;

		case 5:
			descr = "응급";
		break;

		default:
			descr = "미정";
	}
	
	return descr;
}


function GetServerity2( $statusNum ){
	
	var descr = "";
	var num = parseInt($statusNum, 10);
	
	if( num == 0 ) {
		descr = "?";
	}else
	if( num == 1 ) {
		descr = "정상";
	}else
	if( num >= 2 && num <= 3 ) {
		descr = "주의";
	}
	else if( num >= 4 && num <= 5 ) {
		descr = "심각";
	}

	return deacr;
}

function GetServerityColor( $statusNum ){
	var descr = "";
	var num = parseInt($statusNum, 10);

	switch( num ){
		
		case 0:
			descr = "blue";
		break;

		case 1:
			descr = "green";
		break;

		case 2:
			descr = "yellow";
		break;

		case 3:
			descr = "orange";
		break;

		case 4:
			descr = "violet";
		break;

		case 5:
			descr = "red";
		break;

		default:
			descr = "gray";
	}
	
	return descr;
}
