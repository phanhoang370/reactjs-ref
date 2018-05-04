<?php



// default redirection
$url = $_REQUEST["callback"].'?callback_func='.$_REQUEST["callback_func"];
$bSuccessUpload = is_uploaded_file($_FILES['Filedata']['tmp_name']);

// SUCCESSFUL
if(bSuccessUpload) {
	$tmp_name = $_FILES['Filedata']['tmp_name'];
	$name = strtotime("now") . "_" . $_FILES['Filedata']['name'];		// 2015-11-16 손대호 수정 : 다른 사용자끼리 파일명 겹칠까봐
	
	$filename_ext = strtolower(array_pop(explode('.',$name)));
	$allow_file = array("jpg", "png", "bmp", "gif");
	
	if(!in_array($filename_ext, $allow_file)) {
		$url .= '&errstr='.$name;
	} else {
		//$uploadDir = '../../upload/';
		$uploadDir = '/upload/';		//2015-11-16 손대호 수정
		$makeDir = "/usr/local/infra911/MONITOR" .	$uploadDir;		//2015-11-16 손대호 수정

		if(!is_dir($makeDir)){
			mkdir($makeDir, 0777);
		}
		
		$newPath = $makeDir.urlencode($_FILES['Filedata']['name']);
		
		@move_uploaded_file($tmp_name, $newPath);
		
		$url .= "&bNewLine=true";
		$url .= "&sFileName=".urlencode(urlencode($name));

		//$url .= "&sFileURL=upload/".urlencode(urlencode($name));
		$url .= "&sFileURL={$uploadDir}".urlencode(urlencode($name));	//2015-11-16 손대호 수정 : upload/   ==> /upload/

	}
}
// FAILED
else {
	$url .= '&errstr=error';
}
	
header('Location: '. $url);
?>