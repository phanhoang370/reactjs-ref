/***********************************************************
*
*	오픈 팝업 센터
*
*	openPopCenter, openPopCenter2, openPopCenter3
*

권장하는 사용법

openPopCenter("/pop.html", 1200, 800);
openPopCenter2("/pop.html");
openPopCenter3("/pop.html");

*
*
*
***********************************************************/
function openPopCenter($url, sw, sh)
{
	//var url = "./KCP/web/order.php";
	var url = $url;
	var title = 'openPopCenter';

	var cw = screen.availWidth;
	var ch = screen.availHeight;

	if(cw < sw)sw = 0;
	if(ch < sh)sh = 0;

	var ml=(cw-sw)/2;
	var mt=(ch-sh)/2;

	var status = "width="+sw+", height="+sh+", top="+mt+", left="+ml+", menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=yes,resizable=no";
	window.open(url, title, status);
}

function openPopCenter2($url)
{
	//var url = "./KCP/web/order.php";
	var url = $url;
	var title = 'openPopCenter2';

	var cw = screen.availWidth;
	var ch = screen.availHeight;

	var sw = 600;
	var sh = 470;

	var ml=(cw-sw)/2;
	var mt=(ch-sh)/2;

	var status = "width="+sw+", height="+sh+", top="+mt+", left="+ml+", menubar=no,toolbar=no,location=no,status=no,fullscreen=no,scrollbars=yes,resizable=no";
	window.open(url, title, status);
}

function openPopCenter3($url){
	var title = 'openPopCenter3';
	var cw = screen.availWidth;
	var ch = screen.availHeight;

	var sw = 1200;
	var sh = 900;

	var ml = (cw-sw)/2;
	var mt = (ch-sh)/2;
	window.open($url, title, "_blank", "toolbar=yes, scrollbars=auto, resizable=no, top="+mt+", left="+ml+", width="+sw+", height="+sh);
}