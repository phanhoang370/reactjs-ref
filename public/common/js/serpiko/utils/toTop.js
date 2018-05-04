/*****************************************************************************************************
 *
 * toTop 라이브러리 (제이쿼리 코어가 중복되어 호출되면 에러발생 주의)
 * 
 ***************************************************************************************************** 
 */
var defaults = {
	containerID: 'toTop', // fading element id
	containerHoverID: 'toTopHover', // fading element hover id
	scrollSpeed: 1200,
	easingType: 'linear' ,
	min: 10
};

//jQuery().UItoTop({ easingType: 'easeOutQuart' });