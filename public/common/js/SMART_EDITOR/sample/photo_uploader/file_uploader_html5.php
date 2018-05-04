<?php

 	$sFileInfo = '';
	$headers = array();
	 
	foreach($_SERVER as $k => $v) {
		//echo "k=$k<br>";
		if(substr($k, 0, 9) == "HTTP_FILE") {
			$k = substr(strtolower($k), 5);
			$headers[$k] = strtotime("now") . "_" . $v;	// 2015-11-16 손대호 수정 : 다른 사용자끼리 파일명 겹칠까봐
		} 
	}

	$file = new stdClass;
	$file->name = str_replace("\0", "", rawurldecode($headers['file_name']));
	$file->size = $headers['file_size'];
	$file->content = file_get_contents("php://input");
	
	$filename_ext = strtolower(array_pop(explode('.',$file->name)));
	$allow_file = array("jpg", "png", "bmp", "gif"); 
	
	if(!in_array($filename_ext, $allow_file)) {
		echo "NOTALLOW_".$file->name;
	} else {
		//$uploadDir = '../../upload/';
		$uploadDir = '/upload/';		//2015-11-16 손대호 수정
		$makeDir = "/usr/local/infra911/MONITOR" .	$uploadDir;		//2015-11-16 손대호 수정

		//2015-11-16 손대호 수정
		if(!is_dir($makeDir)){
			mkdir($makeDir, 0777);
		}
		
		//$newPath = $uploadDir.iconv("utf-8", "cp949", $file->name);
		$newPath = $makeDir.iconv("utf-8", "cp949", $file->name);

		//echo "newPath = $newPath<br>";
		
		if(file_put_contents($newPath, $file->content)) {
			$sFileInfo .= "&bNewLine=true";
			$sFileInfo .= "&sFileName=".$file->name;

			//$sFileInfo .= "&sFileURL=upload/".$file->name;
			$sFileInfo .= "&sFileURL={$uploadDir}".$file->name;	//2015-11-16 손대호 수정 : upload/   ==> /upload/
		}
		
		echo $sFileInfo;
	}
?>