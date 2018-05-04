/**************************************************************************************************
*
* AutoGrid => x,y 겹치지 않게 위치 리턴해준다
*
**************************************************************************************************/
var AutoGrid = function($obj){
	
	//private
	var name = "AutoGrid";
	var author = "허정진";
	var ver = "2016.12.21";
	
	//public
	this.name = name;
	this._nI = 0;

	//extend
	this.defaultObj = {
		column : 10,
		log : false
	};
	for(var key in $obj){
		if( $obj.hasOwnProperty(key) ){
			this.defaultObj[key] = $obj[key];
		}
	}

}//end. AutoGrid

AutoGrid.prototype = (function(){

	return{

		init: function(){
			this._nI = 0;
		},

		getPoint: function($w, $h){

			var point = new Object();
			point.x = ( this._nI % this.defaultObj.column ) * ($w + 40) + 20; // (w + gap) + startPoint
			point.y = Math.floor( this._nI / this.defaultObj.column ) * ($h + 50) + 50; // (h+ gap0) + startPoint

			this._nI++;

			return point;
		}
	};

})();