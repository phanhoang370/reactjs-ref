/*-----------------------------------------------------------
*

//
var makeChartData = new MakeChartData();
console.log( makeChartData.json );

//
var makeChartData2 = new MakeChartData();
makeChartData2.json = {
	"debug": true,
	"postfix": "",
	"format"			: "YYYY-MM-DD HH",
	"fromDate"			: "2017-03-01 12",
	"toDate"			: "2017-03-03 17",
	"intervalSeconds"	: 60*60,
	"valueField"		: ["VAL_0", "VAL_1", "VAL_2"],
	"valueMin"			: [1,100,200],
	"valueMax"			: [100,200,300],
};
console.log( makeChartData2.json );

//
var makeChartData3 = new MakeChartData({
	"debug": true,
	"format"			: "YYYY-MM-DD HH",
	"fromDate"			: "2017-05-01 12",
	"toDate"			: "2017-05-05 17",
	"intervalSeconds"	: 60*60,
	"valueField"		: ["VAL_0", "VAL_1"],
	"valueMin"			: [1,100],
	"valueMax"			: [100,200],
});
console.log( makeChartData3.json );


*
-----------------------------------------------------------*/
var MakeChartData = function($obj){
	
	//private
	var name = "MakeChartData";
	var author = "허정진";
	var ver = "2017.02.22";
	
	//public
	this.name = name;
	this.resultJson;
	//this.extends = this.inherit( MakeChartData, this.extends ); //instance extend

	//extend
	this.defaultObj = {
		"format"			: "YYYY-MM-DD HH:mm:ss",
		"categoryField"		: "category",

		"fromDate"			: new Date().setDate( new Date().getDate()-1 ),
		"toDate"			: new Date(),

		"intervalSeconds"	: 15 * 60,
		
		"valueField"		: "VAL",
		"valueMin"			: 1,
		"valueMax"			: 100,

		//"valueField"		: ["VAL_0", "VAL_1", "VAL_2"],
		//"valueMin"			: [1,100,200],
		//"valueMax"			: [100,200,300],
		
		"postfix"			: {"rqSource":"client", "ErrCode":0, "ErrMsg":"Success"},
		"debug"				: false,
	};

	for(var key in $obj){
		if( $obj.hasOwnProperty(key) ){
			this.defaultObj[key] = $obj[key];
		}
	}

	//build
	this.build.classLength++;
	this.build();
}//end. MakeChartData

MakeChartData.prototype = (function(){

	return{
		
		//
		build: function(){
//			if( typeof this.control == "undefined" || this.control.name != "Control"  ){
//				throw new Error( "["+this.name+"] : Control 객체를 상속받지 못했습니다. Control 객체를 먼저 '생성'해 주세요." );
//				return false;
//			}
		},
		
		inherit: function( Parent, Child ){
			Child = function(){
				Parent.call( this );
			}
			
			try{
				if (!Object.create) {
					Object.create = (function(){
						function F(){}
							return function(o){
							if (arguments.length != 1) {
								throw new Error('Object.create 구현은 한개의 매개변수만 받아들입니다. ( Object.create implementation only accepts one parameter. )');
							}
							F.prototype = o;
							return new F();
						}
					})();
				}
				
				Child.prototype = Object.create( Parent.prototype );
				
				Child.prototype.constructor = Child;
				
				//override
				//Child.prototype.build = function(){ alert('hi, I am a Child'); };
				
				var child = new Child();
				if(child instanceof Parent === true) 
					return child;
				else 
					return new Parent();

			}catch(e){
				throw new Error( "[ inherit Error ] : "+ Parent.name +"객체를 상속받지 못했습니다. "+ Parent.name +" 객체를 '확인'해 주세요." );
			}
		},

		getValue:function(){
			
			var _this = this;

			var categoryField	= _this.defaultObj.categoryField;

			var fromDate		= _this.defaultObj.fromDate;
			var fromDateUnix	= moment(fromDate).unix(); //=>

			var toDate			= _this.defaultObj.toDate;
			var toDateUnix		= moment(toDate).unix(); //=>

			var intervalSeconds = _this.defaultObj.intervalSeconds;
			var format			= _this.defaultObj.format;
			
			var arr = [];
			var obj = {};
			
			if( _this.defaultObj.debug ){
				console.group( "[ "+_this.name + "Class ] debug : "+_this.defaultObj.debug );

				console.log( "[ 입력받은 날짜 ] "+ fromDate +" / "+toDate );

				console.log( "[ Unix 변환 moment(Date).unix() ] "+fromDateUnix +" / "+toDateUnix );

				console.log( "[ 날짜변환 moment().unix(Date) ] "+moment.unix(fromDateUnix).format(format) +" / "+ moment.unix(toDateUnix).format(format) );

				console.groupEnd();
			}
			
			for(var i = fromDateUnix; i<=toDateUnix; i++){
				if( i % intervalSeconds == 0 ){
					obj = {};
					obj[categoryField]	= moment.unix(i).format(format);
					_this.getValueProcessing(obj);

					arr.push( obj );
				}
			}
			_this.resultJson = _this.getJsonMerge( arr );
		},

		getValueProcessing:function($obj){
			
			var _this = this;
			
			var valueField	= _this.defaultObj.valueField;
			var valueMin	= _this.defaultObj.valueMin;
			var valueMax	= _this.defaultObj.valueMax;
			
			var vMin = valueMin; //배열이 아닌경우 기본값 적용을 위해서
			var vMax = valueMax;
			
			if( (typeof valueField).toLowerCase() == "string" ){
				$obj[valueField] = _this.getRandomize(valueMin, valueMax, true);
			}else
			if(  Object.prototype.toString.call( valueField ) === '[object Array]' ){

				valueField.forEach(function(item, index, array){
					
					if( Object.prototype.toString.call( valueMin ) === '[object Array]' ) {
						vMin = valueMin[index];
					}
					if( Object.prototype.toString.call( valueMax ) === '[object Array]' ) {
						vMax = valueMax[index];
					}
					$obj[item] = _this.getRandomize(vMin, vMax, true);
				});
			}
		},
		
		getJsonMerge: function($arr){

			var _this = this;
			var postfix	= _this.defaultObj.postfix;
			
			if( postfix == "" || postfix == null || postfix.length < 0 ){
				return $arr;
			}else{
				postfix.Total = $arr.length;
				postfix.Record = $arr;

				return postfix;
			}
		},

		getRandomize:function($min, $max, $maxValueContainBool){
			
			var ver = "2017.02.22 허정진";

			if( typeof $min == "undefined" || typeof $max == "undefined" ){
				throw new Error("[ "+this.name + "Class ] getRandomize : 매개변수가 없습니다.");
			}

			var min = parseInt($min, 10);
			var max = parseInt($max, 10);

			if( min === max ) return min;
			else{
				$maxValueContainBool = $maxValueContainBool || true;
				return Math.floor(Math.random() * ($max - $min + $maxValueContainBool)) + $min;
			}
		},
		
		disable: function(){},
		enable: function(){},
		destroy: function(){

			//주의!!. dispose는 맨 마지막으로 실행한다. 소거.
			this.dispose();
		},

		dispose: function(){

			var object = this;
			var objectPrototype = object.__proto__;
			
			for( var key in object ){
				if( object.hasOwnProperty(key) ){
					delete object[key];
				}
			}
			delete this.prototype;

			return;

			for( var key in objectPrototype ){
				if( objectPrototype.hasOwnProperty(key) ){
					delete objectPrototype[key];
				}
			}
		}, //end. dispose

		get json(){
			this.getValue();
			return this.resultJson;
		},
		set json($obj){
			for(var key in $obj){
				if( $obj.hasOwnProperty(key) ){
					this.defaultObj[key] = $obj[key];
				}
			}
		}
	};
	
})();