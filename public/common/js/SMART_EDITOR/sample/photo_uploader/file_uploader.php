<?php



// default redirection
$url = $_REQUEST["callback"].'?callback_func='.$_REQUEST["callback_func"];
$bSuccessUpload = is_uploaded_file($_FILES['Filedata']['tmp_name']);

// SUCCESSFUL
if(bSuccessUpload) {
	$tmp_name = $_FILES['Filedata']['tmp_name'];
	$name = strtotime("now") . "_" . $_FILES['Filedata']['name'];		// 2015-11-16 �մ�ȣ ���� : �ٸ� ����ڳ��� ���ϸ� ��ĥ���
	
	$filename_ext = strtolower(array_pop(explode('.',$name)));
	$allow_file = array("jpg", "png", "bmp", "gif");
	
	if(!in_array($filename_ext, $allow_file)) {
		$url .= '&errstr='.$name;
	} else {
		//$uploadDir = '../../upload/';
		$uploadDir = '/upload/';		//2015-11-16 �մ�ȣ ����
		$makeDir = "/usr/local/infra911/MONITOR" .	$uploadDir;		//2015-11-16 �մ�ȣ ����

		if(!is_dir($makeDir)){
			mkdir($makeDir, 0777);
		}
		
		$newPath = $makeDir.urlencode($_FILES['Filedata']['name']);
		
		@move_uploaded_file($tmp_name, $newPath);
		
		$url .= "&bNewLine=true";
		$url .= "&sFileName=".urlencode(urlencode($name));

		//$url .= "&sFileURL=upload/".urlencode(urlencode($name));
		$url .= "&sFileURL={$uploadDir}".urlencode(urlencode($name));	//2015-11-16 �մ�ȣ ���� : upload/   ==> /upload/

	}
}
// FAILED
else {
	$url .= '&errstr=error';
}
	
header('Location: '. $url);
?>