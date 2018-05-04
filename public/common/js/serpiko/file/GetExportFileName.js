function GetExportFileName($exc){

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