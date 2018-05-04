/***********************************************************************************************************************
*
*	Extended using a common script, jQuery and Chaining.
* 
*	Auth : 허정진
* 
*   serpiko.tistory.com
*	
*	2016.03.03
*
***********************************************************************************************************************/





/**********************************************************************************************************************
*
* NewEasyPieChart ( *주의 easyPieChart.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
//
	/* fn = jquery.prototype의 별칭 */
	$.fn.NewEasyPieChart = function(options){ 
		
		/* 기본값 */
		var obj = {
			thick		: 7, // 선 두께
			size		: 60, // 원 크기px
			rotate		: 0,
			barColor	: '#f07c00',
			trackColor	: '#f8e4cc',
			lineCap		: 'round', // round, butt, square
			scaleColor	: false, //'#dfe0e0',
			scaleLength	: 5,
			lineWidth	: 7,
			trackWidth	: 7,
			animate		: 5000,
			easing		: "easeOutElastic", //swing, easeOutBounce, easeOutElastic  easeOutExpo
		};
		
		/* option값이 있을경우 취합한다 */
		$.extend(obj, options);
		
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		/* EasyPieChart */
		div_id.easyPieChart({
			easing:		obj.easing,
			animate:	obj.animate,
			barColor:	obj.barColor,
			trackColor: obj.trackColor,
			scaleColor: obj.scaleColor,
			lineWidth:	obj.thick,
			trackWidth: obj.thick,
			size:		obj.size,
			lineCap:	obj.lineCap,
			onStep: function(from, to, percent) {
				// 여기서의 $(this)는 EasyPieChart이며 el : span#pie_web_cpu.pie-chart
				$(this.el).find('.pie-percent').text( Math.round(percent) );
			}
		});
		
		/* 제이쿼리 체이닝을 위해서 자신객체를 리턴한다 */
		return $(this);
	};
//
})(jQuery);
/**********************************************************************************************************************
*
* EasyPieChartUpdate ( *주의 easyPieChart.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){

	$.fn.EasyPieChartUpdate = function(options){

		var obj = {
			interval	: 0,
			type		: "json",
			method		: "GET",
			asyncBool	: true,
			log			: false,
			xhrClass	: null,
			intervalId	: null
		};

		$.extend(obj, options);
		
		obj.xhrClass = new XhrClass;
		obj.xhrClass.create();
		obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
		
		if( obj.interval > 0 ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.interval);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);









/**********************************************************************************************************************
*
* NewHighGaugeChart ( *주의 hightcharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
	$.fn.NewHighGaugeChart = function(options){

		var obj = {
			data: 0, //기본데이터 value
			min: 0,
			max: 100,
			innerTitle: '퍼센트',
			balloonTitle: '장애: ',
			unit: '%',
			animate: 2000
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');

		div_id.highcharts( /*Highcharts.merge(obj.gaugeOptions,*/ {
			chart: {
				type: 'solidgauge',
				backgroundColor:'transparent',
				animation:{
					duration: obj.animate,
					//easing: "easeOutBounce"
				}
			},

			pane: {
				center: ['50%', '83%'],
				size: '155%', //그래프 원 사이즈
				startAngle: -90,
				endAngle: 90,
				background: {
					backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE', //그래프 트랙색상
					innerRadius: '60%',
					outerRadius: '100%',
					shape: 'arc'
				}
			},

			title: null,
			
			/* 마우스 올리면 말풍선 */
			tooltip: {
				enabled: true
			},

			yAxis: {
				min: obj.min,
				max: obj.max,

				title: {
					text: '' //최상단의 타이블 텍스트
				},
				stops: [
					[0.1, '#55BF3B'], // green
					[0.5, '#DDDF0D'], // yellow
					[0.9, '#DF5353'] // red
				],
				
				/* tick 눈금관련 */
				lineWidth: 0,
				minorTickInterval: null, //'auto' 그래프안에 눈금표시
				tickPixelInterval: 400,
				tickWidth: 0,

				labels: {
					enabled: true,
					//step: 2, //수치 눈금의 category 간격(~~개)
					align: 'left',
					x: 0,
					y: 16,	//하단의 min, max 레이블 16
					//rotation: 'auto'
				},

				title: {
					y: 0	//최상단의 타이블 y좌표
				},

				tickPositioner:  function() {
					return [obj.min, obj.max];
				}
			},

			credits: {
				enabled: false // 마크보이기
			},

			plotOptions: {
				solidgauge: {
					dataLabels: {
						y: 25, //데이터의 y좌표
						borderWidth: 0,
						useHTML: true
					}
				}
			},

			series: [{
				name: obj.balloonTitle, //말풍선 좌측 타이틀
				data: [obj.data],
				dataLabels: {
					format: 
						//상단 수치 부분 텍스트 id = div_idName_number
						'<div style="text-align:center"><span id="'+div_idName+'_number" style="font-size:20px;color:' +
						((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +

						//하단 그래프 텍스트 id = div_idName_desc
						'<span id="'+div_idName+'_innerTitle" style="font-size:12px;color:silver">'+obj.innerTitle+'</span></div>'
				},
				tooltip: {
					valueSuffix: obj.unit //말풍선 우측 단위
				}
			}]
		}/*)*/);

		return this; // highchart객체
	}
})(jQuery);
/**********************************************************************************************************************
*
* HighGaugeChartUpdate ( *주의 hightcharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
	$.fn.HighGaugeChartUpdate = function(options){

		var obj = {
			interval	: 0,
			type		: "json",
			method		: "GET",
			asyncBool	: true,
			log			: false,
			xhrClass	: null,
			intervalId	: null
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		obj.xhrClass = new XhrClass;
		obj.xhrClass.create();
		obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);

		if( obj.interval > 0 ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.interval);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);





/**********************************************************************************************************************
*
* NewAmChartLine : amChart의 시리얼 라인차트 ( *주의 amCharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
function curDate() //현재 시간을 Y-m-d H:i:s 2016-02-11 10:05:30 로 반환한다.
{
	var newDate = new Date();
	var year = newDate.getFullYear();
	var month = newDate.getMonth()+1;
	month = (month < 10 ? "0" : "" ) + month;

	var date = newDate.getDate();
	date = (date < 10 ? "0" : "") + date;

	var seconds = new Date().getSeconds();
	seconds = (seconds < 10 ? "0":"") + seconds;
	
	var minutes = new Date().getMinutes();
	minutes = (minutes < 10 ? "0":"") + minutes;

	var hours = new Date().getHours();
	hours = (hours < 10 ? "0":"") + hours; //24
	
	return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
}
(function($){
	$.fn.NewAmChartLine = function(options){
		
		var obj = {
			categoryField	: 'date',	// <= ajax NAME
			valueField		: 'val',	// <= ajax VALUE
			fillColorsField	: 'fillColor',
			urlField		: 'url',
			valueUnit		: '', //단위를 지정할 경우에 사용
			startEffect		: '>',	// >,<,bounce,elastic
			graphType		: 'smoothedLine',	//line, column, step, smoothedLine
			bullet			: 'none', // "none", "round", "square", "triangleUp", "triangleDown", "bubble", "custom".
			startDuration	: 0,
			pathToImages	: 'js/amcharts/images/',

			autoMargins		: true, //false일경우 아래의 4가지 margin옵션을 수동으로 줄 수 있다
			marginTop		: 20,
			marginBottom	: 20,
			marginLeft		: 20,
			marginRight		: 20,
		}

		$.extend(obj, options)

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		var lineChartDIV = AmCharts.makeChart(div_idName, {
			type: "serial",
			startEffect : obj.startEffect,
			startDuration: isBrowserIE() ? 0 : obj.startDuration, // IE브라우저에서는 애니메이션을 없앤다(느리거나 랜더링하지 못하는 문제발생 2016.02.11)
			pathToImages : obj.pathToImages,

			autoMargins: obj.autoMargins,
			marginTop : obj.marginTop,
			marginRight : obj.marginRight,
			marginLeft : obj.marginLeft,
			marginBottom : obj.marginBottom,

			//depth3D : 10,
			//angle : 30,

			fontSize : 11,
			usePrefixes: true, //단위의 용량을 자동으로 표기한다 : K,M,G,T,P,E,Z,Y
					
			dataProvider: [ {'date':curDate(), 'val':0} ], // <= 기본값
			
			/* valueAxes */
			"valueAxes": [{
				"id": "v1",
				color: "#9c9c9c",
				axisColor : "#9c9c9c",
				gridColor : "#9c9c9c",
				gridAlpha : 0.05,
				minimum : 0,
				"axisAlpha": 0,
				"position": "left",
				//"ignoreAxisWidth":true,
				"unit": obj.valueUnit
			}],
			
			"dataDateFormat": "YYYY-MM-DD HH:NN:SS",
			
			/* graphs */
			"graphs": [{
				"type": obj.graphType,
				topRadius: 0,
				title: 'value',
				balloonText : '[[date]]: <b>[[value]]'+obj.valueUnit+'</b>', 
				//balloonText : '[[category]]: [[value]]<b>kWp</b>',
				"fillColorsField": obj.fillColorsField,
				//fillColors: ['#9ed53c', '#7cbc0a'],
				"fillAlphas": 0.5,
				"lineAlpha": 0.3,
				"valueField": obj.valueField, // <= ajax VALUE
				legendValueText : "[[value]]",
				urlField : obj.urlField,
				urlTarget: "_blank",
				lineColor: "#000",
				lineThickness : 1,
				bullet: obj.bullet, // "none", "round", "square", "triangleUp", "triangleDown", "bubble", "custom".
				bulletAlpha: 0,
				bulletBorderThickness: 1,
				bulletBorderAlpha: 0
			}],
					
			"categoryField": obj.categoryField, // <= ajax NAME
			
			/* categoryAxis */
			"categoryAxis": {
				"gridPosition": "start",
				"labelRotation": 0,
				"dashLength": 1,
				axisColor : '#9c9c9c',
				color : "#9c9c9c",
				gridColor : "#9c9c9c",
				gridAlpha : 0.05,
				autoGridCount : true,
				"equalSpacing": true,
				inside: false,
				labelsEnabled: true,
				labelRotation: 0,
				labelFrequency: 1,

				//날짜 형식을 아래와같이 지정하고 분석하여 사용한다.
				"minPeriod": "ss",
				"usePrefixes": true,
				"dateFormats":[{period:'fff',format:'JJ:NN:SS'},{period:'ss',format:'JJ:NN:SS'},{period:'mm',format:'JJ:NN'},{period:'hh',format:'JJ:NN'},{period:'DD',format:'MM-DD'},{period:'WW',format:'MM -DD'},{period:'MM',format:'MM'},{period:'YYYY',format:'YYYY'}],
				"dateFormat": "YYYY-MM-DD HH:NN:SS",
				"parseDates": true,

				/* 브라우저 해상도가 작아져서 표현하는 div가 작아져도 강제로 카테고리(x축)를 모두 표기할때 사용한다.*/
				//minHorizontalGap: 0,
				//forceShowField : obj.categoryField
			},
			
			/* chartCursor */
			"chartCursor": {
				"categoryBalloonEnabled": true,
				"cursorAlpha": 0,
				"zoomable": false,
				categoryBalloonEnabled : true,
				valueLineEnabled : true,
				valueLineBalloonEnabled : true,
				valueLineAlpha : 0
			},
			
			/* balloon */
			"balloon":{
				cornerRadius: 6,
				adjustBorderColor: true,
				horizontalPadding: 10,
				verticalPadding: 10,
				borderColor: '#FF0000',
				fontSize: 12,
				color: "#000"
			},

			/* export */
			"export": {
				"enabled": false
			 }
		});

		return lineChartDIV;
		//return this;
	}
})(jQuery);


/* NewAmChartStack */
(function($){
	$.fn.NewAmChartStack = function(options){
		
		var obj = {
			title			: '타이틀',
			categoryField_1	: 'name_1',	// <= ajax NAME
			categoryField_2	: 'name_2',	// <= ajax NAME
			value_1			: 'val_1',	// <= ajax VALUE 1
			value_2			: 'val_2',	// <= ajax VALUE 2
			fillColorsField_1	: 'fillColor_1',
			fillColorsField_2	: 'fillColor_2',

			urlField		: 'url',
			fillColors_1	: ['#ffb230','#ffb230'],
			fillColors_2	: ['#ed6c44','#ed6c44'],

			valueUnit		: '%', //단위를 지정할 경우에 사용
			startEffect		: '>',	// >,<,bounce,elastic
			graphType		: 'column',	//line, column, step, smoothedLine
			startDuration	: 0,
			pathToImages	: 'js/amcharts/images/',

			autoMargins		: false,
			marginTop		: 0,
			marginBottom	: 0,
			marginLeft		: 0,
			marginRight		: 0,
		}

		$.extend(obj, options)

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		var stackChartDIV = AmCharts.makeChart(div_idName, {
			type: "serial",
			theme: 'light',
			startEffect : obj.startEffect,
			startDuration: isBrowserIE() ? 0 : obj.startDuration, // IE브라우저에서는 애니메이션을 없앤다(느리거나 랜더링하지 못하는 문제발생 2016.02.11)
			pathToImages : obj.pathToImages,

			autoMargins: obj.autoMargins,
			marginTop : obj.marginTop,
			marginRight : obj.marginRight,
			marginLeft : obj.marginLeft,
			marginBottom : obj.marginBottom,

			depth3D : 20,
			angle : 30,

			fontSize : 11,
			usePrefixes: true, //단위의 용량을 자동으로 표기한다 : K,M,G,T,P,E,Z,Y
					
			dataProvider: [{'name_1':'네임_1', 'name_2':'네임_2', 'val_1':50, 'val_2':50}], // <= 기본값
			
			/* valueAxes */
			"valueAxes": [{
				"id": "v1",
				"unit": obj.valueUnit,
				
				'stackType': 'regular',  // "none", "regular", "100%", "3d"
				"position": "left",
				'axisAlpha': 0,
				'gridAlpha': 0,
				color: "#9c9c9c",
				minimum : 0,
				maximum: 100,
				"ignoreAxisWidth":true,
				labelsEnabled: false,
			}],
			
			/* graphs */
			"graphs": [{
				"type": obj.graphType,
				title:	obj.title,
				'valueField': obj.value_1,
				"fillColorsField": obj.fillColorsField_1,
				'fillColors': obj.fillColors_1,
				urlField : obj.urlField,

				'color': '#FFF',
				fillAlphas: 0.8,
				labelText: '[[value]]'+obj.valueUnit,
				lineAlpha: 0,
				topRadius: 1,
				'balloonText': "<b>[[name_1]]</b><br><span style='font-size:14px'><b>[[value]]"+obj.valueUnit+"</b></span>",
			},
			{
				"type": obj.graphType,
				title:	obj.title,
				'valueField': obj.value_2,
				"fillColorsField": obj.fillColorsField_2,
				'fillColors': obj.fillColors_2,
				urlField : obj.urlField,

				'color': '#FFF',
				fillAlphas: 0.8,
				labelText: '[[value]]'+obj.valueUnit,
				lineAlpha: 0,
				topRadius: 1,
				'balloonText': "<b>[[name_2]]</b><br><span style='font-size:14px'><b>[[value]]"+obj.valueUnit+"</b></span>",
			}],
					
			/* categoryAxis */
			"categoryAxis": {
				autoGridCount : false,
				gridAlpha : 0,
				axisAlpha : 0,
				"gridPosition": "start",
				position: 'left',
				ignoreAxisWidth: true,
				labelsEnabled: false,
			},

			/* export */
			"export": {
				"enabled": false
			 }
		});

		return stackChartDIV;
		//return this;
	}
})(jQuery);

/* NewAmChartPie */
(function($){
	$.fn.NewAmChartPie = function(options){
		
		var obj = {
			titleField		: 'name',	// <= ajax NAME
			valueField		: 'val',	// <= ajax VALUE
			colorField		: 'color',  //	<= ajax COLOR
			urlField		: 'url',   // <= ajax URL
			
			color			: '#adcc42',
			valueUnit		: '%', //단위를 지정할 경우에 사용
			startEffect		: '>',	// >,<,bounce,elastic
			startDuration	: 0,
			pathToImages	: 'js/amcharts/images/',

			autoMargins		: false,
			marginTop		: 0,
			marginBottom	: 0,
			marginLeft		: 0,
			marginRight		: 0,
		}

		$.extend(obj, options)

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		var pieChartDIV = AmCharts.makeChart(div_idName, {

			type: "pie",
			theme: 'light',
			startEffect : obj.startEffect,
			startDuration: isBrowserIE() ? 0 : obj.startDuration, // IE브라우저에서는 애니메이션을 없앤다(느리거나 랜더링하지 못하는 문제발생 2016.02.11)
			pathToImages : obj.pathToImages,

			autoMargins: obj.autoMargins,
			marginTop : obj.marginTop,
			marginRight : obj.marginRight,
			marginLeft : obj.marginLeft,
			marginBottom : obj.marginBottom,
			
			fontSize : 11,
			color: '#FFF',
			
			outlineColor: '#FFF',
			outlineAlpha: 0.6,
			outlineThickness: 1,

			"radius": "42%", //파이 그래프의 절대 크기
			"innerRadius": "0%", // 안의 빈구역 정도
			"labelText": "[[percents]]%", // title, value
			"labelRadius": -20, // 표기되는 레이블과 그래프와의 거리
			balloonText: "<span style='font-size:12px;'>[[title]]: </span>[[percents]]% ([[value]])",

			dataProvider: [{'name':'값없음', 'val':100, 'url': '', 'color': obj.color}], // <= 기본값

			titleField: obj.titleField, // <= ajax NAME
			valueField: obj.valueField,	// <= ajax VALUE
			urlField:	obj.urlField,	// <= ajax URL
			colorField:	obj.colorField,	// <= ajax COLOR

			/* export */
			"export": {
				"enabled": false
			 }
		});

		return pieChartDIV;
		//return this;
	}
})(jQuery);

/**********************************************************************************************************************
*
* AmChartUpdate ( *주의 hightcharts.js 와 반드시 함께 사용 )
*
/**********************************************************************************************************************/
(function($){
	$.fn.AmChartUpdate = function(options){

		var obj = {
			interval	: 0,
			type		: "json",
			method		: "GET",
			asyncBool	: true,
			log			: false,
			xhrClass	: null,
			intervalId	: null
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		obj.xhrClass = new XhrClass;
		obj.xhrClass.create();
		obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);

		if( obj.interval > 0 ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.interval);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);





/************************************************************************************
*
* 스파크라인 객체 생성 (리사이즈 할때 그래프 렌더링을 다시하도록 처리함)
*
************************************************************************************/
(function($){
	$.fn.NewSparkLine = function(options){
		
		var obj = {
			pointData : [0,0,0,0,0,0,0,0,0,0],
			lineColor: 'rgba(128,255,255, 0.6)',
			fillColor: 'rgba(0,0,0, 0.08)',
			thick:	1.5,
			title: '타이틀',
			unit:	'k'
		}
			
		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		$.extend(obj, options)
		
		var sparklineLogin = function(){
			div_id.sparkline( obj.pointData, {
				type: 'line',
				width: '100%',
				height: '100%',
				normalRangeMin: 10,

				lineColor: obj.lineColor,
				fillColor: obj.fillColor,
				lineWidth: obj.thick,
				tooltipPrefix: obj.title + ' :',
				tooltipSuffix: ' '+obj.unit,
			});
		}

		var sparkResize = null;
		$(window).resize(function(e) {
			if( sparkResize != null ) clearTimeout(sparkResize);
			sparkResize = setTimeout(sparklineLogin, 500);
		});
		sparklineLogin();

		return this;
	}
})(jQuery);

(function($){
	$.fn.SparkLineUpdate = function(options){

		var obj = {
			interval	: 0,
			type		: "json",
			method		: "GET",
			asyncBool	: true,
			log			: false,
			xhrClass	: null,
			intervalId	: null
		};

		$.extend(obj, options);

		var div_id = $(this);
		var div_idName = div_id.prop('id') || div_id.attr('id');
		
		obj.xhrClass = new XhrClass;
		obj.xhrClass.create();
		obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);

		if( obj.interval > 0 ){
			obj.intervalId = setInterval(function(){
				obj.xhrClass.sendRequest(obj.url, obj.param, obj.complete, obj.type, obj.method, obj.asyncBool, obj.log);
			}, obj.interval);
		}

		return obj; //obj를 제공하여 xhrClass와 intervalId에 접근할 수 있도록 한다.
	}
})(jQuery);











/*****************************************************************************************************
 *
 * 브라우저 타입 검사
 * 
 ****************************************************************************************************/ 
function getBrowserType(){
          
	var _ua = navigator.userAgent;
	var rv = -1;
	 
	//IE 11,10,9,8
	var trident = _ua.match(/Trident\/(\d.\d)/i);
	if( trident != null )
	{
		if( trident[1] == "7.0" ) return rv = "IE" + 11;
		if( trident[1] == "6.0" ) return rv = "IE" + 10;
		if( trident[1] == "5.0" ) return rv = "IE" + 9;
		if( trident[1] == "4.0" ) return rv = "IE" + 8;
	}
	 
	//IE 7...
	if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
	 
	/*
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
	if( rv == 7 ) return rv = "IE" + 7; 
	*/
	 
	//other
	var agt = _ua.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

/*****************************************************************************************************
 *
 * IE 예외처리를 위한 true/false
 * 
 ****************************************************************************************************/ 
function isBrowserIE(){
	var IE = false;
	var patt = /ie/gi;
	if( patt.test( getBrowserType() ) ) IE = true;
	return IE;
}

/*****************************************************************************************************
 *
 * 모바일 검사
 * 
 ****************************************************************************************************/ 
// 2016.01.19 허정진추가
function isMobile(){
	var filter = "win16|win32|win64|mac";
	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
			//alert('mobile');
			return true; //Mobile
		}else{
			//alert('pc');
			return false; //PC
		}
	}
}



/* getRandomize */
function getRandomize($min, $max, $maxContainBool){
	$maxContainBool = $maxContainBool || true; //max값 포함여부
	return Math.floor(Math.random() * ($max - $min + $maxContainBool)) + $min;
}












/*****************************************************************************************************
 *
 * 팝업 오픈 (센터)
 * 
 ****************************************************************************************************/ 
function NOTUSE_openPop($url)
{
	//var url = "./KCP/web/order.php";
	var url = $url;
	var title = 'pop';

	var cw = screen.availWidth;
	var ch = screen.availHeight;
	var sw = 600;
	var sh = 470;
	var ml=(cw-sw)/2;
	var mt=(ch-sh)/2;

	var status = "width="+sw+", height="+sh+", top="+mt+", left="+ml+", menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=yes,resizable=no";
	window.open(url, title, status);
}


// 2015.11.17 손대호 추가
function NOTUSE_openPop_v2($url, sw, sh)
{
	//var url = "./KCP/web/order.php";
	var url = $url;
	var title = 'pop';

	var cw = screen.availWidth;
	var ch = screen.availHeight;

	if(cw < sw)
		sw = 0;

	if(ch < sh)
		sh = 0;

	var ml=(cw-sw)/2;
	var mt=(ch-sh)/2;

	var status = "width="+sw+", height="+sh+", top="+mt+", left="+ml+", menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=yes,resizable=no";
	window.open(url, title, status);
}

function NOTUSE_openCenterPop($url){
	var cw = screen.availWidth;
	var ch = screen.availHeight;

	var sw = 1200;
	var sh = 900;

	var ml = (cw-sw)/2;
	var mt = (ch-sh)/2;
	window.open($url, "_blank", "toolbar=yes, scrollbars=auto, resizable=no, top="+mt+", left="+ml+", width="+sw+", height="+sh);
}





/********************************************************************************************************
*
* rollingTrigger( 부모타겟, 오버스탑타겟, 주기 ) rollingTrigger('#nav-dots', '#slider', 7000);
*
********************************************************************************************************/
function rollingTrigger($parentTarget, $stopTarget, $interval){
	
	$stopTarget = (typeof $stopTarget == 'undefined') ? null : $stopTarget; 
	$interval = (typeof $interval == 'undefined') ? 5000 : $interval;

	var nI = 0;
	var intervalID = null;
	var children_len = $($parentTarget).children().length;
	
	function loop(){
		intervalID = setInterval(function(){
			nI++;

			if( nI == children_len ) nI = 0;

			$($parentTarget).children().eq( nI ).trigger('click');
		}, $interval);
	}
	
	loop();
	
	if( $stopTarget !== null ) {
		$($stopTarget).mouseover(function(){
			if( intervalID !== null ) {
				clearInterval( intervalID );
				intervalID = null;
			}
		}).mouseout(function(){
			loop();
		});
	}
}














/*************************
* 맵 (암맵) 객체 생성, 맵 이벤트 리스너 안에 핸들러를 호출하는 명령어가 포함되어있다.
**************************/
function NewAmMap($chartdiv, $obj){

	var mapColor = '#a6dfd9';
	var n_alpha = 0.4;
	
	var map = AmCharts.makeChart($chartdiv, {
		type : "map",
		dragMap: true,
		theme : "default", //light, black, chalk, default, patterns
		pathToImages : "js/ammap/images/",
		imagesSettings: {
			rollOverColor: "#e50aff",
			rollOverScale: 1, //오버하면 커지는 스케일정도(글자에도 영향을 준다) : 3
			selectedScale: 3,
			selectedColor: "#e50aff",
			color: "#13564e"
		},
		dataProvider : {
		  mapURL : "svg/gyeong_gido.svg",
		  images: $obj.images,
		  //<?=$map_img?>,
		  getAreasFromMap : true, //맵조각을 클릭할수있게한다
			  /*
			 areas:[
				{id : "4139",color:mapColor,alpha:n_alpha},
				{id : "4119",color:mapColor,alpha:n_alpha},
				{id : "4121",color:mapColor,alpha:n_alpha},
				{id : "4129",color:mapColor,alpha:n_alpha},
				{id : "4131",color:mapColor,alpha:n_alpha},
				{id : "4145",color:mapColor,alpha:n_alpha},
				{id : "4113",color:mapColor,alpha:n_alpha},
				{id : "4117",color:mapColor,alpha:n_alpha},
				{id : "4143",color:mapColor,alpha:n_alpha},
				{id : "4111",color:mapColor,alpha:n_alpha},
				{id : "4146",color:mapColor,alpha:n_alpha},
				{id : "4161",color:mapColor,alpha:n_alpha},
				{id : "4115",color:mapColor,alpha:n_alpha},
				{id : "4136",color:mapColor,alpha:n_alpha},
				{id : "4125",color:mapColor,alpha:n_alpha},
				{id : "4165",color:mapColor,alpha:n_alpha},
				{id : "4182",color:mapColor,alpha:n_alpha},
				{id : "4183",color:mapColor,alpha:n_alpha},
				{id : "4167",color:mapColor,alpha:n_alpha},
				{id : "4150",color:mapColor,alpha:n_alpha},
				{id : "4155",color:mapColor,alpha:n_alpha},
				{id : "4122",color:mapColor,alpha:n_alpha},
				{id : "4159",color:mapColor,alpha:n_alpha},
				{id : "4127",color:mapColor,alpha:n_alpha},
				{id : "4128",color:mapColor,alpha:n_alpha},
				{id : "4157",color:mapColor,alpha:n_alpha},
				{id : "4148",color:mapColor,alpha:n_alpha},
				{id : "4180",color:mapColor,alpha:n_alpha},
				{id : "4163",color:mapColor,alpha:n_alpha},
				{id : "4137",color:mapColor,alpha:n_alpha},
				{id : "4141",color:mapColor,alpha:n_alpha}
			]
			*/
			areas:[
				{id : "4139",color:arrColor[0],alpha:n_alpha},
				{id : "4119",color:arrColor[1],alpha:n_alpha},
				{id : "4121",color:arrColor[2],alpha:n_alpha},
				{id : "4129",color:arrColor[3],alpha:n_alpha},
				{id : "4131",color:arrColor[4],alpha:n_alpha},
				{id : "4145",color:arrColor[5],alpha:n_alpha},
				{id : "4113",color:arrColor[6],alpha:n_alpha},
				{id : "4117",color:arrColor[7],alpha:n_alpha},
				{id : "4143",color:arrColor[8],alpha:n_alpha},
				{id : "4111",color:arrColor[9],alpha:n_alpha},
				{id : "4146",color:arrColor[10],alpha:n_alpha},
				{id : "4161",color:arrColor[11],alpha:n_alpha},
				{id : "4115",color:arrColor[12],alpha:n_alpha},
				{id : "4136",color:arrColor[13],alpha:n_alpha},
				{id : "4125",color:arrColor[14],alpha:n_alpha},
				{id : "4165",color:arrColor[15],alpha:n_alpha},
				{id : "4182",color:arrColor[16],alpha:n_alpha},
				{id : "4183",color:arrColor[17],alpha:n_alpha},
				{id : "4167",color:arrColor[18],alpha:n_alpha},
				{id : "4150",color:arrColor[19],alpha:n_alpha},
				{id : "4155",color:arrColor[20],alpha:n_alpha},
				{id : "4122",color:arrColor[21],alpha:n_alpha},
				{id : "4159",color:arrColor[22],alpha:n_alpha},
				{id : "4127",color:arrColor[23],alpha:n_alpha},
				{id : "4128",color:arrColor[24],alpha:n_alpha},
				{id : "4157",color:arrColor[25],alpha:n_alpha},
				{id : "4148",color:arrColor[26],alpha:n_alpha},
				{id : "4180",color:arrColor[27],alpha:n_alpha},
				{id : "4163",color:arrColor[28],alpha:n_alpha},
				{id : "4137",color:arrColor[29],alpha:n_alpha},
				{id : "4141",color:arrColor[30],alpha:n_alpha}
			]
		},
		areasSettings : {
			autoZoom : true,

			/* 선택된 면 색상 */
			selectedColor : "#2bb87a",

			/* 오버 선 색상 */
			rollOverOutlineColor: "#2bb87a",
			
			/* 선 색상(기본) */
			outlineColor: "#FFF",

			/*면 색상(기본)*/
			color: "#000000",
			
			outlineAlpha: 1,
			outlineThickness: 1.5,
		},

		zoomControl: {
			panControlEnabled: false, //4방향 키
			zoomControlEnabled: true,
			homeButtonEnabled:true
		},
		export : {
			enabled : false,
			position : 'top-right'
		}
	});

	// add events to recalculate map position when the map is moved or zoomed
	map.addListener("positionChanged", updateCustomMarkers);

	// this function will take current images on the map and create HTML elements for them
	function updateCustomMarkers (event) {
		// get map object
		var map = event.chart;
		
		// go through all of the images
		for( var x in map.dataProvider.images) {
			// get MapImage object
			var image = map.dataProvider.images[x];
			
			// check if it has corresponding HTML element
			if ('undefined' == typeof image.externalElement)
				image.externalElement = createCustomMarker(image);

			// reposition the element accoridng to coordinates
			image.externalElement.style.top = map.latitudeToY(image.latitude) + 'px';
			image.externalElement.style.left = map.longitudeToX(image.longitude) + 'px';
		}
	}

	// this function creates and returns a new marker element
	function createCustomMarker(image) {
		// create holder
		var holder = document.createElement('div');

		if (image.Type == 'Group') {
			holder.className = 'grp-marker';
		} else {
			holder.className = 'item-marker';
		}
		holder.title = image.title;
		holder.id = image.id;
		holder.style.position = 'absolute';
		
		// maybe add a link to it?
		if (undefined != image.url) {
			holder.onclick = function() {
				window.location.href = image.url;
			};
			holder.className += ' map-clickable';
		}
		
		// create dot : 애니메이션
		var dot = document.createElement('div');
		if (image.Type == 'Group'){
			if (image.Status > 0) dot.className = 'dot';
		}
		//else dot.className = 'dot-item';
		holder.appendChild(dot);
		
		// create pulse : 원
		var pulse = document.createElement('div');
		if (image.Type == 'Group') {
			pulse.className = 'pulse';
			if (image.Status > 1) pulse.className = 'pulse warn'; //경고
			else if (image.Status == 1) pulse.className = 'pulse normal'; //정상
			else pulse.className = 'pulse gray'; //알수없음
		} else pulse.className = 'pulse-item transition';
		holder.appendChild(pulse);

		// create label for value : kW
		var lbl = document.createElement('div');
		if (image.Type == 'Group') {
			lbl.className = 'lbl';
			lbl.id = 'lbl_'+image.id;
			lbl.style.position = 'relative';
			lbl.style.width = '60px';
			lbl.style.top = '-20px';
			lbl.style.left = '-20px';
			lbl.style.textAlign = 'center';
			lbl.innerHTML = image.display_value;
		} else pulse.className = 'pulse-item';
		holder.appendChild(lbl);
		
		// append the marker to the map container
		image.chart.chartDiv.appendChild(holder);
		
		return holder;
	}

	//맵 조각 버튼
	map.addListener("clickMapObject", function(event) {
		var areaID = event.mapObject.id;
		if( areaID != null || typeof areaID  != 'undefined' ) {
			
			var main = $(".grp-marker"); //그룹군
			var sub = $('.item-marker'); //발전소군
			sub.css('display', 'block');

			_AreaName = event.mapObject.title;
			_RequestHandler(areaID); //오로지 cityCode
		}
	});

	//홈 버튼
	map.addListener("homeButtonClicked", function(event) {
		var main = $(".grp-marker"); //그룹군
		var sub = $('.item-marker'); //발전소군
		sub.css('display', 'none');
		
		_AreaName = _DefaultCityName;
		_RequestHandler(_DefaultCityCode);
	});
}


/*************************
* 맵 스테이터스 반영(파라메터를 받아서 맵 스테이터스를 반영)
**************************/
function SetAmMapStatus($cityCode, $ppid, $status, $label)
{
	//console.log("$cityCode["+$cityCode+"]", "$ppid["+$ppid+"]", "$status["+$status+"]", "$label["+$label+"]");

	//발전소( $ppid )코드가 없으면 cityCode(시)를 실행
	if( $ppid == "" )
	{
		var div_id = $("#gid_" + $cityCode);
		var dot_ani = div_id.children().eq(0);
		var pulse = div_id.children().eq(1);
		var lbl = div_id.children().eq(2);
		
			//init ( class and label )
		var div_id_ChildLen = div_id.children().length;
		for( var i=0; i<div_id_ChildLen; ++i)
		{
			div_id.children().eq( i ).removeClass();
		}
		lbl.text('');
		
			//circle update
		if( $status > 1 ){ //경고
			dot_ani.addClass('dot'); // <= warn has a dot ani
			pulse.addClass('pulse warn');
		}else if ( $status == 1 ){ //정상
			dot_ani.addClass('dot'); // <= warn has a dot ani
			pulse.addClass('pulse normal');
		}else{ //알수없음
			pulse.addClass('pulse gray');
		}
		
			//용량표기 업데이터
		lbl.text( $label );
	}
	//발전소( $ppid )코드가 있으면 실행
	else
	{
		var div_ppid = $("#PPID_" + $ppid);

		var lbl = div_ppid.children().eq(0);
		var pulse = div_ppid.children().eq(1);

			//img update
		if( $status > 1 ){ //경고
			pulse.css('background-image', 'url(template/images/icon_solar_2.png)');
		}else if ( $status == 1 ){ //정상
			pulse.css('background-image', 'url(template/images/icon_solar_1.png)');
		}else{ //알수없음
			pulse.css('background-image', 'url(template/images/icon_solar_0.png)');
		}

		lbl.text( $label );
	}
	
}//end. SetAmMapStatus



	







(function ($) {
    $.mathUtils = { //하나의 객체로 캡슐화
        sum: function(array) {
            var total = 0;
            $.each(array, function(index, value) {
                value = $.trim(value);
                value = parseFloat(value) || 0;
 
                total += value;
            });
            return tatal;
        },
        average: function(array) {
            if($.isArray(array)) {
                return $.sum(array) / array.length;
            }
            return '';
        }
	};
})(jQuery);
//사용
//$.mathUtils.sum(sum);
//$.mathUtils.average(average);



(function($) {
	$.fn.swapClass = function(class1, class2) {
		return this.each(function() {
			var $element = $(this);
			if ($element.hasClass(class1)) {
				$element.removeClass(class1).addClass(class2);
			}
			else if ($element.hasClass(class2)) {
				$element.removeClass(class2).addClass(class1);
			}
		});
	};
})(jQuery);
//$('div').swapClass('one', 'two');



function itostr($num){
	var num = $num < 10 ? '0'+$num : $num;
	return num;
}


function animateCSS(element, animation){
	element = $(element);
	element.addClass('animated ' + animation);        
	//wait for animation to finish before removing classes
	window.setTimeout( function(){
		element.removeClass('animated ' + animation);
	}, 1000);         
}