/***********************************************************
*
*	getRotationDegrees
*
*	element의 Degree를 알아낸다 (원주율 x )
*
*

권장하는 사용법

angle1 = getRotationDegrees(  $('#myDiv')  );
angle2 = getRotationDegrees(  $('.mySpan a:last-child')  );

*
*
*
***********************************************************/
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}