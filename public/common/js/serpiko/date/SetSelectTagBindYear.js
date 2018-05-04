/****************************************************************************
*
*@ SetSelectTagBindYear(   (elementID)엘리먼트ID [, (int)전체 년 수][, (int)셀렉트 될 년]   )
*
*ex) SetSelectTagBindYear("search_year", 20, 2015);

html

<select id='search_year' class='form-control'>
	<option value='2016' selected='selected'>2016</option>
</select>

*
****************************************************************************/
function SetSelectTagBindYear($elementID, $totalAmountYear, $selectedYear){

	var currentYear = Number( new Date().getFullYear() );
	var totalAmountYear = $totalAmountYear || 20;
	var strOption = "";
	var calc = 0;
	var seleted = "";
	var selectedYear = $selectedYear || currentYear;
	
	for(var i=0; i<=totalAmountYear; i++){
		calc = currentYear - i;
		
		if( calc == selectedYear ) seleted = "selected='selected'";
		else seleted = "";

		strOption += "<option value='"+calc+"' "+seleted+">"+calc+"</option>";
	}
	$("#"+$elementID).html( strOption );
}