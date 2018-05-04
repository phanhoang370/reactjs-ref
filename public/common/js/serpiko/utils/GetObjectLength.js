/***********************************************************
*
*	Object.length
*
*	Object의 key를 기준으로 갯수를 세서 반환한다.
*
*	마치 배열의 length메서드와 똑같은 형태와 기능을 한다.
*

권장하는 사용법

var myobj = {"my":"Dragonball", "age":34, "hobby":"computer"};
console.log(   GetObjectLength(myobj)   ); //3

//*보류
var myobj = {"my":"Dragonball", "age":34, "hobby":"computer"};
console.log(   myobj.length()   ); //3

*
*
*
***********************************************************/
/*
Object.prototype.length = function() {
	var size = 0, key;
	for (key in this) {
		if (this.hasOwnProperty(key)) size++;
	}
	return size;
};
*/
Object.defineProperty(Object.prototype, 'Count',{
	value : (function(){
				var size = 0, key;
				for (key in this) {
					if (this.hasOwnProperty(key)) size++;
				}
				return size;
			})(),
	enumerable : false
});

function GetObjectLength($obj){
	var size = 0, key;
	for (key in $obj) {
		if ($obj.hasOwnProperty(key)) size++;
	}
	return size;
}