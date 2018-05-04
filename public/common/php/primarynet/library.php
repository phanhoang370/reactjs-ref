<?
	/*******************************************************************************
 	 * 서비스용 PHP 표준 라이브러리 
	 *
	 * 2016.10.20
	 *
	 *******************************************************************************/	

	function lib_dbconn() {

		global $Config;

		$connect = mysql_connect($Config['DBIP'].":".$Config["DBPort"],$Config['DBUser'],$Config['DBPass'], true) or Error("Local DB 접속시 에러가 발생했습니다");
		mysql_select_db($Config['DBName'], $connect) or Error("DB Select 에러가 발생했습니다","");
		mysql_query("set character_set_results=utf8", $connect);
		mysql_query("set names utf8", $connect);
		return $connect;

	}

	function lib_queryValidate($resource=null, $returnType='value'){
		
		$resArr = array();

		$ErrCode = 100;
		$ErrMsg = "전달된 리소스가 없습니다: ".$resource;

		if (!$resource) 
		{
			$ErrCode = 101;
			$ErrMsg = substr(mysql_error($resource), 0, strlen("You have an error in your SQL syntax"));
		} 
		else 
		{
			if(mysql_affected_rows($resource) == 0)
			{
				$ErrCode = 102; // 성공
				$ErrMsg = "삭제된 개수는 0개 입니다";				
			}
			else {
				$ErrCode = 0; // 성공
				$ErrMsg = "성공";				
			}
		}
		
		if( $returnType == "value" ){
			$resArr['ErrCode'] = $ErrCode;
			$resArr['ErrMsg'] = $ErrMsg;
			return implode( " : ", $resArr );
		} else {
			echo( "<br />".$ErrCode." : ".$ErrMsg."<br />" );
		}
	}
	
	function GetVariable($VarName, $VarType="str")
	{
		if( $_POST[$VarName] || $_POST[$VarName] != "" || $_POST[$VarName] != null ) $TempName = $_POST[$VarName];
		else if( $_GET[$VarName] || $_GET[$VarName] != "" || $_GET[$VarName] != null ) $TempName= $_GET[$VarName];

		$TempVariable = lib_paramValidation($TempName, $VarType);
		return $TempVariable;
	}

	function lib_close($conn)
	{
		if($conn) @mysql_close($conn);
	}
	
	function countRec($fname,$tname,$CONN) {

		$sql = "SELECT count($fname) FROM $tname ";
		$res = DB_QUERY($sql,$CONN);

		while ($row = mysql_fetch_array($res)) {
			return $row[0];
		}
	}

	function fnGetValue($CONN, $Type, $g_id, $PPID, $DSID, $DSBDID, $Status)
	{

		global $debug,$Status;

		if ($DSBDID > 0 && $DSID>0) {
			$where = "where DSID='{$DSID}' and DISTBDID='{$DSBDID}'";
		} else 
		if ($DSID>0) {
			$where = "where DSID='{$DSID}'";
		} else 
		if ($PPID>0) {
			$where = "where DSID in (select DSID from INFO_DS125 where PPID='{$PPID}')";
		} else 
		if ($g_id != "") {
			$where = "where DSID in (select DSID from INFO_DS125 where PPID in (select PPID from INFO_POWER_PLANT where GRIDCODE='{$g_id}'))";
		} else {
			$where = "where 1";	
		}

		$sql = "select max(SEVERITY) as stat from DATA_MEASURE_CURR {$where} and MDATETIME>date_add(now(),interval -1 hour)";
		$res = mysql_query($sql,$CONN);

		$data = mysql_fetch_assoc($res);

		if ($data) $Status = intval($data["stat"]);
		else $Status = 0;

		if ($Type == "Watt") {
			$where .= " and DSITEMID=16";
		}

		$sql = "select sum(DSITEMVAL) as val from DATA_MEASURE_CURR {$where} and MDATETIME>date_add(now(), interval -1 hour)";
		$res = mysql_query($sql,$CONN);

		$data = mysql_fetch_assoc($res);

		if ($data) {			
			return $data["val"];
		} else {
			return 0;
		}

	}

	function make_random($len="6") {

		$str_len = $len; 

		$temp_cho = explode(' ','0 1 2 3 4 5 6 7 8 9'); 
		$temp_data = array(); 

		shuffle($temp_cho); 
		$code = implode('',array_slice($temp_cho,0,$str_len)); 
		if ( isset($temp_cho[$code]) ) continue; 
		$temp_data[$code] = true; 

		$temp_keys = array_keys($temp_data); 
		unset($temp_data); 

		return $temp_keys[0];

	}

	function SEND_SMS($recv_id, $callback, $message, $seq="") {

		global $Config, $_SERVER, $CONN;

		$sms_server = $Config["SocketHost"];
		$sms_port = $Config["SocketPort"];

		$site_id = $Config["SMS_ID"]; 
		$site_pw = $Config["SMS_Pwd"]; 
		$site_own = $Config["SMS_Own"]; 

		$socket = fsockopen($sms_server,$sms_port,$errno,$errstr,10); 

		if(!$socket){

			return 0; 

		} else{ 
			
			$szReceiverPhone = $to_num; 
			$szReceiverPhone = ereg_replace("[^0-9]", "", $szReceiverPhone);
			$szCallback = $from_num; 
			$szCallback = ereg_replace("[^0-9]", "", $szCallback);
			$szMessage = str_replace("\n","{{CHR(13)}}", $message); 
			
			$LicenseID = $site_id;
			$LicenseKey = $site_pw;
			$sitekey = $userid;

			if($kyeoljae=='F'){
				$kyeoljae_PAY_TYPE="1";
			} else {
				$kyeoljae_PAY_TYPE="2";
			}
			
			$packet = sprintf("SEND_SMS\t$LicenseID\t$LicenseKey\t$szReceiverPhone\t$szCallback\t$type\t$restime\t$szMessage\t$sitekey\t$kyeoljae_PAY_TYPE\t \t \t \r\n");

			$result =  fputs($socket,$packet);
			$return = fgets($socket,1024);

			if ($debug) @writelog(": [SMS] -> {$packet}");
			
			if (strncasecmp($return,"OK",2)==0){
				$ret = 1;
			} else {
				$ret = 0;
			}
			fclose($socket);
			return $ret;
		}

	}

	function DB_QUERY($sql, $connect) {

		global $Config, $debug, $debig_level;

		if ($debug && $debug_level == _LOG_DEBUG) @writelog(": [DB_QUERY() : SQL] -> [".$sql."]");

		$res = @mysql_query($sql, $connect);

		if ($res) {
			if ($debug && $debug_level == _LOG_DEBUG) {
				$rows = mysql_affected_rows();
				@writelog(": [DB_QUERY() : RES] -> [".$rows."] affected");
			}
		} else {
			if ($debug) @writelog(": [DB_QUERY() : RES] -> [".mysql_error()."]");
			$rows = -1;
		}

		return $res;
	}

	function get_time() {
		list($usec, $sec) = explode(" ", microtime());
		return ((float)$usec + (float)$sec);
	}

	function fnGetitemName($CONN, $sql)
	{
		global $Config;

		$data = mysql_fetch_assoc(DB_QUERY($sql, $CONN));

		return $data;

	}

	function fnLogWrite($CONN, $Category, $Object, $Content)
	{
		global $Config, $_SESSION, $_SERVER;
		
		$IP = $_SERVER["REMOTE_ADDR"];
		$UserID = $_SESSION["USER_ID"];
		$GID = $_SESSION["G_ID"];
		$l_from = "웹";

		$sql = "insert into data_log (l_date,g_id,l_userid,l_object,l_category,l_content,l_ip,l_from) values (now(), '{$GID}', '{$UserID}', '{$Object}', '{$Category}', '{$Content}', '{$IP}', '{$l_from}')";

		DB_QUERY($sql, $CONN);

	}

	function show_hp($hp_no){
       $raw = str_replace("-","",$hp_no);
       return preg_replace("/(0(?:2|[0-9]{2}))([0-9]+)([0-9]{4}$)/", "\\1-****-\\3", $raw); 
    }

	function head($title, $body="",$scriptfile="") {
		global $site, $dir;
		echo("
		<html> 
		<head>
			<title>$title</title>
			<meta http-equiv=Content-Type content='text/html; charset=utf-8'>
			<meta name='description' content=''>
			<meta name='keywords' content=''>
			<link rel=StyleSheet HREF='/".$dir.$site[style]."' type=text/css title=style>
			<link rel=StyleSheet HREF='/".$dir.$site[theme]."/scripts/glDatePicker.default.css' type=text/css title=style>
		</head>
		<body topmargin='0'  leftmargin='0' marginwidth='0' marginheight='0' $body>
		");
	}

	function save_head($title, $body="",$scriptfile="") {

		global $site, $dir;

		echo("
		<html> 
		<head>
			<meta http-equiv=Content-Type content='application/vnd.ms-excel; charset=utf8'>
			<link rel=StyleSheet HREF='http://".$_SERVER[HTTP_HOST]."/".$dir.$site[style]."' type=text/css title=style>
		</head>
		<body topmargin='0'  leftmargin='0' marginwidth='0' marginheight='0' $body>
		");
	}

	function fnGetReportValue($CONN, $Seq, $StrDisiplayDay)
	{
		global $Config, $TableName;

		$total = 0;
		
		$sql = "select DSID,DISTBDID from INFO_DS125_DISTBD where DISTBDMODEL='{$Seq}' order by DSID,DISTBDID";
		$res = DB_QUERY($sql, $CONN);

		while ($row = mysql_fetch_assoc($res)) {

			$DSID = $row["DSID"];
			$DISTBDID = $row["DISTBDID"];
			$sql = "select SUM(DSITEMVAL) as val from $TableName where DSID='{$DSID}' and DISTBDID='{$DISTBDID}' and DSITEMID=3 and MDATETIME='{$StrDisiplayDay}'";
			$data = mysql_fetch_assoc(DB_QUERY($sql,$CONN));
			//@writelog(": [sql] -> [{$sql}]");
			if ($data) $value = $data["val"];
			else $value = 0;

			$total += $value;

		}
		
		return $total;
	}

	function RemoveXSS($val) { 
	   // remove all non-printable characters. CR(0a) and LF(0b) and TAB(9) are allowed 
	   // this prevents some character re-spacing such as <java\0script> 
	   // note that you have to handle splits with \n, \r, and \t later since they *are* 
	   // allowed in some inputs 
	   $pev_val = $val;
	   $val = preg_replace('/([\x00-\x08][\x0b-\x0c][\x0e-\x20])/', '', $val); 
		
	   // straight replacements, the user should never need these since they're normal characters 
	   // this prevents like <IMG SRC=&#X40&#X61&#X76&#X61&#X73&#X63&#X72&#X69&#X70&#X74&
	   // #X3A&#X61&#X6C&#X65&#X72&#X74&#X28&#X27&#X58&#X53&#X53&#X27&#X29> 
	   $search = 'abcdefghijklmnopqrstuvwxyz'; 
	   $search .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
	   $search .= '1234567890!@#$%^&*()'; 
	   $search .= '~`";:?+/={}[]-_|\'\\'; 
	   for ($i = 0; $i < strlen($search); $i++) { 
	   // ;? matches the ;, which is optional 
	   // 0{0,7} matches any padded zeros, which are optional and go up to 8 chars 
		
	   // &#x0040 @ search for the hex values 
		  $val = preg_replace('/(&#[x|X]0{0,8}'.dechex(ord($search[$i])).';?)/i', $search[$i], $val); 
		  // with a ; 

		  // @ @ 0{0,7} matches '0' zero to seven times 
		  $val = preg_replace('/(&#0{0,8}'.ord($search[$i]).';?)/', $search[$i], $val); // with a ; 

	   } 
		
	   // now the only remaining whitespace attacks are \t, \n, and \r 
	   $ra1 = Array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 
	'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base'); 
	   $ra2 = Array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload'); 
	   $ra = array_merge($ra1, $ra2); 
		
	   $found = true; // keep replacing as long as the previous round replaced something 
	   while ($found == true) { 
		  $val_before = $val; 
		  for ($i = 0; $i < sizeof($ra); $i++) { 
			 $pattern = '/'; 
			 for ($j = 0; $j < strlen($ra[$i]); $j++) { 
				if ($j > 0) { 
				   $pattern .= '('; 
				   $pattern .= '(&#[x|X]0{0,8}([9][a][b]);?)?'; 
				   $pattern .= '|(&#0{0,8}([9][10][13]);?)?'; 
				   $pattern .= ')?'; 
				} 
				$pattern .= $ra[$i][$j]; 
			 } 
			 $pattern .= '/i'; 
			 $replacement = substr($ra[$i], 0, 2).'<x>'.substr($ra[$i], 2); // add in <> to nerf the tag 
			 $val = preg_replace($pattern, $replacement, $val); // filter out the hex tags 
			 if ($val_before == $val) { 
				// no replacements were made, so exit the loop 
				$found = false; 
			 } 
		  } 
	   } 
	   if ($prev_val != $val) return false;
	   else true;
	   //return $val; 
	} 

	function enumDropdown($table_name, $column_name, $select_name, $default, $echo = false)
	{
		global $_SESSION, $Config;

	   $selectDropdown = "<select name=\"$select_name\">";
	   $result = mysql_query("SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '$table_name' AND COLUMN_NAME = '$column_name'") or die (mysql_error());

		$row = mysql_fetch_array($result);
		$enumList = explode(",", str_replace("'", "", substr($row['COLUMN_TYPE'], 5, (strlen($row['COLUMN_TYPE'])-6))));

		foreach($enumList as $value) {
			if ($value == $default) $select = "selected";
			else $select = "";
			$selectDropdown .= "<option value=\"$value\" {$select}>$value</option>";
		}
		$selectDropdown .= "</select>";

		if ($echo) echo $selectDropdown;

		return $selectDropdown;
	}

	function error($message, $url="") {

		global $setup, $connect, $dir, $config_dir;

		if($url=="window.close") {
			$message=str_replace("<br>","\\n",$message);
			$message=str_replace("\"","\\\"",$message);
			?>
			<script>
				alert("<?=$message?>");
				window.close();
			</script>
			<?
		} else if($url=="window.back") {
			$message=str_replace("<br>","\\n",$message);
			$message=str_replace("\"","\\\"",$message);
			?>
			<script>
				alert("<?=$message?>");
				history.go(-1);
			</script>
			<?
		} else {

			echo("
			<table cellpadding=0 cellspacing=0 border=0 width=260 height=155 background='default/img/msg_box.gif' align=center>
			<tr>
			<td valign=top style='padding-top:4px;padding-left:20px;padding-right:20px;'>
				$message<br>
				$url
			</td>
			</tr>
			</table>
			");

		}

		if($connect) @mysql_close($connect);

		exit;
	}

	function fnPrintRadio($type, $data, $param, $default) {
		global $connect;

		$result = "";

		if ($type == "query") {
			$result .= "";
			$res = mysql_query($data);
			while ($row = mysql_fetch_array($res)) {

				if ($default!="" && $row[0]==$default) {
					$result .= "<input class='form-control input-radio' type=radio value='$row[0]' checked>$row[1]</option> <span class='form-control input-label'>$display</span>\n";
				} else {
					$result .= "<input class='form-control input-radio' type=radio value='$row[0]'>$row[1]</option> <span class='form-control input-label'>$display</span>\n";
				}
			}

		} else {
			$arr = explode(",", $data);
			$result .= "";

			foreach($arr as $item) { 

				$tmp = explode("|", $item);
				if ($tmp[1] != "") {
					$val = $tmp[0]; $display = $tmp[1];
				} else {
					$val = $tmp[0]; $display = $tmp[0];
				}

				if ($default!="" && $val==$default) {
					$result .= "
						<label>
							<input class='input-radio' type='radio' name='$param' value='$val' checked>
							<span class='input-label'>$display</span>
						</label>\n";
				} else {
					$result .= "
						<label>
							<input class='input-radio' type='radio' name='$param' value='$val'> 
							<span class='input-label'>$display</span>
						</label>\n";
				}

			}
		}

		return $result;
	}

	function writelog($log)
	{
		global $Config;

		if (!$ofp = fopen($Config["LogFile"], 'a')) {
			printf("Can not Open File !\n");
			fclose($ofp);
		} else {
			//fwrite($ofp,date("YmdHis").": ".iconv("UTF-8","EUC-KR",$log)."\n");
			fwrite($ofp,date("YmdHis").": ".$log."\n");
			fclose($ofp);
		}

	}

	function fnGetGridXY($g_id, $GRIDX, $GRIDY)
	{
		global $CONN, $debug, $GRIDX, $GRIDY;
	
		$trailzero = "";
		for ($nI=0;$nI<10-strlen($g_id);$nI++) $trailzero .= "0";
		
		$search_code = $g_id.$trailzero;

		$data = mysql_fetch_array(DB_QUERY("select GRIDX,GRIDY from INFO_GRID where GRIDCODE='{$search_code}'",$CONN));

		if ($data) {
			$GRIDX = $data["GRIDX"];
			$GRIDY = $data["GRIDY"];
		} else {
			$GRIDX = 0;
			$GRIDY = 0;
		}

	}

	function fnPrintSelect($type, $data, $param, $default) {

		global $connect;

		$result = "";
		if ($type == "message") {

			$result = "<select name='$param' class='TxtInput'><option value=''>$data</option></select>\n";

		} else
		if ($type == "query") {

			$result .= "<select name=$param class=TxtInput><option value=''>선택하세요</option>";
			$res = mysql_query($data);
			while ($row = mysql_fetch_array($res)) {

				if ($default!="" && $row[0]==$default) {
					$result .= "<option value='$row[0]' selected>$row[1]</option>";
				} else {
					$result .= "<option value='$row[0]'>$row[1]</option>";
				}
			}
			$result .= "</select>";

		} else if ($type == "directory") {

			$result .= "<select name=$param class=TxtInput><option value=''>선택하세요</option>";

			$skin_dir = $data;
			$handle = @opendir($skin_dir);

			while ($skin_info = @readdir($handle)) {

				if(!eregi("\.",$skin_info)) {
					if($skin_info==$default) {
						$result .= "<option value='$skin_info' selected>$skin_info</option>";
					} else {
						$result .= "<option value='$skin_info'>$skin_info</option>";
					}
				}
			}
			@closedir($handle);
			$result .= "</select>";

		} else if ($type == "range") {
			$arr = explode(",", $data);
			$result .= "<select name=$param class=TxtInput><option value=''>선택하세요</option>";
			$start = $arr[0];
			$end = $arr[1];

			for($nI = $start; $nI <= $end; $nI++) { 

				$val = $nI; $display = $nI;

				if ($default!="" && $val==$default) {
					$result .= "<option value='$val' selected>$display</option>";
				} else {
					$result .= "<option value='$val'>$display</option>";
				}

			}
			$result .= "</select>";
		} else if ($type == "tag") {

			// TAGID  TAGNAME  TAGOPT  TAGVAL
			$res = mysql_query("select * from INFOTAG where TAGID='$data'");
			$row = mysql_fetch_assoc($res);

			$tagname = $row["TAGNAME"];
			
			$val = explode(",", $row["TAGOPT"]);
			$dis = explode(",", $row["TAGVAL"]);

			$result .= "<select name=$param class=TxtInput><option value=''>$tagname</option>";
	
			for ($nI = 0; $nI < count($val); $nI++) {

				$value = $val[$nI]; $display = $dis[$nI];

				if ($default!="" && $val==$default) {
					$result .= "<option value='$val' selected>$display</option>";
				} else {
					$result .= "<option value='$val'>$display</option>";
				}

			}
			
			$result .= "</select>";

		} else {

			$arr = explode(",", $data);
			$result .= "<select name=$param class=TxtInput><option value=''>선택하세요</option>";
			foreach($arr as $item) { 

				$tmp = explode("|", $item);
				if ($tmp[1] != "") {
					$val = $tmp[0]; $display = $tmp[1];
				} else {
					$val = $tmp[0]; $display = $tmp[0];
				}


				if ($default!="" && $val==$default) {
					$result .= "<option value='$val' selected>$display</option>";
				} else {
					$result .= "<option value='$val'>$display</option>";
				}

			}$result .= "</select>";
		}

		return $result;
	}


	function fnGetDisplay($Type, $parameter1, $parameter2="")
	{
		global $CONN, $debug;

		if ($Type == "PPList") {
			// parameter1 <= USERID , parameter2 <= NONE , result = powerplantlist
			$sql = "select a.PPID,b.PPNAME from INFO_USER_PP a left join INFO_POWER_PLANT b on a.PPID=b.PPID where a.USERID='{$parameter1}' order by b.PPNAME";
			$res = DB_QUERY($sql, $CONN);
			$nCnt = mysql_num_rows($res);
			$data = mysql_fetch_assoc($res);

			//if ($debug) @writelog(": [nCnt] -> [{$nCnt}]");
			//if ($debug) @writelog(": [data] -> [{$data}]");

			if ($data) {
				if ($nCnt > 1) $result = $data["PPNAME"]." 외 ".($nCnt-1)."개소";
				else $result = $data["PPNAME"];
			} else $result = "";

			return $result;
		} else 
		if ($Type == "PPContact") {
			// parameter1 <= PPID , parameter2 <= NONE , result = contactlist
			$sql = "select a.PPID,b.REALNAME,b.USERNAME,b.HPHONE from INFO_USER_PP a left join INFO_USER b on a.PPID='{$parameter1}' and a.USERID=b.USERID where b.PERMLEVEL='0' order by b.REALNAME";
			$res = DB_QUERY($sql, $CONN);
			$nCnt = mysql_num_rows($res);
			$data = mysql_fetch_assoc($res);

			//if ($debug) @writelog(": [nCnt] -> [{$nCnt}]");
			//if ($debug) @writelog(": [data] -> [{$data}]");

			if ($data) {
				if ($nCnt > 1) $result = $data["REALNAME"]." 외 ".($nCnt-1)."명";
				else $result = $data["REALNAME"]." (".$data["HPHONE"].")";
			} else $result = "";

			return $result;
		} else return "";

	}

	function lib_movepage($url) {
		global $connect;
		echo"<meta http-equiv=\"refresh\" content=\"0; url=$url\">";
		if($connect) @mysql_close($connect);
		exit;
	}

	function isUnique($table, $field, $value) {

		global $connect;

		$sql = "select $field from $table where $field='$value'";
		$res = mysql_query($sql);
		$nCnt = mysql_num_rows($res);

		if ($nCnt>0) return false;
		else return true;
	}

	function isUniqueUser($table, $field1, $value1, $field2, $value2) {

		global $connect;

		$sql = "select $field1,$field2 from $table where $field1='$value1' and $field2='$value2'";

		//printf("<script> alert(\"$sql\"); </script>\n");

		$res = mysql_query($sql);
		$nCnt = mysql_num_rows($res);

		if ($nCnt>0) return false;
		else return true;
	}

	function lib_getRealIP()
	{
		if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
		{
		  $ip=$_SERVER['HTTP_CLIENT_IP'];
		}
		elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
		{
		  $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
		}
		else
		{
		  $ip=$_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}

	function ftp_upload($ftp_host, $ftp_user, $ftp_pass, $files, $source_dir, $target_dir) {

		$result = 0; 

		$conn_id = ftp_connect($ftp_host); // FTP connect

		if(!$conn_id) return -1;

		$login_result = ftp_login($conn_id, $ftp_user, $ftp_pass); 

		if(!$login_result) return -2;

		ftp_pasv($conn_id, true);

		$dir = ftp_chdir($conn_id, $target_dir);

		$flist = ftp_nlist($conn_id, ".");

		$files = explode(',',$files);

		foreach($files as $file){ 

			$file = trim($file); 
			$d =  explode('/',$file);

			if(count($d)>1){ 

				$dir_sub = ""; 

				for($i=0;$i<count($d)-1;$i++){ 

					if($dir_sub) { $dir_sub .= "/".$d[$i]; } 
					else { $dir_sub = $d[$i]; } 

					@ftp_mkdir($conn_id, $dir_sub);
				}	
			} 

			$up = ftp_put($conn_id, $file, $source_dir."/".$file, FTP_BINARY); // 파일 전송 

			if($up){ $result++; } 

		} 

		$flist = ftp_nlist($conn_id, ".");

		ftp_close($conn_id); //연결 끊기 

		return $result; 

	} 

	function lib_IPList($start, $end) {

		$result = array();

		$u_start = ip2long($start);
		$u_end = ip2long($end);

		if ($u_start > $u_end) return NULL;

		for ($nI = $u_start; $nI <= $u_end; $nI++) {
			$ip = long2ip($nI);
			array_push($result, $ip);
		}

		return $result;
	}

	function lib_invalidAccess($rang='kor', $failMovePage='index.html')
	{
		if ( $_SESSION["USER_IP"] != lib_getRealIP() ) //로그인세션은 현재IP로 비교. (세션내용의 변조방지)
		{
			if( $rang == 'kor' ) $message = '잘못된 접근입니다. 로그인 해 주세요.';
			else $message = 'Invalid access to the site.';

			echo($message);

			/*
			echo ("
				<script>\n
					alert('{$message}')\n
					window.location.href = '{$failMovePage}';\n
				</script>\n
			");
			*/
			exit();
		}
	}

	function lib_timeStampParse($total_time){
		//1일은 86400초, 1시간은 3600초, 1분은 60초니깐. 

		$days = floor($total_time/86400); 
		$time = $total_time - ($days*86400); 
		$hours = floor($time/3600); 
		$time = $time - ($hours*3600); 
		$min = floor($time/60); 
		$sec = $time - ($min*60); 

		if( $total_time >= 86400 ){
			return $days."days ".$hours."hour ".$min."min ".$sec."sec ";
		}else if( 3600 <= $total_time && $total_time < 86400 ){
			return $hours."hours ".$min."min ".$sec."sec ";
		}else if( 60 <= $total_time && $total_time < 3600 ){
			return $min."min ".$sec."sec ";
		}else if( $total_time < 60 ){
			return $sec."sec ";
		}
	}
	
	function lib_fnByteTobps($byte, $Unit, $len=2){

		$byte = (double)$byte;
		$bps = $byte;

		if( $bps >= 1000 * 1000 * 1000 * 1000 ){
			if ($bps % 1000 * 1000 * 1000 * 1000 == 0) $len = 0;
			$bps = ( $bps / ( 1000 * 1000 * 1000 * 1000 ) );
			$bps = number_format($bps, $len) . ' T'.$Unit;
		}else if( $bps >= 1000 * 1000 * 1000 ){
			if ($bps % 1000 * 1000 * 1000 == 0) $len = 0;
			$bps = ( $bps / ( 1000 * 1000 * 1000 ) );
			$bps = number_format($bps, $len) . ' G'.$Unit;
		}else if( $bps >= 1000 * 1000 ){
			if ($bps % 1000 * 1000 == 0) $len = 0;
			$bps = ( $bps / ( 1000 * 1000 ) );
			$bps = number_format($bps, $len) . ' M'.$Unit;
		}else if( $bps >= 1000 ){
			if ($bps % 1000 == 0) $len = 0;
			$bps = ( $bps / 1000 );
			$bps = number_format($bps, $len) . ' K'.$Unit;
		}else if( $bps < 1000 ){
			$bps = number_format($bps, $len) . ' '.$Unit;
		}

		return $bps;
	}
	
	function lib_fnByteTo($byte, $Unit, $len=2){

		$byte = (double)$byte;

		if( $byte >= 1024 * 1024 * 1024 * 1024 ){
			$byte = ( $byte / ( 1024 * 1024 * 1024 * 1024 ) );
			$byte = number_format($byte, $len) . 'T';
		}else if( $byte >= 1024 * 1024 * 1024 ){
			$byte = ( $byte / ( 1024 * 1024 * 1024 ) );
			$byte = number_format($byte, $len) . 'G';
		}else if( $byte >= 1024 * 1024 ){
			$byte = ( $byte / ( 1024 * 1024 ) );
			$byte = number_format($byte, $len) . 'M';
		}else if( $byte >= 1024 ){
			$byte = ( $byte / 1024 );
			$byte = number_format($byte, $len) . 'K';
		}else if( $byte < 1024 ){
			$byte = number_format($byte, $len) . '';
		}

		return $byte.$Unit;
	}
	
	function lib_fnByteToMbps($num, $len=2)
	{
		$byte = $num;
		$kb = $byte / 1000;
		$mb = $kb / 1000;
		return number_format($mb, $len) . ' Mbps'; //소수점이하n자리 (n+1에서 반올림됨)
	}
	
	function lib_fnByteTokbps($num, $len=2)
	{
		$byte = $num;
		$kb = $byte / 1000;
		return number_format($kb, $len) . ' kbps'; //소수점이하n자리 (n+1에서 반올림됨)
	}

	
	/**
	 * Short description.
	 * @param   string  $str  on / off
	 * @return  type    description
	 */
	function lib_error($str='off')
	{
		if ($str == 'on') {
			//error_reporting(E_ALL);
		    error_reporting(E_PARSE | E_ERROR);
		}else if($str == 'off'){
			error_reporting(0);
			ini_set('display_errors',0);
		};
	} // end func

	function lib_CheckMonth($FromDate, $ToDate)
	{
		global $start_day;
		global $end_day;

		$DayRange_Max = 31;
		$RowCount = 0;	// while 문 반복 숫자
		
		// ============== [start] while 문에서 시작 +1 day를 하기 때문에 시작 전에 $FromDate에서 하루 빼준다.
		$pTempDate = new DateTime($FromDate);
		$pTempDate->modify('-1 days');

		$TempYear = $pTempDate->format('Y');
		$TempMonth = $pTempDate->format('m');
		$TempDay = $pTempDate->format('d');

		$TempYMD =  sprintf("%04d-%02d-%02d", $TempYear, $TempMonth, $TempDay);
		
		for($i = 0; $i <= $DayRange_Max; $i++)
		{
			$tmp = new DateTime($TempYMD);
			$tmp->modify('+1 days');
			$TempYear = $tmp->format('Y');
			$TempMonth = $tmp->format('m');
			$TempDay = $tmp->format('d');
			$TempYMD = sprintf("%04d-%02d-%02d", $TempYear, $TempMonth, $TempDay);
			
			//echo $TempYMD .'<br />';

			//
			if( strcmp($TempYMD, $ToDate) == 0 )
			{
				//echo "### 30일 이내의 $TempYMD 와 $ToDate 가 같다. 계속 진행합니다.";
				break;
			}

			if( $i == $DayRange_Max)
			{
				//$start_day = Date('Y-m-d');
				//$end_day = Date('Y-m-d');
				$start_day = "";
				$end_day = "";
				echo ("
					<script>\n
						alert( 'The setting is the maximum period of 30 days.\\nPlease set up at the maximum {$TempYMD}.' );\n
						//history.back();\n
					</script>\n
				");

			break;
			}
		}
	}


	/**
	 * Short description.
	 * @param   string  $str  on / off
	 * @return  type    description
	 */
	function lib_paramValidation($param, $type='str')
	{	
		if( $param == '' || $param == null ) return $param;

		if( $type == 'str' )
		{
			//문자형 : 부등호를 삭제하고, 인젝션방지
			$pattern = "/[=|<|>';()&?]/";
			$res = preg_replace($pattern, "", $param);
			//$res = mysql_real_escape_string($res);
		}
		else if( $type == 'int' )
		{
			//정수형 : 숫자, 소숫점을 제외하고 삭제
			$pattern = "/[^0-9|^\.]*/s";
			$res = preg_replace($pattern, "", $param);
			$res = (int)$res;
		}
		else if( $type == 'int_comma' )	
		{
			//정수형 : 숫자, comma 를 제외하고 삭제 (2015.12.11 손대호 추가)
			$pattern = "/[^0-9|^\.]*/s";
			$res = preg_replace($pattern, "", $param);
			$res = (int)$res;
		}
		else if( $type == 'email')
		{
			//이메일 : 올바른 이메일형식이 아니면 공백처리
			$pattern = "^[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)+$";
			$res = eregi($pattern, $param);
			if( $res == 1 ) $res = $param;
			else $res = '';
		}
		else if( $type == 'Y-m-d' )
		{
			//날짜 : 'Y-m-d' 형식이 아닐경우 공백처리
			//$pattern = "/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/"; //같은표현
			$pattern = '/^(\d{4})-(\d{2})-(\d{2})$/';
			$res = preg_match($pattern, $param);
			if( $res == 1 ) $res = $param;
			else $res = "";
		}
		return $res;
	}

	function lib_itostr($num)
	{
		$str = $num < 10 ? '0'.$num : $num;
		return $str;
	}

	function lib_5units($num)
	{
		if( $num % 5 != 0 ){
			$num = (int)($num / 5) * 5;
		}
		
		return $num;
	}

	function lib_CSRFgenerateToken()
	{
		if ( function_exists("hash_algos") and in_array("sha512",hash_algos()) )
		{
			$token=hash("sha512",mt_rand(0,mt_getrandmax()));
		}else{
			$token=' ';
			for ($i=0;$i<128;++$i)
			{
				$r=mt_rand(0,35);
				if ($r<26)
				{
					$c=chr(ord('a')+$r);
				}else{
					$c=chr(ord('0')+$r-26);
				}
				$token.=$c;
			}
		}
		return $token;
	}// end csrfGuard_generateToken


	function lib_SessionHandlerInit(){

		global $Config;

		$_SESSION['session_id'] = $_COOKIE['QSESSIONID'];

		include_once('common/php/PHP-MySQL-Session-Handler/MySqlSessionHandler.php');
		$session = new MySqlSessionHandler();
		$session->setDbDetails($Config['DBIP'].":".$Config["DBPort"], $Config['DBUser'], $Config['DBPass'], $Config['DBName']);
		$session->setDbTable($Config["ses_table"]);

		session_set_save_handler(array($session, 'open'),
								 array($session, 'close'),
								 array($session, 'read'),
								 array($session, 'write'),
								 array($session, 'destroy'),
								 array($session, 'gc'));

		// The following prevents unexpected effects when using objects as save handlers.
		register_shutdown_function('session_write_close');

		session_start();
		ini_set("session.gc_maxlifetime", 86400);

		error_reporting(E_PARSE | E_ERROR);
		ini_set('display_errors', TRUE);
		ini_set('display_startup_errors', TRUE);
	}

	function lib_setDebug($debug=false){
		if ($debug) {
			$session = print_r($_SESSION, true);
			if (!empty($session)) @writelog(": [SESSION] -> [".$session."]");
			$cookie = print_r($_COOKIE, true);
			if (!empty($cookie)) @writelog(": [_COOKIE] -> [".$cookie."]");
			$post = print_r($_POST, true);
			if (!empty($post)) @writelog(": [_POST] -> [".$post."]");
			$get = print_r($_GET, true);
			if (!empty($get)) @writelog(": [_GET] -> [".$get."]");
		}
	}
?>
